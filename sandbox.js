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

    function round(gameState, currentRound) {

        const newGameState_Round = { ...gameState };
        newGameState_Round.currently = `round${currentRound}`;
        newGameState_Round.roundResults[currentRound - 1] =

            patientReduce(ROUND_SCHEDULE, (gameState, currentStageFn, ind, arr) => {

                const newGameState_Stage = { ...gameState };
                newGameState_Stage.currently = newGameState_Stage.currently.concat(`, ${currentStageFn.name}`)

                const stageResult = currentStageFn(gameState);
                if (ind >= arr.length - 1) {
                    stageResult.currentRound
                }

                Object.assign(newGameState_Stage, stageResult);
                Object.freeze(newGameState_Stage);

                return newGameState_Stage;
            }, newGameState_Round)
    }

    /**
     * 
     * @param {object} result from either the initial challenge or the previous round
     * @return @param {object} gameResult see result-objects.js
     */
    return function playRounds(gameState) {

        const { numberOfRounds } = gameState;
        const { currentRound = 0 } = gameState.current.round;
        currentRound += 1;

        if (currentRound - 1 > numberOfRounds) { return gameState; };

        const newGameState = { ...gameState };
        if (currentRound === 1) {
            newGameState.current.phase = 'game';
            newGameState.roundResults = [];
        };
        newGameState.current.round = currentRound;


        return round(gameState)
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