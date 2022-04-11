import { patientReduce } from './util/patientReduce';

function startRoundStage(args) {
    return Promise.resolve(args);
};
function selectTimeStage(args) {
    return Promise.resolve(args);
};
function runTimeStage(args) {
    return Promise.resolve(args);
};
function winRoundStage(args) {
    return Promise.resolve(args);
};



const playRounds = (function init() {

    const ROUND_SCHEDULE = [
        startRoundStage,
        selectTimeStage,
        runTimeStage,
        winRoundStage
    ];

    function round(gameState) {

        // shallow copy of state
        const newGameState = { ...gameState };
        const { currentRound } = newGameState.current.round;

        newGameState.roundResults[currentRound - 1] =
            // play a round, add results to state
            patientReduce(ROUND_SCHEDULE, (roundState, currentStageFn, ind, arr) => {

                const newRoundState = { ...roundState };
                newRoundState.current.stage = currentStageFn.name;

                if (ind = 0) {

                }

                // errors will be handles interally
                const stageResult = currentStageFn(gameState);

                Object.assign(newRoundState, stageResult);
                Object.freeze(newRoundState);

                // this should make patientReduce reject, to be caught on playRounds
                if(newRoundState.error) { return reject(newRoundState); }; 
                // probably wrong 

                return newRoundState;
            }, {})
            .catch(roundResults)

        return newGameState; // with updated roundResults
    }

    /**
     * @param {object} result from either the initial challenge or the previous round
     * @return @param {object} gameResult see result-objects.js
     */
    return function playRounds(gameState) {

        // default assignment and inc the current round
        const { numberOfRounds } = gameState;
        const { currentRound = 0 } = gameState.current.round;
        currentRound += 1;

        // base case: all rounds finished
        if (currentRound > numberOfRounds + 1) { return gameState; };

        // shallow clone the state
        const newGameState = { ...gameState };
        // first round init
        if (currentRound === 1) {
            newGameState.current.phase = 'game';
            newGameState.roundResults = [];
        };
        // set the current round
        newGameState.current.round = currentRound;


        // play a round
        return round(gameState)
        .catch(newGameState => {
            // check out the error here, maybe recover
            console.log(newGameState.roundResults.error)
        })
        // pseudo-recursive call
            .then(playRounds)
    };

}());

const gameStateDummy = {
    gameClient: 'react',
    players: ['player1', 'player2'],
    numberOfRounds: 3,
    challengeResponse: true,
}
// playRounds(gameStateDummy);

const obj = {
    ten: {
        one: 3
    }
}

const { one = 1 } = obj.ten;