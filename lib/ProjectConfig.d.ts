export declare class ProjectConfig {
    /** Entity identifier */
    HttpETag: string;
    /** ConfigCat config */
    ConfigJSON: any;
    /** Timestamp in milliseconds */
    Timestamp: number;
    constructor(timeStamp: number, jsonConfig: string, httpETag: string);
}
export declare class Setting {
    static Value: string;
    static SettingType: string;
    static RolloutPercentageItems: string;
    static RolloutRules: string;
    static VariationId: string;
}
export declare class RolloutRules {
    static Order: string;
    static ComparisonAttribute: string;
    static Comparator: string;
    static ComparisonValue: string;
    static Value: string;
    static VariationId: string;
}
export declare class RolloutPercentageItems {
    static Order: string;
    static Value: string;
    static Percentage: string;
    static VariationId: string;
}
