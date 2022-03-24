import { challengeMaking, challengeResponding } from "./challenge-handling/challenge-proms";
import { patientReduce } from "./util";
import { startRoundStage, selectTimeStage, runTimeStage, winRoundStage } from "./round-handling/round-stages-fns";


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

    const schedule = [
        challengeMaking,
        challengeResponding,
        // break this up?
        startRoundStage,
        selectTimeStage,
        runTimeStage,
        winRoundStage
    ]

patientReduce(schedule, (acc, stage, index, schedule) => {

    stage(acc);

}, gameEnv)