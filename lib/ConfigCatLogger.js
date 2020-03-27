"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var ConfigCatConsoleLogger = /** @class */ (function () {
    /**
     * Create an instance of ConfigCatConsoleLogger
     */
    function ConfigCatConsoleLogger(logLevel) {
        this.SOURCE = "ConfigCat";
        this.level = _1.LogLevel.Warn;
        if (logLevel) {
            this.level = logLevel;
        }
    }
    ConfigCatConsoleLogger.prototype.log = function (message) {
        this.info(message);
    };
    ConfigCatConsoleLogger.prototype.info = function (message) {
        if (this.isLogLevelEnabled(_1.LogLevel.Info)) {
            console.info(this.SOURCE + " - INFO - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.warn = function (message) {
        if (this.isLogLevelEnabled(_1.LogLevel.Warn)) {
            console.warn(this.SOURCE + " - WARN - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.error = function (message) {
        if (this.isLogLevelEnabled(_1.LogLevel.Error)) {
            console.error(this.SOURCE + " - ERROR - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.isLogLevelEnabled = function (logLevel) {
        return this.level >= logLevel;
    };
    return ConfigCatConsoleLogger;
}());
exports.ConfigCatConsoleLogger = ConfigCatConsoleLogger;
