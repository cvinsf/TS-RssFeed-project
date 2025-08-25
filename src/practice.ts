import fs from "fs"
import os, { homedir } from "os"
import path from "path"
import { config } from "process";

type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName: string): void {

}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required in config file");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }
    return config;

}

function readConfig() {
    const fullPath = getConfigFilePath();
    const data = fs.readFileSync(fullPath, "utf-8");
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig)
}

function getConfigFilePath() {
    const configFileName = ".gatorconfig.json";
    const homeDir = os.homedir();
    return path.join(homeDir, configFileName); 
}

function writeConfig(config: Config) {
    const filePath = getConfigFilePath();


}