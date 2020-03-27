import { IConfigCatLogger } from ".";
import { ProjectConfig } from "./ProjectConfig";
export interface IRolloutEvaluator {
    Evaluate(config: ProjectConfig, key: string, defaultValue: any, user?: User, defaultVariationId?: any): ValueAndVariationId;
}
/** Object for variation evaluation */
export declare class User {
    constructor(identifier: string, email?: string, country?: string, custom?: {});
    /** Unique identifier for the User or Session. e.g. Email address, Primary key, Session Id */
    identifier: string;
    /** Optional parameter for easier targeting rule definitions */
    email?: string;
    /** Optional parameter for easier targeting rule definitions */
    country?: string;
    /** Optional dictionary for custom attributes of the User for advanced targeting rule definitions. e.g. User role, Subscription type */
    custom?: {
        [key: string]: string;
    };
}
export declare class RolloutEvaluator implements IRolloutEvaluator {
    private logger;
    constructor(logger: IConfigCatLogger);
    Evaluate(config: ProjectConfig, key: string, defaultValue: any, user?: User, defaultVariationId?: any): ValueAndVariationId;
    private EvaluateRules;
    private EvaluateVariations;
    private EvaluateNumber;
    private EvaluateSemver;
    private GetUserAttribute;
    private RuleToString;
}
declare class ValueAndVariationId {
    Value: any;
    VariationId: any;
}
export {};
