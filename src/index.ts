import { Elysia } from "elysia";
import { loadArchiveRecord } from "./controllers/slpk-controller";
import { SceneServerRoutes } from "./routes/scene-server.route";

const scenePath = "./scene";

loadArchiveRecord(scenePath).then(() => {
  const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

  SceneServerRoutes(app);

  // eslint-disable-next-line no-console
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});
