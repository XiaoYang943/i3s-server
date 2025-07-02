import type { Elysia } from "elysia";
import destr from "destr";
import { getArchiveById, getSceneList } from "../controllers/slpk-controller";
import { createSceneServer } from "../utils/create-scene-server";
import {getConfig} from "../config/config-loader";

const textDecoder = new TextDecoder();

export function SceneServerRoutes<T extends Elysia<any>>(app: T): void {
  const { base_path } = getConfig();

  app.get(encodeURI(base_path + "/scene-list"), () => {
    return getSceneList();
  });

  app.get(encodeURI(base_path + "/:id/SceneServer/"), async ({ status, params: { id } }) => {
    const file = await getArchiveById(id, "/");
    if (file) {
      const layer: any = destr(textDecoder.decode(file));
      return createSceneServer(layer.name, layer);
    } else {
      return status(404, "File Not Found");
    }
  });

  app.get(encodeURI(base_path + "/:id/SceneServer/*"), async ({ status, params: { id }, path }) => {
    const _path = path.split("SceneServer/layers/0")[1].replace(/\/+$/, "");
    const file = await getArchiveById(id, _path);
    if (file) {
      try {
        return JSON.parse(textDecoder.decode(file));
      } catch {
        return Buffer.from(file);
      }
    } else {
      return status(404, "File Not Found");
    }
  });
}
