import { getParams } from "./helpers/init";
import { getNormalConfigs } from "./cores-configs/normalConfigs";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { userID } = getParams(request);

    try {
      const { pathname } = getParams(request);
      switch (pathname) {
        case `/sub/${userID}`:
          return await getNormalConfigs(request, env);
        default:
          return new Response("Not Found", { status: 404 });
      }
    } catch (err) {
      return new Response("error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
