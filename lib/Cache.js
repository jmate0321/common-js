"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryCache = /** @class */ (function () {
    function InMemoryCache() {
        this.cache = {};
    }
    InMemoryCache.prototype.Set = function (apiKey, config) {
        this.cache[apiKey] = config;
    };
    InMemoryCache.prototype.Get = function (apiKey) {
        return this.cache[apiKey];
    };
    return InMemoryCache;
}());
exports.InMemoryCache = InMemoryCache;
