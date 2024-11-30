import { dohURL } from "../../helpers/init";
import { WS_READY_STATE_OPEN } from "./constants";

export default async function handleUDPOutBound(
  webSocket: WebSocket,
  vlessResponseHeader: ArrayBuffer
) {
  let isVlessHeaderSent = false;
  const transformStream = new TransformStream({
    start(controller) {},
    flush(controller) {},
    transform(chunk, controller) {
      for (let index = 0; index < chunk.byteLength; ) {
        const lengthBuffer = chunk.slice(index, index + 2);
        const udpPakcetLength = new DataView(lengthBuffer).getUint16(0);
        const udpData = new Uint8Array(
          chunk.slice(index + 2, index + 2 + udpPakcetLength)
        );
        index = index + 2 + udpPakcetLength;
        controller.enqueue(udpData);
      }
    },
  });

  transformStream.readable
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          const resp = await fetch(dohURL, {
            method: "POST",
            headers: {
              "content-type": "application/dns-message",
            },
            body: chunk,
          });
          const dnsQueryResult = await resp.arrayBuffer();
          const udpSize = dnsQueryResult.byteLength;
          const udpSizeBuffer = new Uint8Array([
            (udpSize >> 8) & 0xff,
            udpSize & 0xff,
          ]);
          if (webSocket.readyState === WS_READY_STATE_OPEN) {
            if (isVlessHeaderSent) {
              webSocket.send(
                await new Blob([udpSizeBuffer, dnsQueryResult]).arrayBuffer()
              );
            } else {
              webSocket.send(
                await new Blob([
                  vlessResponseHeader,
                  udpSizeBuffer,
                  dnsQueryResult,
                ]).arrayBuffer()
              );
              isVlessHeaderSent = true;
            }
          }
        },
      })
    )
    .catch(() => {});

  const writer = transformStream.writable.getWriter();

  return {
    write(chunk: Uint8Array) {
      writer.write(chunk);
    },
  };
}
