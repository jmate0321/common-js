import { IConfigFetcher, ICache } from ".";
import { OptionsBase } from "./ConfigCatClientOptions";
import { ProjectConfig } from "./ProjectConfig";
export interface IConfigService {
    getConfig(): Promise<ProjectConfig>;
    refreshConfigAsync(): Promise<ProjectConfig>;
}
export declare abstract class ConfigServiceBase {
    protected configFetcher: IConfigFetcher;
    protected cache: ICache;
    protected baseConfig: OptionsBase;
    constructor(configFetcher: IConfigFetcher, cache: ICache, baseConfig: OptionsBase);
    protected refreshLogicBaseAsync(lastProjectConfig: ProjectConfig): Promise<ProjectConfig>;
}
