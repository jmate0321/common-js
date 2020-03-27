"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigCatClient_1 = require("./ConfigCatClient");
var ConfigCatClientOptions_1 = require("./ConfigCatClientOptions");
var ConfigCatLogger_1 = require("./ConfigCatLogger");
/**
 * Create an instance of ConfigCatClient and setup AutoPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for autoPoll mode
 */
function createClientWithAutoPoll(apiKey, configCatKernel, options) {
    return new ConfigCatClient_1.ConfigCatClient(new ConfigCatClientOptions_1.AutoPollOptions(apiKey, options), configCatKernel);
}
exports.createClientWithAutoPoll = createClientWithAutoPoll;
/**
 * Create an instance of ConfigCatClient and setup ManualPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for manualPoll mode
 */
function createClientWithManualPoll(apiKey, configCatKernel, options) {
    return new ConfigCatClient_1.ConfigCatClient(new ConfigCatClientOptions_1.ManualPollOptions(apiKey, options), configCatKernel);
}
exports.createClientWithManualPoll = createClientWithManualPoll;
/**
 * Create an instance of ConfigCatClient and setup LazyLoad mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for lazyLoad mode
 */
function createClientWithLazyLoad(apiKey, configCatKernel, options) {
    return new ConfigCatClient_1.ConfigCatClient(new ConfigCatClientOptions_1.LazyLoadOptions(apiKey, options), configCatKernel);
}
exports.createClientWithLazyLoad = createClientWithLazyLoad;
/**
 * Create an instance of ConfigCatConsoleLogger
 * @param {LogLevel} logLevel - Specifies message's filtering to output for the CofigCatConsoleLogger.
 */
function createConsoleLogger(logLevel) {
    return new ConfigCatLogger_1.ConfigCatConsoleLogger(logLevel);
}
exports.createConsoleLogger = createConsoleLogger;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Off"] = -1] = "Off";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
