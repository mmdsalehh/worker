import { getParams } from "./helpers/init";
import { getNormalConfigs } from "./cores-configs/normalConfigs";
import { vlessOverWSHandler } from "./protocols/vless";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathName, userID } = getParams(request);

    try {
      const upgradeHeader = request.headers.get("Upgrade");
      if (!upgradeHeader || upgradeHeader !== "websocket") {
        switch (pathName) {
          case `/sub/${userID}`:
            return await getNormalConfigs(request, env);
          default:
            return env.ASSETS.fetch(request);
        }
      } else {
        if (!pathName.startsWith("/tr")) {
          return await vlessOverWSHandler(request, env);
        }
        return new Response(null, { status: 404 });
      }
    } catch (err) {
      return new Response("error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
