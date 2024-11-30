import { userID } from "../../helpers/init";
import handleTCPOutBound from "./handleTCPOutBound";
import handleUDPOutBound from "./handleUDPOutBound";
import processVlessHeader from "./processVlessHeader";
import makeReadableWebSocketStream from "./makeReadableWebSocketStream";

export async function vlessOverWSHandler(request: Request, env: Env) {
  const webSocketPair = new WebSocketPair();
  const [client, webSocket] = Object.values(webSocketPair);
  webSocket.accept();

  const earlyDataHeader = request.headers.get("sec-websocket-protocol") || "";

  const readableWebSocketStream = makeReadableWebSocketStream(
    webSocket,
    earlyDataHeader
  );

  let remoteSocketWapper: { value: Socket | null } = {
    value: null,
  };

  let udpStreamWrite: ((chunk: Uint8Array) => void) | null = null;
  let isDns = false;

  readableWebSocketStream.pipeTo(
    new WritableStream({
      async write(chunk) {
        if (isDns && udpStreamWrite) {
          return udpStreamWrite(chunk);
        }
        if (remoteSocketWapper.value) {
          const writer = remoteSocketWapper.value.writable.getWriter();
          await writer.write(chunk);
          writer.releaseLock();
          return;
        }

        const {
          isUDP,
          message,
          hasError,
          rawDataIndex,
          portRemote = 443,
          addressRemote = "",
          vlessVersion = new Uint8Array([0, 0]),
        } = await processVlessHeader(chunk, userID);

        if (hasError) throw new Error(message);

        if (isUDP) {
          if (portRemote !== 53)
            throw new Error("UDP proxy only enable for DNS which is port 53");

          isDns = true;
        }
        const vlessResponseHeader = new Uint8Array([vlessVersion[0], 0]);
        const rawClientData = chunk.slice(rawDataIndex);

        if (isDns) {
          const { write } = await handleUDPOutBound(
            webSocket,
            vlessResponseHeader
          );
          udpStreamWrite = write;
          udpStreamWrite(rawClientData);
          return;
        }

        handleTCPOutBound(
          request,
          remoteSocketWapper,
          addressRemote,
          portRemote,
          rawClientData,
          webSocket,
          vlessResponseHeader
        );
      },
    })
  );

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
