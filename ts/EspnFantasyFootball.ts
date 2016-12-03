const BaseUrl = 'http://games.espn.com/ffl';

import * as request from 'request';
import * as types from './types';
import { ParserService } from './parsers/ParserService';

/**
 *Constructor options for the EspnFantasyFootball class
 *
 * @export
 * @interface ConstructorOptions
 */
export interface ConstructorOptions {

    /**
     * Required. ESPN league id.
     *
     * @type {number}
     * @memberOf ConstructorOptions
     */
    leagueId: number;

    /**
     * Optional. Cookie used to send requests, you will need this for non public leagues.
     *
     * @type {string}
     * @memberOf ConstructorOptions
     */
    cookie?: string;
}

/**
 * Callback raised with fetch result from ESPN fantasy football.
 *
 * @export
 * @interface FetchParseCallback
 * @template T
 */
export interface FetchParseCallback<T> {
    (error?: Error, parseResult?: T);
}

/**
 * ESPN fantasy football root class
 *
 * @class EspnFantasyFootball
 */
export default class EspnFantasyFootball {

    private options: ConstructorOptions;
    private parserService: ParserService;


    /**
     * Creates an instance of EspnFantasyFootball.
     *
     * @param {ConstructorOptions} options
     *
     * @memberOf EspnFantasyFootball
     */
    constructor(options: ConstructorOptions) {
        this.options = options;
        this.parserService = new ParserService();
    }

    /**
     * Fetches all fantasy football teams within the fantasy league.
     *
     * @param {FetchParseCallback<types.IFantasyTeam[]>} callback
     * @returns {void}
     *
     * @memberOf EspnFantasyFootball
     */
    public getFantasyTeams(callback: FetchParseCallback<types.IFantasyTeam[]>) : void {
        return this.espnGetAndParse('owners', 'leaguesetup/ownerinfo', null, callback);
    }

    /**
     * Gets the active roster for the specified fantasy team.
     *
     * @param {number} teamId - Can be null for the default team identity
     * @param {FetchParseCallback<types.IRoster>} callback
     * @returns {void}
     *
     * @memberOf EspnFantasyFootball
     */
    public getRoster(teamId: number, callback: FetchParseCallback<types.IRoster>): void {
        let query: any = {};

        if (teamId) { query.teamId = teamId; }

        return this.espnGetAndParse('clubhouse', 'clubhouse', query, callback)
    }

    /**
     * Gets the fantasy matchups for the specified week within the league.
     *
     * @param {number} week - Week id (1 thru N), can be null for current week.
     * @param {FetchParseCallback<types.IFantasyMatchup[]>} callback
     * @returns {void}
     *
     * @memberOf EspnFantasyFootball
     */
    public getMatchups(week: number, callback: FetchParseCallback<types.IFantasyMatchup[]>) :void {
        let query: any = {};

        if (week) { query.matchupIdPeriod = week; }

        return this.espnGetAndParse('scoreboard', 'scoreboard', query, callback)
    }

    private espnGetAndParse<T>(parser: string, fragment: string | string[], urlQuery: any, callback: FetchParseCallback<T>) {
        return this.espnGetRequest(fragment, urlQuery, (err, response, body) => {
            if (err) return callback(err);

            if (response.statusCode != 200) {
                return callback(new Error(`Got unexpected status code '${response.statusCode}' from request`));
            }
            else if (!body) {
                return callback(new Error(`Got unexpected empty body from request`));
            }

            const result: T = this.parserService.parseHtmlContent(parser, body);

            if (!result) {
                return callback(new Error(`Parser '${parser}' returned empty result`));
            }

            return callback(null, result);
        });
    }

    private espnGetRequest(fragment: string | string[], urlQuery: any, callback: request.RequestCallback): void {
        fragment = Array.isArray(fragment) ? fragment.join('/') : fragment;
        urlQuery = urlQuery || {};
        urlQuery.leagueId = this.options.leagueId;

        const options: request.Options = {
            method: 'GET',
            url: BaseUrl + '/' + fragment,
            qs: urlQuery,
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
            }
        };

        if (this.options.cookie) {
            options.headers['Cookie'] = this.options.cookie;
        }

        request(options, callback);
    }
}
