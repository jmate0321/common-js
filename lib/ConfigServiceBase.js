"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigServiceBase = /** @class */ (function () {
    function ConfigServiceBase(configFetcher, cache, baseConfig) {
        this.configFetcher = configFetcher;
        this.cache = cache;
        this.baseConfig = baseConfig;
    }
    ConfigServiceBase.prototype.refreshLogicBaseAsync = function (lastProjectConfig) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.configFetcher.fetchLogic(_this.baseConfig, lastProjectConfig, function (newConfig) {
                if (newConfig) {
                    _this.cache.Set(_this.baseConfig.apiKey, newConfig);
                    resolve(newConfig);
                }
                else {
                    resolve(lastProjectConfig);
                }
            });
        });
    };
    return ConfigServiceBase;
}());
exports.ConfigServiceBase = ConfigServiceBase;
