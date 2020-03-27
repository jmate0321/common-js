import { IConfigCatClient } from "./ConfigCatClient";
import { IOptions, OptionsBase } from "./ConfigCatClientOptions";
import { ProjectConfig } from "./ProjectConfig";
/**
 * Create an instance of ConfigCatClient and setup AutoPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for autoPoll mode
 */
export declare function createClientWithAutoPoll(apiKey: string, configCatKernel: IConfigCatKernel, options?: IAutoPollOptions): IConfigCatClient;
/**
 * Create an instance of ConfigCatClient and setup ManualPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for manualPoll mode
 */
export declare function createClientWithManualPoll(apiKey: string, configCatKernel: IConfigCatKernel, options?: IManualPollOptions): IConfigCatClient;
/**
 * Create an instance of ConfigCatClient and setup LazyLoad mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for lazyLoad mode
 */
export declare function createClientWithLazyLoad(apiKey: string, configCatKernel: IConfigCatKernel, options?: ILazyLoadingOptions): IConfigCatClient;
/**
 * Create an instance of ConfigCatConsoleLogger
 * @param {LogLevel} logLevel - Specifies message's filtering to output for the CofigCatConsoleLogger.
 */
export declare function createConsoleLogger(logLevel: LogLevel): IConfigCatLogger;
export interface IAutoPollOptions extends IOptions {
    pollIntervalSeconds?: number;
    configChanged?: () => void;
}
export interface IManualPollOptions extends IOptions {
}
export interface ILazyLoadingOptions extends IOptions {
    cacheTimeToLiveSeconds?: number;
}
export interface IConfigCatLogger {
    log(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
export declare enum LogLevel {
    Info = 3,
    Warn = 2,
    Error = 1,
    Off = -1
}
export interface IConfigCatKernel {
    configFetcher: IConfigFetcher;
    cache: ICache;
}
export interface IConfigFetcher {
    fetchLogic(options: OptionsBase, lastProjectConfig: ProjectConfig, callback: (newProjectConfig: ProjectConfig) => void): void;
}
export interface ICache {
    Set(apiKey: string, config: ProjectConfig): void;
    Get(apiKey: string): ProjectConfig;
}
