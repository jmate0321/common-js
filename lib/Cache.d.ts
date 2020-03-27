import { ProjectConfig } from "./ProjectConfig";
import { ICache } from ".";
export declare class InMemoryCache implements ICache {
    cache: {
        [apiKey: string]: ProjectConfig;
    };
    Set(apiKey: string, config: ProjectConfig): void;
    Get(apiKey: string): ProjectConfig;
}
