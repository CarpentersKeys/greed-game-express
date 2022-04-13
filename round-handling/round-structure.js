import { startRoundStage, setTimerStage, runTimerStage, winRoundStage } from "./round-stages-fns";
import { patientReduce } from '../util/patientReduce';

export { playRounds };

const playRounds = (function init() {

    const ROUND_SCHEDULE = [
        startRoundStage,
        setTimerStage,
        runTimerStage,
        winRoundStage
    ];

    function round(gameState) {

        return new Promise((resolve, reject) => {

            // shallow copy of state
            const newGameState = { ...gameState };
            const currentRound = newGameState.current.round;
            const { gameClient, players } = newGameState;

            // play a round, add results to state
            patientReduce(ROUND_SCHEDULE, (roundState, currentStageFn, ind) => {

                const newRoundState = { ...roundState };
                newGameState.current.stage = currentStageFn.name;

                // errors will return a stageResult with an error prop
                const stageResult = currentStageFn(roundState); //

                // merge stageResult into state
                Object.assign(newRoundState, stageResult);
                Object.freeze(newRoundState);

                // check for errors, reject the promise
                if (newRoundState.error) { return reject(newRoundState); };
                // probably wrong 

                return newRoundState;
            }, {
                gameClient,
                players,
            })
                .then(roundResult => {
                    newGameState.roundResults[currentRound - 1] = roundResult
                    Object.freeze(newGameState);
                    resolve(newGameState);
                })


            return newGameState; // with updated roundResults
        })
    }

    /**
     * @param {object} result from either the initial challenge or the previous round
     * @return @param {object} gameResult see result-objects.js
     */
    return function playRounds(gameState) {

        // round vars and inc the current round
        const { numberOfRounds } = gameState;
        let currentRound = gameState.current.round ?? 0;
        currentRound += 1;
        // base case: all rounds finished
        if (currentRound > numberOfRounds) { return gameState; };

        // shallow clone the state
        const newGameState = { ...gameState };
        // first round init
        if (currentRound === 1) {
            newGameState.current.phase = 'game';
            newGameState.roundResults = [];
        };
        // set the current round
        newGameState.current.round = currentRound;
        Object.freeze(newGameState);


        // play a round
        return round(newGameState)
            .catch(gameStateRoundError => {
                // check out the error here, maybe recover
                console.log(gameStateRoundError)
            })
            // pseudo-recursive call
            .then(playRounds)
    };

}());

// function startRoundStage(args) {
//     return {
//         sRS: Promise.resolve('1'),
//         sRS2: 'trwo',
//     };
// };
// function setTimerStage(args) {
//     return { sTS: Promise.resolve('2') };
// };
// function runTimerStage(args) {
//     return { rTS: Promise.resolve('3') };
// };
// function winRoundStage(args) {
//     return { wRS: Promise.resolve('4') };
// };

// const gameStateDummy = {
//     gameClient: 'react',
//     players: ['player1', 'player2'],
//     numberOfRounds: 3,
//     challengeResponse: true,
//     current: {
//         phase: 'challenge',
//         stage: 'awaitChallengeResponse',
//     }
// }
// const result = await playRounds(gameStateDummy);

// result