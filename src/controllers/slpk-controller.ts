import type { SLPKArchive } from "@loaders.gl/i3s";
import { readdirSync } from "node:fs";
import { parseSLPKArchive } from "@loaders.gl/i3s";
import { FileHandleFile } from "@loaders.gl/loader-utils";
import { filename } from "pathe/utils";
import { joinURL } from "ufo";
import "@loaders.gl/polyfills";

const slpkArchiveRecord: Record<string, SLPKArchive> = {};

export async function loadArchiveRecord(scenePath: string): Promise<void> {
  const fileList = readdirSync(scenePath).filter(file => file.endsWith(".slpk")).map(file => joinURL(scenePath, file));
  for (const file of fileList) {
    // eslint-disable-next-line no-console
    const archive = await parseSLPKArchive(new FileHandleFile(file), msg => console.log(msg));
    const archiveName = filename(file);
    if (archiveName) {
      slpkArchiveRecord[archiveName] = archive;
    }
  }
}

export async function getArchiveById(id: string, url: string) {
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation
  const trimmedPath = /^\/?(.*)\/?$/.exec(url);
  if (trimmedPath && slpkArchiveRecord[id]) {
    try {
      return await slpkArchiveRecord[id].getFile(trimmedPath[1], "http");
    }
    catch {
      // TODO - log error?
    }
  }
  return null;
}
