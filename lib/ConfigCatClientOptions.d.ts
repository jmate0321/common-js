import { IConfigCatLogger, IAutoPollOptions, ILazyLoadingOptions, IManualPollOptions } from ".";
export interface IOptions {
    logger?: IConfigCatLogger;
    requestTimeoutMs?: number;
    baseUrl?: string;
    proxy?: string;
}
export declare abstract class OptionsBase implements IOptions {
    logger: IConfigCatLogger;
    apiKey: string;
    clientVersion: string;
    requestTimeoutMs: number;
    baseUrl: string;
    proxy: string;
    constructor(apiKey: string, clientVersion: string, options: IOptions);
    getUrl(): string;
}
export declare class AutoPollOptions extends OptionsBase implements IAutoPollOptions {
    pollIntervalSeconds: number;
    configChanged: () => void;
    constructor(apiKey: string, options: IAutoPollOptions);
}
export declare class ManualPollOptions extends OptionsBase implements IManualPollOptions {
    constructor(apiKey: string, options: IManualPollOptions);
}
export declare class LazyLoadOptions extends OptionsBase implements ILazyLoadingOptions {
    cacheTimeToLiveSeconds: number;
    constructor(apiKey: string, options: ILazyLoadingOptions);
}
