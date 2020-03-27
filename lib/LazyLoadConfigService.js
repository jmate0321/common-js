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
var ConfigServiceBase_1 = require("./ConfigServiceBase");
var LazyLoadConfigService = /** @class */ (function (_super) {
    __extends(LazyLoadConfigService, _super);
    function LazyLoadConfigService(configFetcher, cache, config) {
        var _this = _super.call(this, configFetcher, cache, config) || this;
        _this.cacheTimeToLiveSeconds = config.cacheTimeToLiveSeconds;
        return _this;
    }
    LazyLoadConfigService.prototype.getConfig = function () {
        var p = this.cache.Get(this.baseConfig.apiKey);
        if (p && p.Timestamp + (this.cacheTimeToLiveSeconds * 1000) > new Date().getTime()) {
            return new Promise(function (resolve) { return resolve(p); });
        }
        else {
            return this.refreshLogicBaseAsync(p);
        }
    };
    LazyLoadConfigService.prototype.refreshConfigAsync = function () {
        var p = this.cache.Get(this.baseConfig.apiKey);
        return this.refreshLogicBaseAsync(p);
    };
    return LazyLoadConfigService;
}(ConfigServiceBase_1.ConfigServiceBase));
exports.LazyLoadConfigService = LazyLoadConfigService;
