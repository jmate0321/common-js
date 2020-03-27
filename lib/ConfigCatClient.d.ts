import { IConfigCatKernel } from ".";
import { AutoPollOptions, ManualPollOptions, LazyLoadOptions } from "./ConfigCatClientOptions";
import { User } from "./RolloutEvaluator";
export declare const CONFIG_CHANGE_EVENT_NAME: string;
export interface IConfigCatClient {
    /** Returns the value of a feature flag or setting based on it's key */
    getValue(key: string, defaultValue: any, callback: (value: any) => void, user?: User): void;
    /** Returns the value of a feature flag or setting based on it's key */
    getValueAsync(key: string, defaultValue: any, user?: User): Promise<any>;
    /** Downloads the latest feature flag and configuration values */
    forceRefresh(callback: () => void): void;
    /** Downloads the latest feature flag and configuration values */
    forceRefreshAsync(): Promise<any>;
    /** Gets a list of keys for all your feature flags and settings */
    getAllKeys(callback: (value: string[]) => void): any;
    /** Gets a list of keys for all your feature flags and settings */
    getAllKeysAsync(): Promise<string[]>;
    /** Returns the Variation ID (analytics) of a feature flag or setting based on it's key */
    getVariationId(key: string, defaultVariationId: any, callback: (variationId: string) => void, user?: User): void;
    /** Returns the Variation ID (analytics) of a feature flag or setting based on it's key */
    getVariationIdAsync(key: string, defaultVariationId: any, user?: User): Promise<string>;
    /** Returns the Variation IDs (analytics) of all feature flags or settings */
    getAllVariationIds(callback: (variationIds: string[]) => void, user?: User): void;
    /** Returns the Variation IDs (analytics) of all feature flags or settings */
    getAllVariationIdsAsync(user?: User): Promise<string[]>;
}
export declare class ConfigCatClient implements IConfigCatClient {
    private configService;
    private evaluator;
    private options;
    constructor(options: AutoPollOptions | ManualPollOptions | LazyLoadOptions, configCatKernel: IConfigCatKernel);
    getValue(key: string, defaultValue: any, callback: (value: any) => void, user?: User): void;
    getValueAsync(key: string, defaultValue: any, user?: User): Promise<any>;
    forceRefresh(callback: () => void): void;
    forceRefreshAsync(): Promise<any>;
    getAllKeys(callback: (value: string[]) => void): void;
    getAllKeysAsync(): Promise<string[]>;
    getVariationId(key: string, defaultVariationId: any, callback: (variationId: string) => void, user?: User): void;
    getVariationIdAsync(key: string, defaultVariationId: any, user?: User): Promise<string>;
    getAllVariationIds(callback: (variationIds: string[]) => void, user?: User): void;
    getAllVariationIdsAsync(user?: User): Promise<string[]>;
}
