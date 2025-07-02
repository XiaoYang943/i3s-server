import fs from "node:fs";
import YAML from "yaml";

import {Config} from "../type";

let appConfig: Config;
let currentConfigPath = "../../config.yaml";
// 加载配置文件
export function loadConfig() {
    const configPathArg = Bun.argv.find(arg => arg.startsWith("--config_path="));
    const configPath = process.env.CONFIG_PATH
        || (configPathArg ? configPathArg.split("=")[1] : undefined)
        || Bun.argv[2]
        || currentConfigPath;
    currentConfigPath = configPath;
    console.log(`✅ Loading config from: ${configPath}`);

    const configFile = fs.readFileSync(configPath, "utf8");
    appConfig = YAML.parse(configFile);
    console.log("✅ Config loaded.");
}

// 获取配置
export function getConfig() {
    return appConfig;
}

export function getConfigPath() {
    return currentConfigPath;
}
