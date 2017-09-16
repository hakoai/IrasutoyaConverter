import { Irasuto } from 'node-irasutoya';

export class Irasutoya {
    public description: string;
    public url: string;
}

const readFileSync = require('fs').readFileSync as (filename: string, encoding: string) => string;

export class IrasutoyaDb {
    contents: Irasuto[];
    constructor() {
        this.contents = JSON.parse(readFileSync('./irasutoya.json', 'utf-8')) as Irasuto[];
    }

    public query(keyword: string): Irasuto[] {
        return this.contents.filter(function(value) {
            return value.description && value.description.search(keyword) > 0;
        })
    }
}
