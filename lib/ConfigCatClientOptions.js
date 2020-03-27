"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigCatLogger_1 = require("./ConfigCatLogger");
var _1 = require(".");
var VERSION = require("../package.json").version;
var OptionsBase = /** @class */ (function () {
    function OptionsBase(apiKey, clientVersion, options) {
        this.logger = new ConfigCatLogger_1.ConfigCatConsoleLogger(_1.LogLevel.Warn);
        this.requestTimeoutMs = 30000;
        this.baseUrl = "https://cdn.configcat.com";
        this.proxy = "";
        if (!apiKey) {
            throw new Error("Invalid 'apiKey' value");
        }
        this.apiKey = apiKey;
        this.clientVersion = clientVersion;
        if (options) {
            if (options.logger) {
                this.logger = options.logger;
            }
            if (options.requestTimeoutMs) {
                if (options.requestTimeoutMs < 0) {
                    throw new Error("Invalid 'requestTimeoutMs' value");
                }
                this.requestTimeoutMs = options.requestTimeoutMs;
            }
            if (options.baseUrl) {
                this.baseUrl = options.baseUrl;
            }
            if (options.proxy) {
                this.proxy = options.proxy;
            }
        }
    }
    OptionsBase.prototype.getUrl = function () {
        return this.baseUrl + "/configuration-files/" + this.apiKey + "/config_v4.json";
    };
    return OptionsBase;
}());
exports.OptionsBase = OptionsBase;
var AutoPollOptions = /** @class */ (function (_super) {
    __extends(AutoPollOptions, _super);
    function AutoPollOptions(apiKey, options) {
        var _this = _super.call(this, apiKey, "a-" + VERSION, options) || this;
        _this.pollIntervalSeconds = 60;
        _this.configChanged = function () { };
        if (options) {
            if (options.pollIntervalSeconds) {
                _this.pollIntervalSeconds = options.pollIntervalSeconds;
            }
            if (options.configChanged) {
                _this.configChanged = options.configChanged;
            }
        }
        if (!_this.pollIntervalSeconds || _this.pollIntervalSeconds < 1) {
            throw new Error("Invalid 'pollIntervalSeconds' value");
        }
        return _this;
    }
    return AutoPollOptions;
}(OptionsBase));
exports.AutoPollOptions = AutoPollOptions;
var ManualPollOptions = /** @class */ (function (_super) {
    __extends(ManualPollOptions, _super);
    function ManualPollOptions(apiKey, options) {
        return _super.call(this, apiKey, "m-" + VERSION, options) || this;
    }
    return ManualPollOptions;
}(OptionsBase));
exports.ManualPollOptions = ManualPollOptions;
var LazyLoadOptions = /** @class */ (function (_super) {
    __extends(LazyLoadOptions, _super);
    function LazyLoadOptions(apiKey, options) {
        var _this = _super.call(this, apiKey, "l-" + VERSION, options) || this;
        _this.cacheTimeToLiveSeconds = 60;
        if (options) {
            if (options.cacheTimeToLiveSeconds) {
                _this.cacheTimeToLiveSeconds = options.cacheTimeToLiveSeconds;
            }
        }
        if (!_this.cacheTimeToLiveSeconds || _this.cacheTimeToLiveSeconds < 1) {
            throw new Error("Invalid 'cacheTimeToLiveSeconds' value. Value must be greater than zero.");
        }
        return _this;
    }
    return LazyLoadOptions;
}(OptionsBase));
exports.LazyLoadOptions = LazyLoadOptions;
