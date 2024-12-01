import getParams, { userID } from "./helpers/init";
import { getNormalConfigs } from "./cores-configs/normalConfigs";
import { vlessOverWSHandler } from "./protocols/vless/vlessOverWSHandler";

export default {
  async fetch(request): Promise<Response> {
    const { pathName } = getParams(request);

    try {
      const upgradeHeader = request.headers.get("Upgrade");
      if (!upgradeHeader || upgradeHeader !== "websocket") {
        switch (pathName) {
          case `/configsNormal/${userID}`:
            return await getNormalConfigs(request);
          default: {
            const url = new URL(request.url);
            url.hostname = "www.speedtest.net";
            url.protocol = "https:";
            request = new Request(url, request);
            return await fetch(request);
          }
        }
      }

      if (pathName.startsWith("/vls")) return await vlessOverWSHandler(request);

      return new Response(null, { status: 404 });
    } catch {
      return new Response("error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
