import { patientReduce } from './util/patientReduce';


function startRoundStage(args) {
    return Promise.resolve({ sRS: '1' });
};
function selectTimeStage(args) {
    return Promise.resolve({ sTS: '2' });
};
function runTimeStage(args) {
    return Promise.resolve({ rTS: '3' });
};
function winRoundStage(args) {
    return Promise.resolve({ wRS: '4' });
};



const playRounds = (function init() {

    const ROUND_SCHEDULE = [
        startRoundStage,
        selectTimeStage,
        runTimeStage,
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
                newRoundState.current.stage = currentStageFn.name;

                if (ind = 0) {

                }

                // errors will return a stageResult with an error prop
                const stageResult = currentStageFn(roundState);

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
                current: {
                    round: currentRound,
                }
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

const gameStateDummy = {
    gameClient: 'react',
    players: ['player1', 'player2'],
    numberOfRounds: 1,
    challengeResponse: true,
    current: {
        phase: 'challenge',
        stage: 'awaitChallengeResponse',
    }
}
playRounds(gameStateDummy);

const obj = {
    ten: {
        one: 3
    }
}

const { one = 1 } = obj.ten;