import { challengeMaking, challengeResponding } from "./challenge-handling/challenge-proms";
import { patientReduce } from "./util";
import { startRoundStage, selectTimeStage, runTimeStage, winRoundStage } from "./round-handling/round-stages-fns";
import { awaitChallenge, makeChallenge } from './challenge-handling/challenge-fns';

/* game flow
    -issue challenge (some setup can begin)
    -asynch selectTime
    -async race
    -get results
*/

// some constants for reference
const gameClient = GAME_CLIENT; // some logic from client side here
Object.freeze(gameClient);

const CHALLENGE_SCHEDULE = [
    awaitChallenge,
    makeChallenge
]
Object.freeze(CHALLENGE_SCHEDULE);

const ROUND_SCHEDULE = [
    startRoundStage,
    selectTimeStage,
    runTimeStage,
    winRoundStage
]
Object.freeze(ROUND_SCHEDULE);


awaitChallenge(gameClient) 
// the app booted: initialize given client, await challenges
//return initial challengeMaking promise(players, numberOfRounds, gameClient), 
    .then(makeChallenge) 
// someone made a challenge: send the UI to the user who was challenged
// returns an object(playesr, numberOfRounds, gameClient, challengeResponding promise) 
    .catch((rejection) => {/* handle rejection*/  console.log(rejection)})
    .then((makeChallengeResult) => {


        patientReduce(ROUND_SCHEDULE, (acc, stage, index, schedule) => {

            stage(acc);

        })

    })

    function playRounds(numberOfRounds, cb) {



    }