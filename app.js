const { acceptChallenge, endGameEarly, playGame } = require('./game-functions');
const { issueChallengePromise } = require('./promises');

/* game flow
    -issue challenge (some setup can begin)
    -asynch selectTime
    -async race
    -get results
*/

const gameEnv = GAME_ENV;

if(gameEnv = discordjs) {/* build discordAPI event emmitters*/}
if(gameEnv = web) {/* build webAPI event emmitters*/}
// etc

issueChallengePromise(gameEnv)
    .then(acceptChallenge) // this is sync with a promise in the results object
    Promise.race(endGameEarly, playGame))