import { IContentParser, IParseContext } from './parserService';
import * as types from '../types';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';

export default class OwnersParser implements IContentParser {

    public name: string = 'scoreboard';

    parse(context: IParseContext): types.IFantasyMatchup[] {
        let result : types.IFantasyMatchup[] = [];

        let matchups = context.selector('table.matchup');

        if(matchups.length == 0) {
            return null;
        }

        matchups.each((index, matchup) => {
            result.push(this.parseMatchup(matchup));
        });

        return result;
    }

    private parseMatchup(element : any) : types.IFantasyMatchup {
        // Away team @ index 1
        let away = cheerio('tr:nth-of-type(1)', element)[0];
        let home = cheerio('tr:nth-of-type(2)', element)[0];

        let details = cheerio('.scoringDetails', element)[0];

        let result : types.IFantasyMatchup = {
            home_team: this.parseMatchupTeam(home, details),
            away_team: this.parseMatchupTeam(away, details)
        }

        return result;
    }

    private parseMatchupTeam(element : any, details : any) : types.IFantasyTeamMatchup {
        // Extract the team id from the element
        let idString = element.attribs.id;
        let teamId = parseInt(idString.split('_')[1]);

        return {
            id: teamId,
            name: cheerio('.team > .name > a', element).text(),
            short_name: _.trim(cheerio('.team > .name > .abbrev', element).text(), '()'),
            division: null,
            record:  _.trim(cheerio('.record', element).text(), '()'),
            owner_name: cheerio('.owners', element).text(),
            current_points: parseFloat(cheerio('.score', element).text()),
            in_play: parseInt(cheerio(`#team_ip_${teamId}`, details).text()),
            yet_to_play: parseInt(cheerio(`#team_ytp_${teamId}`, details).text()),
            mins_left: parseInt(cheerio(`#team_pmr_${teamId}`, details).text()),
            projected_points:  parseFloat(cheerio(`#team_liveproj_${teamId}`, details).text()),
        }
    }
}