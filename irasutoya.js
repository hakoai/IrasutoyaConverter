"use strict";
exports.__esModule = true;
var Irasutoya = /** @class */ (function () {
    function Irasutoya() {
    }
    return Irasutoya;
}());
exports.Irasutoya = Irasutoya;
var readFileSync = require('fs').readFileSync;
var IrasutoyaDb = /** @class */ (function () {
    function IrasutoyaDb() {
        this.contents = JSON.parse(readFileSync('./irasutoya.json', 'utf-8'));
    }
    IrasutoyaDb.prototype.query = function (keyword) {
        return this.contents.filter(function (value) {
            return value.description && value.description.search(keyword) > 0;
        });
    };
    return IrasutoyaDb;
}());
exports.IrasutoyaDb = IrasutoyaDb;
