/**
 * Configuration Management Module
 * 
 * This module handles reading, writing, and validating configuration data
 * for the blog-gator project. It manages a JSON config file that stores
 * database URL and current user information.
 */

import fs from "fs";
import path from "path";
import os from "os";

/**
 * Configuration object structure
 * Defines the shape of the application configuration
 */
type Config = {
    dbUrl: string;           // Database connection URL
    currentUserName: string; // Currently active user name
}

/**
 * Updates the current user in the configuration file
 * @param userName - The new user name to set as current
 */
export function setUser(userName: string): void {
    const config = readConfig();
    config["currentUserName"] = userName;
    writeConfig(config);
}

/**
 * Reads and parses the configuration file
 * @returns Validated configuration object with camelCase properties
 * @throws Error if config file is invalid or missing required fields
 */
export function readConfig() {
    // Read the raw JSON file contents
    const fileContents = fs.readFileSync(getConfigFilePath(), 'utf-8');
    
    // Parse JSON and validate structure
    const rawConfig = JSON.parse(fileContents);

    // Validate and convert snake_case to camelCase
    return validateConfig(rawConfig);
}

// HELPER FUNCTIONS

/**
 * Gets the path to the configuration file
 * @returns Path to .gatorconfig.json in the current directory
 */
export function getConfigFilePath(): string {
    const fullPath = path.join(os.homedir(), ".gatorconfig.json");
    console.log("reading config from:", fullPath);
    return fullPath;
}

/**
 * Writes configuration data to the JSON file
 * Converts camelCase properties back to snake_case for file storage
 * @param cfg - Configuration object to write
 */
function writeConfig(cfg: Config): void {
    // Convert camelCase back to snake_case for JSON file format
    const jsonConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };

    // Format JSON with 2-space indentation for readability
    const configfile = JSON.stringify(jsonConfig, null, 2);
    fs.writeFileSync(getConfigFilePath(), configfile, {encoding: "utf-8"});
}

/**
 * Validates raw configuration data and converts snake_case to camelCase
 * @param rawConfig - Raw configuration object from JSON file
 * @returns Validated Config object with camelCase properties
 * @throws Error if required fields are missing or invalid
 */
function validateConfig(rawConfig: any): Config {
    // Validate db_url field
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    
    // Validate current_user_name field
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required in config file");
    }

    // Convert snake_case properties to camelCase for internal use
    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };
    return config;
}

/**
 * Utility function to convert snake_case strings to camelCase
 * Note: Currently unused but available for future snake_case conversions
 * @param str - String in snake_case format
 * @returns String converted to camelCase
 * @example snakeToCamel("user_name") returns "userName"
 */
function snakeToCamel(str: string): string {
  return str.replace(
    /(?!^)_(.)/g,           // Match underscore followed by any character (not at start)
    (_, char) => char.toUpperCase()  // Replace with uppercase character
  );
}