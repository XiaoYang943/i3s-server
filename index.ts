import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getConfig, loadConfig } from "./src/config/config-loader";
import { loadArchiveRecord } from "./src/controllers/slpk-controller";
import { SceneServerRoutes } from "./src/routes/scene-server.route";

async function startServer() {

  loadConfig();

  await loadArchiveRecord();

  const { listen_port } = getConfig();

  const app = new Elysia()
      .use(cors())
      .get("/", () => "Hello SceneMapI3sServer")
      .listen(listen_port);

  SceneServerRoutes(app);

  console.log(
      `✅ SceneMapI3sServer is running`
  );
}

startServer();
