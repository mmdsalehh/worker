import { WS_READY_STATE_OPEN } from "./constants";
import safeCloseWebSocket from "./safeCloseWebSocket";

export default async function vlessRemoteSocketToWS(
  remoteSocket: Socket,
  webSocket: WebSocket,
  vlessResponseHeader: ArrayBuffer | null,
  retry: (() => Promise<void>) | null
) {
  let vlessHeader = vlessResponseHeader;
  let hasIncomingData = false;

  await remoteSocket.readable
    .pipeTo(
      new WritableStream({
        async write(chunk: Uint8Array, controller) {
          hasIncomingData = true;
          if (webSocket.readyState !== WS_READY_STATE_OPEN) {
            controller.error("webSocket.readyState is not open, maybe close");
          }
          if (vlessHeader) {
            webSocket.send(await new Blob([vlessHeader, chunk]).arrayBuffer());
            vlessHeader = null;
          } else {
            webSocket.send(chunk);
          }
        },
      })
    )
    .catch(() => safeCloseWebSocket(webSocket));

  if (!hasIncomingData && retry) retry();
}
