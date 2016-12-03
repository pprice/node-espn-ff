# node-espn-ff

Scrape basic league information from ESPN Fantasy football.

## Getting started

Install the npm module.
```
npm install espn-ff --save
```

Get some data!
```javascript
const EspnFF = require('espn-ff');

// Create a scraper instance
// NOTE: For public leagues, you do not need `cookie`, for private you will
const scraper = new EspnFF({
    leagueId: 12345 /* Your league id */,
    cookie: '<Snag this from chrome>'
})'

scraper.getFantasyTeams((err, teams) => {
    console.log('TEAMS');
    console.dir(teams);
});

scraper.getRoster(1, (err, roser) => {
    console.log('Team 1 roster");
    console.dir(roster);
});

scraper.getMatchups(null, (err, matchups) => {
    console.log('This weeks matchups');
    console.dir(teams);
});
```

## TODO

- [ ] Proper documentation for now check out `ts\types.ts`
- [ ] ADD: Waiver wire scraping
- [ ] ADD: Historical player performance

## Change Log
0.0.2 - Initial release