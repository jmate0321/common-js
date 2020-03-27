import { IConfigService, ConfigServiceBase } from "./ConfigServiceBase";
import { LazyLoadOptions } from "./ConfigCatClientOptions";
import { IConfigFetcher, ICache } from ".";
import { ProjectConfig } from "./ProjectConfig";
export declare class LazyLoadConfigService extends ConfigServiceBase implements IConfigService {
    private cacheTimeToLiveSeconds;
    constructor(configFetcher: IConfigFetcher, cache: ICache, config: LazyLoadOptions);
    getConfig(): Promise<ProjectConfig>;
    refreshConfigAsync(): Promise<ProjectConfig>;
}
