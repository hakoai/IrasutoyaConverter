"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Irasutoya {
}
exports.Irasutoya = Irasutoya;
const readFileSync = require('fs').readFileSync;
class IrasutoyaDb {
    constructor() {
        this.contents = JSON.parse(readFileSync('./irasutoya.json', 'utf-8'));
    }
    query(keyword) {
        return this.contents.filter(function (value) {
            return value.description && value.description.search(keyword) > 0;
        });
    }
}
exports.IrasutoyaDb = IrasutoyaDb;
