
/**
 * Represents a match up between two fantasy teams within the league
 *
 * @export
 * @interface IFantasyMatchup
 */
export interface IFantasyMatchup  {
    /**
     * Home team matchup data
     *
     * @type {IFantasyTeamMatchup}
     * @memberOf IFantasyMatchup
     */
    home_team: IFantasyTeamMatchup;
    /**
     * Away team matchup data
     *
     * @type {IFantasyTeamMatchup}
     * @memberOf IFantasyMatchup
     */
    away_team: IFantasyTeamMatchup;
}

/**
 * Represents a team within the scope of a weekly matchup.
 *
 * @export
 * @interface IFantasyTeamMatchup
 * @extends {IFantasyTeam}
 */
export interface IFantasyTeamMatchup extends IFantasyTeam {
    /**
     * Current points for the team.
     *
     * @type {number}
     * @memberOf IFantasyTeamMatchup
     */
    current_points?: number;
    /**
     * Projected points for the team.
     *
     * @type {number}
     * @memberOf IFantasyTeamMatchup
     */
    projected_points?: number;
    /**
     * Game minutes left for players on the team
     *
     * @type {number}
     * @memberOf IFantasyTeamMatchup
     */
    mins_left?: number;
    /**
     * Number of players yet to play.
     *
     * @type {number}
     * @memberOf IFantasyTeamMatchup
     */
    yet_to_play?: number;
    /**
     * Number of players currently in play.
     *
     * @type {number}
     * @memberOf IFantasyTeamMatchup
     */
    in_play?: number;
}

/**
 * Represents a fantasy team within the league.
 *
 * @export
 * @interface IFantasyTeam
 */
export interface IFantasyTeam {
    /**
     * Team id.
     *
     * @type {number}
     * @memberOf IFantasyTeam
     */
    id: number;
    /**
     * Short name for the team.
     *
     * @type {string}
     * @memberOf IFantasyTeam
     */
    short_name: string;
    /**
     * Full team name.
     *
     * @type {string}
     * @memberOf IFantasyTeam
     */
    name: string;
    /**
     * Owner name of the team.
     *
     * @type {string}
     * @memberOf IFantasyTeam
     */
    owner_name: string;
    /**
     * Division the team is in.
     *
     * @type {string}
     * @memberOf IFantasyTeam
     */
    division?: string;
    /**
     * Current record (W-L-D) for the team.
     *
     * @type {string}
     * @memberOf IFantasyTeam
     */
    record?: string;
}

/**
 * Represents a fantasy team roster.
 *
 * @export
 * @interface IRoster
 */
export interface IRoster {
    /**
     * Array of starting players.
     *
     * @type {IRosterSlot[]}
     * @memberOf IRoster
     */
    starters: IRosterSlot[];
    /**
     * Array of benched players.
     *
     * @type {IRosterSlot[]}
     * @memberOf IRoster
     */
    bench: IRosterSlot[];
    /**
     * Matchup week the roster represents.
     *
     * @type {number}
     * @memberOf IRoster
     */
    week?: number;
}

/**
 * Represents a slot within the roster.
 *
 * @export
 * @interface IRosterSlot
 */
export interface IRosterSlot {
    /**
     * Slot type (e.g. QB, WR, RB, FLEX, etc)
     *
     * @type {string}
     * @memberOf IRosterSlot
     */
    slot?: string;
    /**
     * Name of the player.
     *
     * @type {IPlayer}
     * @memberOf IRosterSlot
     */
    player: IPlayer;
    /**
     * Real matchup opponent for the player.
     *
     * @type {string}
     * @memberOf IRosterSlot
     */
    opponent?: string;
    /**
     * Kickoff time for the real life game.
     *
     * @type {string}
     * @memberOf IRosterSlot
     */
    gameStart?: string;
    /**
     * Matchup statistics for the player.
     *
     * @type {IPlayerMatchup}
     * @memberOf IRosterSlot
     */
    matchup?: IPlayerMatchup;
}

/**
 * Presents a NFL football player.
 *
 * @export
 * @interface IPlayer
 */
export interface IPlayer {
    /**
     * Player id.
     *
     * @type {number}
     * @memberOf IPlayer
     */
    id: number;
    /**
     * Player name.
     *
     * @type {string}
     * @memberOf IPlayer
     */
    name: string;
    /**
     * Team the player belongs to.
     *
     * @type {string}
     * @memberOf IPlayer
     */
    team: string;
    /**
     * Players season long statistics.
     *
     * @type {IPlayerSeasonStatistics}
     * @memberOf IPlayer
     */
    season_statistics?: IPlayerSeasonStatistics;
}

/**
 * Player matchup statistics.
 *
 * @export
 * @interface IPlayerMatchup
 */
export interface IPlayerMatchup {
    /**
     * Projected or current points for the player.
     *
     * @type {number}
     * @memberOf IPlayerMatchup
     */
    projected_or_current_points: number;
    /**
     * Rank of the players opponent against the players position (1 is toughest, 32 is weakest).
     *
     * @type {number}
     * @memberOf IPlayerMatchup
     */
    opponent_rank: number;
    /**
     * Percent of all fantasy teams in ESPN FF to start the player.
     *
     * @type {number}
     * @memberOf IPlayerMatchup
     */
    percent_start: number;
    /**
     * Percent of all fantasy teams in ESPN FF to own the player.
     *
     * @type {number}
     * @memberOf IPlayerMatchup
     */
    percent_own: number;
    /**
     * Weekly percentage delta for ownership of the player across all ESPN FF teams. Can be negative.
     *
     * @type {number}
     * @memberOf IPlayerMatchup
     */
    percent_own_delta: number;
}

/**
 *
 *
 * @export
 * @interface IPlayerSeasonStatistics
 */
export interface IPlayerSeasonStatistics {
    /**
     * Rank of the player within thier postion (1 being highest, or best).
     *
     * @type {number}
     * @memberOf IPlayerSeasonStatistics
     */
    player_rank: number;
    /**
     * Cumulative points for the player.
     *
     * @type {number}
     * @memberOf IPlayerSeasonStatistics
     */
    total_points: number;
    /**
     * Average points per game for the player.
     *
     * @type {number}
     * @memberOf IPlayerSeasonStatistics
     */
    average_points: number;
    /**
     * Points scored by the player in last weeks game.
     *
     * @type {number}
     * @memberOf IPlayerSeasonStatistics
     */
    last_game_points: number;
}