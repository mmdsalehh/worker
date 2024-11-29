import { WS_READY_STATE_OPEN } from "./constants";
import safeCloseWebSocket from "./safeCloseWebSocket";

export default async function vlessRemoteSocketToWS(
  remoteSocket: Socket,
  webSocket: WebSocket,
  vlessResponseHeader: ArrayBuffer | null,
  retry: (() => Promise<void>) | null,
  log: (info: string, event?: string) => void
) {
  let vlessHeader = vlessResponseHeader;
  let hasIncomingData = false; // check if remoteSocket has incoming data
  await remoteSocket.readable
    .pipeTo(
      new WritableStream({
        start() {},

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
        close() {
          log(
            `remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`
          );
        },
        abort(reason) {
          console.error(`remoteConnection!.readable abort`, reason);
        },
      })
    )
    .catch((error) => {
      console.error(
        `vlessRemoteSocketToWS has exception `,
        error.stack || error
      );
      safeCloseWebSocket(webSocket);
    });

  // seems is cf connect socket have error,
  // 1. Socket.closed will have error
  // 2. Socket.readable will be close without any data coming
  if (hasIncomingData === false && retry) {
    log(`retry`);
    retry();
  }
}
