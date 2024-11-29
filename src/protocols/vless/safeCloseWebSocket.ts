import { WS_READY_STATE_CLOSING, WS_READY_STATE_OPEN } from "./constants";

export function safeCloseWebSocket(socket: WebSocket) {
  try {
    if (
      socket.readyState === WS_READY_STATE_OPEN ||
      socket.readyState === WS_READY_STATE_CLOSING
    ) {
      socket.close();
    }
  } catch {}
}
