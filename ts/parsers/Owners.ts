import { IContentParser, IParseContext } from './parserService';
import * as types from '../types';
import * as cheerio from 'cheerio';

export default class OwnersParser implements IContentParser {

    public name: string = 'owners';

    parse(context: IParseContext): types.IFantasyTeam[] {
        let result : types.IFantasyTeam[] = [];

        let table = context.selector('table.tableBody:nth-of-type(1)');

        if(table.length === 0) return null;

        let rows = table.children('.ownerRow').each((index, row) => {
            let team = this.parseOwnerRow(row);

            if(team) {
                result.push(team);
            }
        });

        return result;
    }

    private parseOwnerRow(element : any) : types.IFantasyTeam {

        let id = cheerio('td:nth-of-type(1)', element).text();

        if(!id || id.length === 0 || id.trim().length === 0) return null;

        return {
            id: parseInt(id),
            short_name: cheerio('td:nth-of-type(2)', element).text(),
            name: cheerio('td:nth-of-type(3)', element).text(),
            division: cheerio('td:nth-of-type(4)', element).text(),
            owner_name: cheerio('td:nth-of-type(5)', element).text()
        }
    }
}