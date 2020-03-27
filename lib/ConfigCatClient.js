"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigCatClientOptions_1 = require("./ConfigCatClientOptions");
var AutoPollConfigService_1 = require("./AutoPollConfigService");
var LazyLoadConfigService_1 = require("./LazyLoadConfigService");
var ManualPollService_1 = require("./ManualPollService");
var RolloutEvaluator_1 = require("./RolloutEvaluator");
exports.CONFIG_CHANGE_EVENT_NAME = "changed";
var ConfigCatClient = /** @class */ (function () {
    function ConfigCatClient(options, configCatKernel) {
        if (!options) {
            throw new Error("Invalid 'options' value");
        }
        this.options = options;
        if (!configCatKernel) {
            throw new Error("Invalid 'configCatKernel' value");
        }
        if (!configCatKernel.cache) {
            throw new Error("Invalid 'configCatKernel.cache' value");
        }
        if (!configCatKernel.configFetcher) {
            throw new Error("Invalid 'configCatKernel.configFetcher' value");
        }
        this.evaluator = new RolloutEvaluator_1.RolloutEvaluator(options.logger);
        if (options && options instanceof ConfigCatClientOptions_1.LazyLoadOptions) {
            this.configService = new LazyLoadConfigService_1.LazyLoadConfigService(configCatKernel.configFetcher, configCatKernel.cache, options);
        }
        else if (options && options instanceof ConfigCatClientOptions_1.ManualPollOptions) {
            this.configService = new ManualPollService_1.ManualPollService(configCatKernel.configFetcher, configCatKernel.cache, options);
        }
        else if (options && options instanceof ConfigCatClientOptions_1.AutoPollOptions) {
            this.configService = new AutoPollConfigService_1.AutoPollConfigService(configCatKernel.configFetcher, configCatKernel.cache, options);
        }
        else {
            throw new Error("Invalid 'options' value");
        }
    }
    ConfigCatClient.prototype.getValue = function (key, defaultValue, callback, user) {
        this.getValueAsync(key, defaultValue, user).then(function (value) {
            callback(value);
        });
    };
    ConfigCatClient.prototype.getValueAsync = function (key, defaultValue, user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        result = defaultValue;
                        result = this.evaluator.Evaluate(config, key, defaultValue, user).Value;
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.forceRefresh = function (callback) {
        this.forceRefreshAsync().then(function () {
            callback();
        });
    };
    ConfigCatClient.prototype.forceRefreshAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.refreshConfigAsync()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getAllKeys = function (callback) {
        this.getAllKeysAsync().then(function (value) {
            callback(value);
        });
    };
    ConfigCatClient.prototype.getAllKeysAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        if (!config || !config.ConfigJSON) {
                            this.options.logger.error("JSONConfig is not present, returning empty array");
                            resolve([]);
                            return [2 /*return*/];
                        }
                        resolve(Object.keys(config.ConfigJSON));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getVariationId = function (key, defaultVariationId, callback, user) {
        this.getVariationIdAsync(key, defaultVariationId, user).then(function (variationId) {
            callback(variationId);
        });
    };
    ConfigCatClient.prototype.getVariationIdAsync = function (key, defaultVariationId, user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        result = defaultVariationId;
                        result = this.evaluator.Evaluate(config, key, null, user, defaultVariationId).VariationId;
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getAllVariationIds = function (callback, user) {
        this.getAllVariationIdsAsync(user).then(function (variationIds) {
            callback(variationIds);
        });
    };
    ConfigCatClient.prototype.getAllVariationIdsAsync = function (user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var keys, promises, variationIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllKeysAsync()];
                    case 1:
                        keys = _a.sent();
                        if (keys.length === 0) {
                            resolve([]);
                            return [2 /*return*/];
                        }
                        promises = keys.map(function (key) { return _this.getVariationIdAsync(key, null, user); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        variationIds = _a.sent();
                        resolve(variationIds);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ConfigCatClient;
}());
exports.ConfigCatClient = ConfigCatClient;
