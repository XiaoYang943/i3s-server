import fs from "node:fs";
import YAML from "yaml";
import chokidar from "chokidar";
import {loadArchiveRecord} from "../controllers/slpk-controller";
import {Config} from "../type";

let appConfig: Config;

// 加载配置文件
export function loadConfig() {
    const configPathArg = Bun.argv.find(arg => arg.startsWith("--config_path="));
    const configPath = process.env.CONFIG_PATH
        || (configPathArg ? configPathArg.split("=")[1] : undefined)
        || Bun.argv[2]
        || "./config.yaml";

    console.log(`✅ Loading config from: ${configPath}`);

    const configFile = fs.readFileSync(configPath, "utf8");
    appConfig = YAML.parse(configFile);
    console.log("✅ Config loaded.");
}

// 获取配置
export function getConfig() {
    return appConfig;
}

// 热重载
chokidar.watch("./config.yaml").on("change", async () => {
    console.log("---------");
    console.log("✅ config.yaml changed. Reloading...");
    try {
        loadConfig();
        await loadArchiveRecord();
        console.log("✅ Scene records reloaded.");
    } catch (err) {
        console.error("❌ Error while reloading config or scenes:", err);
    }
});
