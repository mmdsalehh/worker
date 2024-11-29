import { connect } from "cloudflare:sockets";

import { getParams, proxyIP } from "../../helpers/init";
import { safeCloseWebSocket } from "./safeCloseWebSocket";
import { vlessRemoteSocketToWS } from "./vlessRemoteSocketToWS";

export async function handleTCPOutBound(
  request: Request,
  remoteSocket: { value: Socket | null },
  addressRemote: string,
  portRemote: number,
  rawClientData: Uint8Array,
  webSocket: WebSocket,
  vlessResponseHeader: Uint8Array
) {
  const { pathName } = getParams(request);

  async function connectAndWrite(address: string, port: number) {
    if (
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        address
      )
    )
      address = `${atob("d3d3Lg==")}${address}${atob("LnNzbGlwLmlv")}`;
    const tcpSocket: Socket = connect({
      hostname: address,
      port: port,
    });
    remoteSocket.value = tcpSocket;
    const writer = tcpSocket.writable.getWriter();
    await writer.write(rawClientData);
    writer.releaseLock();
    return tcpSocket;
  }

  async function retry() {
    const panelProxyIP = pathName.split("/")[2];
    const panelProxyIPs = panelProxyIP
      ? atob(panelProxyIP).split(",")
      : undefined;
    const finalProxyIP = panelProxyIPs
      ? panelProxyIPs[Math.floor(Math.random() * panelProxyIPs.length)]
      : proxyIP || addressRemote;
    const tcpSocket = await connectAndWrite(finalProxyIP, portRemote);
    tcpSocket.closed.finally(() => {
      safeCloseWebSocket(webSocket);
    });

    vlessRemoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, null);
  }

  const tcpSocket = await connectAndWrite(addressRemote, portRemote);

  vlessRemoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, retry);
}
