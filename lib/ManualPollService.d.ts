import { IConfigService, ConfigServiceBase } from "./ConfigServiceBase";
import { ManualPollOptions } from "./ConfigCatClientOptions";
import { IConfigFetcher, ICache } from ".";
import { ProjectConfig } from "./ProjectConfig";
export declare class ManualPollService extends ConfigServiceBase implements IConfigService {
    constructor(configFetcher: IConfigFetcher, cache: ICache, config: ManualPollOptions);
    getConfig(): Promise<ProjectConfig>;
    refreshConfigAsync(): Promise<ProjectConfig>;
}
