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
var ManualPollService = /** @class */ (function (_super) {
    __extends(ManualPollService, _super);
    function ManualPollService(configFetcher, cache, config) {
        return _super.call(this, configFetcher, cache, config) || this;
    }
    ManualPollService.prototype.getConfig = function () {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this.cache.Get(_this.baseConfig.apiKey)); });
    };
    ManualPollService.prototype.refreshConfigAsync = function () {
        var p = this.cache.Get(this.baseConfig.apiKey);
        return this.refreshLogicBaseAsync(p);
    };
    return ManualPollService;
}(ConfigServiceBase_1.ConfigServiceBase));
exports.ManualPollService = ManualPollService;
