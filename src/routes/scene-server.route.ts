import type { Elysia } from "elysia";
import destr from "destr";
import { getArchiveById, getSceneList } from "../controllers/slpk-controller";
import { createSceneServer } from "../utils/create-scene-server";

const textDecoder = new TextDecoder();

export function SceneServerRoutes(app: Elysia) {
  app.get("/scene-list", () => {
    return getSceneList();
  });
  app.get("/:id/SceneServer/", async ({ status, params: { id } }) => {
    const file = await getArchiveById(id, "/");
    if (file) {
      const layer: any = destr(textDecoder.decode(file));
      return createSceneServer(layer.name, layer);
    }
    else {
      return status(404, "File Not Found");
    }
  });
  app.get("/:id/SceneServer/*", async ({ status, params: { id } }) => {
    const file = await getArchiveById(id, "/");
    if (file) {
      try {
        return JSON.parse(textDecoder.decode(file));
      }
      catch {
        // eslint-disable-next-line node/prefer-global/buffer
        return Buffer.from(file);
      }
    }
    else {
      return status(404, "File Not Found");
    }
  });
}
