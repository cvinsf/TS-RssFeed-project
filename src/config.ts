import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName: string): void {
    const config = readConfig();
    config["currentUserName"] = userName;

    writeConfig(config);
}


export function readConfig(): Config {
    const fileContents = fs.readFileSync(getConfigFilePath(), 'utf-8');
    
    const rawConfig = JSON.parse(fileContents.toString());

    return validateConfig(rawConfig);
}

// HELPER FUNCTIONS
export function getConfigFilePath(): string {
    return path.join(".", ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const jsonConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };

    const configfile = JSON.stringify(jsonConfig, null, 2);
    fs.writeFileSync(getConfigFilePath(), configfile);
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url) {
        throw new Error("Missing required property: db_url");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name || "",
    };
    return config;
}


function snakeToCamel(str: string): string {
  return str.replace(
    /(?!^)_(.)/g,
    (_, char) => char.toUpperCase()
  );
}