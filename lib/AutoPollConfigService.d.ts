import { AutoPollOptions } from "./ConfigCatClientOptions";
import { IConfigService, ConfigServiceBase } from "./ConfigServiceBase";
import { IConfigFetcher, ICache } from ".";
import { ProjectConfig } from "./ProjectConfig";
export declare class AutoPollConfigService extends ConfigServiceBase implements IConfigService {
    private maxInitWaitExpire;
    private configChanged;
    constructor(configFetcher: IConfigFetcher, cache: ICache, autoPollConfig: AutoPollOptions);
    getConfig(): Promise<ProjectConfig>;
    refreshConfigAsync(): Promise<ProjectConfig>;
    private refreshLogic;
    private setIntervalAsync;
}
