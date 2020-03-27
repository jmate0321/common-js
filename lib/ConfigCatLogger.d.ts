import { IConfigCatLogger, LogLevel } from ".";
export declare class ConfigCatConsoleLogger implements IConfigCatLogger {
    SOURCE: string;
    level: LogLevel;
    /**
     * Create an instance of ConfigCatConsoleLogger
     */
    constructor(logLevel: LogLevel);
    log(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    isLogLevelEnabled(logLevel: LogLevel): boolean;
}
