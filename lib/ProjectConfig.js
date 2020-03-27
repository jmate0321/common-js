"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectConfig = /** @class */ (function () {
    function ProjectConfig(timeStamp, jsonConfig, httpETag) {
        this.Timestamp = timeStamp;
        this.ConfigJSON = JSON.parse(jsonConfig);
        this.HttpETag = httpETag;
    }
    return ProjectConfig;
}());
exports.ProjectConfig = ProjectConfig;
var Setting = /** @class */ (function () {
    function Setting() {
    }
    Setting.Value = "v";
    Setting.SettingType = "t";
    Setting.RolloutPercentageItems = "p";
    Setting.RolloutRules = "r";
    Setting.VariationId = "i";
    return Setting;
}());
exports.Setting = Setting;
var RolloutRules = /** @class */ (function () {
    function RolloutRules() {
    }
    RolloutRules.Order = "o";
    RolloutRules.ComparisonAttribute = "a";
    RolloutRules.Comparator = "t";
    RolloutRules.ComparisonValue = "c";
    RolloutRules.Value = "v";
    RolloutRules.VariationId = "i";
    return RolloutRules;
}());
exports.RolloutRules = RolloutRules;
var RolloutPercentageItems = /** @class */ (function () {
    function RolloutPercentageItems() {
    }
    RolloutPercentageItems.Order = "o";
    RolloutPercentageItems.Value = "v";
    RolloutPercentageItems.Percentage = "p";
    RolloutPercentageItems.VariationId = "i";
    return RolloutPercentageItems;
}());
exports.RolloutPercentageItems = RolloutPercentageItems;
