import { patientReduce } from "./util";
import { startRoundStage, selectTimeStage, runTimeStage, winRoundStage } from "./round-handling/round-stages-fns";
import { awaitMakeChallenge, awaitChallengeResponse } from './challenge-handling/challenge-fns';


const handleChallenge = (function init() {

    const CHALLENGE_SCHEDULE = [
        awaitMakeChallenge,
        // the app booted: initialize given client, await challenges
        //return initial challengeMaking promise(players, numberOfRounds), 
        awaitChallengeResponse,
        // someone made a challenge: send the UI to the user who was challenged
        // returns makeChallengeResult = {challengeResponse (promise)}
    ]

    return function handleChallenge(gameClient) {

           return patientReduce(CHALLENGE_SCHEDULE, (gameState, currentStageFn) => {

                const newGameState = { ...gameState };
                newGameState.current.stage = currentStageFn.name;

                const stageResult = currentStageFn(gameState);

                Object.assign(newGameState, stageResult);
                Object.freeze(newGameState);

                return newGameState;
            }, {
                gameClient,
                current: {
                    phase: 'challenge',
                },
            })
    }
}());

const playRounds = (function () {

    const ROUND_SCHEDULE = [
        startRoundStage,
        selectTimeStage,
        runTimeStage,
        winRoundStage
    ];

    function round(result) {

        patientReduce(ROUND_SCHEDULE, (gameState, currentStageFn) => {

            const previousResult = gameState.roundResults.stageResults.slice(-1);
            const newResult = currentStageFn(previousResult);
            newResult.stageName = currentStageFn.name;

            const newGameState = { ...gameState };
            newGameState.challenge.stageResults.push(newResult);
            return newGameState;

        }, result)
    }

    /**
     * 
     * @param {object} result from either the initial challenge or the previous round
     * @return @param {object} gameResult see result-objects.js
     */
    return function playRounds(gameResult) {

        const { numberOfRounds } = gameResult;
        // no rounds have passed yet
        if (!gameResult.roundResults) {
            round({
                ...gameResult,

            })
        }

        if (numberOfRounds > 0) {
            return round(result);
        }

    };

}());

handleChallenge(GAME_CLIENT)
    .catch((rejection) => {/* handle rejection*/  console.log(rejection) })
    // the challenge went through
    .then(playRounds);
