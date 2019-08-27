import { readJsonSync } from "fs-extra";

// #region Config Types
export interface Configuration {
    jsonFix: string;
    delayMs: number;

    skipTweetsContainingMedia: boolean;
}

export interface SecretConfiguration {
    twitterAuthToken: {
        consumerKey: string;
        consumerSecret: string;
        accessKey: string;
        accessSecret: string;
    };
}
// #endregion

// #region Module default export
export default function loadSync(): {
    config: Configuration;
    secret: SecretConfiguration;
} | null {
    try {
        const config: Configuration = readJsonSync("../../config/config.json");
        const secret: SecretConfiguration = readJsonSync("../../config/secret.json");

        console.debug("Configurations are loaded!");

        return { config, secret };
    } catch(error) {
        console.error("Error while loading configurations\n", error);
    }

    return null;
}
// #endregion