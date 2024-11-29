import { connect } from "cloudflare:sockets";

import safeCloseWebSocket from "./safeCloseWebSocket";
import getParams, { proxyIP } from "../../helpers/init";
import vlessRemoteSocketToWS from "./vlessRemoteSocketToWS";

export default async function handleTCPOutBound(
  request: Request,
  remoteSocket: { value: Socket | null },
  addressRemote: string,
  portRemote: number,
  rawClientData: Uint8Array,
  webSocket: WebSocket,
  vlessResponseHeader: Uint8Array,
  log: (info: string, event?: string) => void
) {
  const { pathName } = getParams(request);

  async function connectAndWrite(address: string, port: number) {
    if (
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        address
      )
    )
      address = `${atob("d3d3Lg==")}${address}${atob("LnNzbGlwLmlv")}`;
    /** @type {import("@cloudflare/workers-types").Socket} */
    const tcpSocket = connect({
      hostname: address,
      port: port,
    });
    remoteSocket.value = tcpSocket;
    log(`connected to ${address}:${port}`);
    const writer = tcpSocket.writable.getWriter();
    await writer.write(rawClientData); // first write, nomal is tls client hello
    writer.releaseLock();
    return tcpSocket;
  }

  // if the cf connect tcp socket have no incoming data, we retry to redirect ip
  async function retry() {
    const panelProxyIP = pathName.split("/")[2];
    const panelProxyIPs = panelProxyIP
      ? atob(panelProxyIP).split(",")
      : undefined;
    const finalProxyIP = panelProxyIPs
      ? panelProxyIPs[Math.floor(Math.random() * panelProxyIPs.length)]
      : proxyIP || addressRemote;
    const tcpSocket = await connectAndWrite(finalProxyIP, portRemote);
    // no matter retry success or not, close websocket
    tcpSocket.closed
      .catch((error) => {
        console.log("retry tcpSocket closed error", error);
      })
      .finally(() => {
        safeCloseWebSocket(webSocket);
      });

    vlessRemoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, null, log);
  }

  const tcpSocket = await connectAndWrite(addressRemote, portRemote);

  // when remoteSocket is ready, pass to websocket
  // remote--> ws
  vlessRemoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, retry, log);
}
