import { IConfigFetcher, IConfigCatLogger, ICache } from ".";
import { OptionsBase } from "./ConfigCatClientOptions";

export class ProjectConfig {
    /** Entity identifier */
    HttpETag: string;
    /** ConfigCat config content */
    JSONConfig: string;
    /** Timestamp in milliseconds */
    Timestamp: number;

    constructor(timeStamp: number, jsonConfig: string, httpETag: string) {
        this.Timestamp = timeStamp;
        this.JSONConfig = jsonConfig;
        this.HttpETag = httpETag;
    }
}

export interface IConfigService {
    getConfig(callback: (value: ProjectConfig) => void): void;

    refreshConfig(callback?: (value: ProjectConfig) => void): void;
}

export abstract class ConfigServiceBase {
    protected configFetcher: IConfigFetcher;
    protected cache: ICache;
    protected baseConfig: OptionsBase;

    constructor(configFetcher: IConfigFetcher, cache: ICache, baseConfig: OptionsBase) {
        
        if (!configFetcher) {
            throw new Error("Invalid 'configFetcher' value");
        }

        if (!cache) {
            throw new Error("Invalid 'cache' value");
        }

        if (!baseConfig) {
            throw new Error("Invalid 'baseConfig' value");
        }

        this.configFetcher = configFetcher;
        this.cache = cache;
        this.baseConfig = baseConfig;
    }

    protected refreshLogicBase(lastProjectConfig: ProjectConfig, callback: (value: ProjectConfig) => void): void {

        this.configFetcher.fetchLogic(this.baseConfig, lastProjectConfig, (newConfig) => {

            if (newConfig) {

                this.cache.Set(this.baseConfig.apiKey, newConfig);

                callback(newConfig);
            }
        });
    }
}