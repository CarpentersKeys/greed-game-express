import { challengeMaking, challengeResponding } from "./promises-maker-fns";

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

challengeMaking(gameEnv)
    .then(challengeResponding) 
    Promise.race(gameEnding, gamePlaying)