"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectConfig_1 = require("./ProjectConfig");
var Sha1_1 = require("./Sha1");
var semver = require("./Semver");
function isUndefined(obj) {
    return obj === undefined;
}
/** Object for variation evaluation */
var User = /** @class */ (function () {
    function User(identifier, email, country, custom) {
        if (email === void 0) { email = null; }
        if (country === void 0) { country = null; }
        if (custom === void 0) { custom = {}; }
        /** Optional dictionary for custom attributes of the User for advanced targeting rule definitions. e.g. User role, Subscription type */
        this.custom = {};
        this.identifier = identifier;
        this.email = email;
        this.country = country;
        this.custom = custom;
    }
    return User;
}());
exports.User = User;
var RolloutEvaluator = /** @class */ (function () {
    function RolloutEvaluator(logger) {
        this.logger = logger;
    }
    RolloutEvaluator.prototype.Evaluate = function (config, key, defaultValue, user, defaultVariationId) {
        if (!config || !config.ConfigJSON) {
            this.logger.error("JSONConfig is not present. Returning default value: '" + defaultValue + "'.");
            return { Value: defaultValue, VariationId: defaultVariationId };
        }
        if (!config.ConfigJSON[key]) {
            var s = "Evaluating getValue('" + key + "') failed. Returning default value: '" + defaultValue + "'.";
            s += " Here are the available keys: {" + Object.keys(config.ConfigJSON).join() + "}.";
            this.logger.error(s);
            return { Value: defaultValue, VariationId: defaultVariationId };
        }
        var eLog = new EvaluateLogger();
        eLog.User = user;
        eLog.KeyName = key;
        eLog.ReturnValue = defaultValue;
        var result = new EvaluateResult();
        result.EvaluateLog = eLog;
        if (user) {
            result = this.EvaluateRules(config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutRules], user, eLog);
            if (result.ValueAndVariationId == null) {
                result.ValueAndVariationId = this.EvaluateVariations(config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutPercentageItems], key, user);
                if (result.ValueAndVariationId) {
                    result.EvaluateLog.ReturnValue = result.ValueAndVariationId.Value;
                }
                if (config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutPercentageItems].length > 0) {
                    result.EvaluateLog.OpAppendLine("Evaluating % options => " + (result.ValueAndVariationId == null ? "user not targeted" : "user targeted"));
                }
            }
        }
        else {
            if ((config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutRules] && config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutRules].length > 0) ||
                (config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutPercentageItems] && config.ConfigJSON[key][ProjectConfig_1.Setting.RolloutPercentageItems].length > 0)) {
                var s = "Evaluating getValue('" + key + "'). ";
                s += "UserObject missing! You should pass a UserObject to getValue(), in order to make targeting work properly. ";
                s += "Read more: https://configcat.com/docs/advanced/user-object";
                this.logger.warn(s);
            }
        }
        if (result.ValueAndVariationId == null) {
            result.ValueAndVariationId = {
                Value: config.ConfigJSON[key][ProjectConfig_1.Setting.Value],
                VariationId: config.ConfigJSON[key][ProjectConfig_1.Setting.VariationId],
            };
            result.EvaluateLog.ReturnValue = result.ValueAndVariationId.Value;
        }
        this.logger.info(result.EvaluateLog.GetLog());
        return result.ValueAndVariationId;
    };
    RolloutEvaluator.prototype.EvaluateRules = function (rolloutRules, user, eLog) {
        var result = new EvaluateResult();
        result.ValueAndVariationId = null;
        if (rolloutRules && rolloutRules.length > 0) {
            var _loop_1 = function (i) {
                var rule = rolloutRules[i];
                var comparisonAttribute = this_1.GetUserAttribute(user, rule[ProjectConfig_1.RolloutRules.ComparisonAttribute]);
                if (!comparisonAttribute) {
                    return "continue";
                }
                var comparator = rule[ProjectConfig_1.RolloutRules.Comparator];
                var comparisonValue = rule[ProjectConfig_1.RolloutRules.ComparisonValue];
                var log = "Evaluating rule: '" + comparisonAttribute + "' " + this_1.RuleToString(comparator) + " '" + comparisonValue + "' => ";
                switch (comparator) {
                    case 0: // is one of
                        var cvs = comparisonValue.split(",");
                        for (var ci = 0; ci < cvs.length; ci++) {
                            if (cvs[ci].trim() === comparisonAttribute) {
                                log += "MATCH";
                                eLog.OpAppendLine(log);
                                result.ValueAndVariationId = {
                                    Value: rule[ProjectConfig_1.RolloutRules.Value],
                                    VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                                };
                                eLog.ReturnValue = result.ValueAndVariationId.Value;
                                result.EvaluateLog = eLog;
                                return { value: result };
                            }
                        }
                        log += "no match";
                        break;
                    case 1: // is not one of
                        if (!comparisonValue.split(",").some(function (e) {
                            if (e.trim() === comparisonAttribute) {
                                return true;
                            }
                            return false;
                        })) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 2: // contains
                        if (comparisonAttribute.search(comparisonValue) !== -1) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 3: // not contains
                        if (comparisonAttribute.search(comparisonValue) === -1) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        if (this_1.EvaluateSemver(comparisonAttribute, comparisonValue, comparator)) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        if (this_1.EvaluateNumber(comparisonAttribute, comparisonValue, comparator)) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 16: // is one of (sensitive)
                        var values = comparisonValue.split(",");
                        for (var ci = 0; ci < values.length; ci++) {
                            if (values[ci].trim() === Sha1_1.sha1(comparisonAttribute)) {
                                log += "MATCH";
                                eLog.OpAppendLine(log);
                                result.ValueAndVariationId = {
                                    Value: rule[ProjectConfig_1.RolloutRules.Value],
                                    VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                                };
                                eLog.ReturnValue = result.ValueAndVariationId.Value;
                                result.EvaluateLog = eLog;
                                return { value: result };
                            }
                        }
                        log += "no match";
                        break;
                    case 17: // is not one of (sensitive)
                        if (!comparisonValue.split(",").some(function (e) {
                            if (e.trim() === Sha1_1.sha1(comparisonAttribute)) {
                                return true;
                            }
                            return false;
                        })) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[ProjectConfig_1.RolloutRules.Value],
                                VariationId: rule[ProjectConfig_1.RolloutRules.VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    default:
                        break;
                }
                eLog.OpAppendLine(log);
            };
            var this_1 = this;
            for (var i = 0; i < rolloutRules.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        result.EvaluateLog = eLog;
        return result;
    };
    RolloutEvaluator.prototype.EvaluateVariations = function (rolloutPercentageItems, key, User) {
        if (rolloutPercentageItems && rolloutPercentageItems.length > 0) {
            var hashCandidate = key + User.identifier;
            var hashValue = Sha1_1.sha1(hashCandidate).substring(0, 7);
            var hashScale = parseInt(hashValue, 16) % 100;
            var bucket = 0;
            for (var i = 0; i < rolloutPercentageItems.length; i++) {
                var variation = rolloutPercentageItems[i];
                bucket += +variation[ProjectConfig_1.RolloutPercentageItems.Percentage];
                if (hashScale < bucket) {
                    return {
                        Value: variation[ProjectConfig_1.RolloutPercentageItems.Value],
                        VariationId: variation[ProjectConfig_1.RolloutPercentageItems.VariationId]
                    };
                }
            }
        }
        return null;
    };
    RolloutEvaluator.prototype.EvaluateNumber = function (v1, v2, comparator) {
        var n1, n2;
        if (v1 && !Number.isNaN(Number.parseFloat(v1.replace(',', '.')))) {
            n1 = Number.parseFloat(v1.replace(',', '.'));
        }
        else {
            return false;
        }
        if (v2 && !Number.isNaN(Number.parseFloat(v2.replace(',', '.')))) {
            n2 = Number.parseFloat(v2.replace(',', '.'));
        }
        else {
            return false;
        }
        switch (comparator) {
            case 10:
                return n1 == n2;
            case 11:
                return n1 != n2;
            case 12:
                return n1 < n2;
            case 13:
                return n1 <= n2;
            case 14:
                return n1 > n2;
            case 15:
                return n1 >= n2;
            default:
                break;
        }
        return false;
    };
    RolloutEvaluator.prototype.EvaluateSemver = function (v1, v2, comparator) {
        if (semver.valid(v1) == null || isUndefined(v2)) {
            return false;
        }
        v2 = v2.trim();
        switch (comparator) {
            case 4:
                // in
                var sv = v2.split(",");
                var found = false;
                for (var ci = 0; ci < sv.length; ci++) {
                    if (!sv[ci] || isUndefined(sv[ci]) || sv[ci].trim() === "") {
                        continue;
                    }
                    if (semver.valid(sv[ci].trim()) == null) {
                        return false;
                    }
                    if (!found) {
                        found = semver.looseeq(v1, sv[ci].trim());
                    }
                }
                return found;
            case 5:
                // not in
                return !v2.split(",").some(function (e) {
                    if (!e || isUndefined(e) || e.trim() === "") {
                        return false;
                    }
                    e = semver.valid(e.trim());
                    if (e == null) {
                        return false;
                    }
                    return semver.eq(v1, e);
                });
            case 6:
                if (semver.valid(v2) == null) {
                    return false;
                }
                return semver.lt(v1, v2);
            case 7:
                if (semver.valid(v2) == null) {
                    return false;
                }
                return semver.lte(v1, v2);
            case 8:
                if (semver.valid(v2) == null) {
                    return false;
                }
                return semver.gt(v1, v2);
            case 9:
                if (semver.valid(v2) == null) {
                    return false;
                }
                return semver.gte(v1, v2);
            default:
                break;
        }
        return false;
    };
    RolloutEvaluator.prototype.GetUserAttribute = function (User, attribute) {
        switch (attribute) {
            case "Identifier":
                return User.identifier;
            case "Email":
                return User.email;
            case "Country":
                return User.country;
            default:
                return (User.custom || {})[attribute];
        }
    };
    RolloutEvaluator.prototype.RuleToString = function (rule) {
        switch (rule) {
            case 0:
                return "IS ONE OF";
            case 1:
                return "IS NOT ONE OF";
            case 2:
                return "CONTAINS";
            case 3:
                return "DOES NOT CONTAIN";
            case 4:
                return "IS ONE OF (SemVer)";
            case 5:
                return "IS NOT ONE OF (SemVer)";
            case 6:
                return "< (SemVer)";
            case 7:
                return "<= (SemVer)";
            case 8:
                return "> (SemVer)";
            case 9:
                return ">= (SemVer)";
            case 10:
                return "= (Number)";
            case 11:
                return "!= (Number)";
            case 12:
                return "< (Number)";
            case 13:
                return "<= (Number)";
            case 14:
                return "> (Number)";
            case 15:
                return ">= (Number)";
            case 16:
                return "IS ONE OF (Sensitive)";
            case 17:
                return "IS NOT ONE OF (Sensitive)";
            default:
                return rule;
        }
    };
    return RolloutEvaluator;
}());
exports.RolloutEvaluator = RolloutEvaluator;
var ValueAndVariationId = /** @class */ (function () {
    function ValueAndVariationId() {
    }
    return ValueAndVariationId;
}());
var EvaluateResult = /** @class */ (function () {
    function EvaluateResult() {
    }
    return EvaluateResult;
}());
var EvaluateLogger = /** @class */ (function () {
    function EvaluateLogger() {
        this.Operations = "";
    }
    EvaluateLogger.prototype.OpAppendLine = function (s) {
        this.Operations += " " + s + "\n";
    };
    EvaluateLogger.prototype.GetLog = function () {
        return "Evaluate '" + this.KeyName + "'"
            + "\n User : " + JSON.stringify(this.User)
            + "\n" + this.Operations
            + " Returning value : " + this.ReturnValue;
    };
    return EvaluateLogger;
}());
