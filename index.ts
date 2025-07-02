import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import {getConfig, getConfigPath, loadConfig} from "./src/config/config-loader";
import { loadArchiveRecord } from "./src/controllers/slpk-controller";
import { SceneServerRoutes } from "./src/routes/scene-server.route";
import chokidar from "chokidar";

/**
 * 热重载配置文件
 */
const setupHotReload =  () =>  {
  const configPath = getConfigPath();
  chokidar.watch(configPath).on("change", async () => {
    console.log("---------");
    console.log("✅ Config file changed. Reloading...");
    try {
      loadConfig();
      await loadArchiveRecord();
      console.log("✅ Scene records reloaded.");
    } catch (err) {
      console.error("❌ Error reloading config or scenes:", err);
    }
  });
}

async function startServer() {

  loadConfig();

  setupHotReload();

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
