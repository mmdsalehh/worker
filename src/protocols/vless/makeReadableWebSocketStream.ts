import safeCloseWebSocket from "./safeCloseWebSocket";
import base64ToArrayBuffer from "./base64ToArrayBuffer";

export default function makeReadableWebSocketStream(
  webSocketServer: WebSocket,
  earlyDataHeader: string
) {
  let readableStreamCancel = false;
  const stream = new ReadableStream({
    start(controller) {
      webSocketServer.addEventListener("message", (event) => {
        if (readableStreamCancel) return;

        const message = event.data;
        controller.enqueue(message);
      });

      webSocketServer.addEventListener("close", () => {
        safeCloseWebSocket(webSocketServer);
        if (readableStreamCancel) return;

        controller.close();
      });

      webSocketServer.addEventListener("error", (err) => {
        controller.error(err);
      });

      const { earlyData, error } = base64ToArrayBuffer(earlyDataHeader);
      if (error) {
        controller.error(error);
      } else if (earlyData) {
        controller.enqueue(earlyData);
      }
    },
    cancel() {
      if (readableStreamCancel) return;
      readableStreamCancel = true;
      safeCloseWebSocket(webSocketServer);
    },
  });

  return stream;
}
