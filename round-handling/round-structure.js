import { startRoundStage, setTimerStage, runTimerStage, winRoundStage } from "./round-stages-fns";
import { patientReduce } from '../util/patientReduce';
import deepClone from "../util/deepClone";

export { playRounds };

const playRounds = (function init() {

    const ROUND_SCHEDULE = [
        startRoundStage,
        // the challenge was accepted and the round started
        // return players array with gameRole properties added to each player object
        setTimerStage,
        // the timerPlayer is prompted to input a time setting
        // returns a promise that resolves when time input in ms
        runTimerStage,
        // the timer begins to run and greedyPlayer is prompted to 'cash in'
        // returns a promise that resolves to the time the greedy player cashed in
        winRoundStage
        // the score is computed and the winner decided
        // returns the round result object to be merged into the gameState
    ];

    // roles in closure for startRoundStage
    const GAME_ROLES = ['greedyPlayer', 'timerPlayer']; 

    // rounds resolve the result of each ROUND_SCHEDULE stage function sequentially
    // schedule procedes patiently waiting for each async operation
    // results of each stage function are merged into the roundState object
    function round(gameState) {

        return new Promise((resolve, reject) => {

            // shallow copy of state
            const newGameState = deepClone(gameState);
            const currentRound = newGameState.current.round;
            const { gameClient } = newGameState;
            // last rounds' players
            const players = { ...newGameState?.roundResults?.slice(-1)?.players }
                // or gameState players
                ?? { ...newGameState.players };

            // play a round, add results to state
            patientReduce(ROUND_SCHEDULE, (roundState, currentStageFn) => {

                newGameState.current.stage = currentStageFn.name;

                // errors will return a stageResult with an error prop
                const stageResult = currentStageFn(roundState); //

                // merge stageResult into state
                Object.assign(roundState, stageResult);
                Object.freeze(roundState);

                // check for errors, reject the promise
                if (roundState.error) { return reject(roundState); };
                // probably wrong 

                return roundState;
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
     * playRounds sequentially calls round() as many times as gameState specifies
     * rounds procede patiently waiting for each to finish
     * results of each round are merged into the gameState object
     * @param {object} result from either the initial challenge or the previous round
     * @return @param {object} gameState with roundResult field
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