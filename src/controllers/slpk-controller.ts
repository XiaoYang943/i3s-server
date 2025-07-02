import type { SLPKArchive } from "@loaders.gl/i3s";
import { parseSLPKArchive } from "@loaders.gl/i3s";
import { FileHandleFile } from "@loaders.gl/loader-utils";
import { getConfig } from "../config/config-loader";
import "@loaders.gl/polyfills";

const slpkArchiveRecord: Record<string, SLPKArchive> = {};

/**
 * 加载配置文件中定义的 SLPK 文件到内存
 */
export async function loadArchiveRecord(): Promise<void> {
  const datasource = getConfig().datasource?.file ?? {};
  for (const id in datasource) {
    const filePath = datasource[id].path;
    if (!slpkArchiveRecord[id]) {
      const archive = await parseSLPKArchive(new FileHandleFile(filePath), msg => console.log(msg));
      console.log(`Loaded archive [${id}] from ${filePath}`);
      slpkArchiveRecord[id] = archive;
    }
  }
}

/**
 * 获取 scene 列表
 */
export function getSceneList() {
  const datasource = getConfig().datasource?.file ?? {};
  return Object.keys(slpkArchiveRecord).map(id => ({
    id,
    alias: datasource[id]?.alias
  }));
}

/**
 * 获取某个 archive 中的文件
 */
export async function getArchiveById(id: string, url: string) {
  const datasource = getConfig().datasource?.file ?? {};
  const filePath = datasource[id]?.path;

  if (filePath) {
    if (!slpkArchiveRecord[id]) {
      const archive = await parseSLPKArchive(new FileHandleFile(filePath), msg => console.log(msg));
      console.log(`Archive record update: ${id}`);
      slpkArchiveRecord[id] = archive;
    }
    const trimmedPath = /^\/?(.*)\/?$/.exec(url);
    try {
      return await slpkArchiveRecord[id].getFile(trimmedPath?.[1] ?? "", "http");
    } catch {
      return null;
    }
  }
  return null;
}
