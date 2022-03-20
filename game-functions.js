
const { runTimePromise, acceptChallengePromise } = require('./promises');
const validatePlayers = require('./validation-functions');
const {deepClone, flattenToObj} = requires('./util/')

// start point of any game, triggered by onChallenge event/command
export function acceptChallenge({ players, numberRounds, gameEnv} = issueChallengeResult) {
    // find the challengee
    const playerToChallenge = {
        ...players
        .find(p => p.challenger === false)
    }

    // call UI fn
    sendChallengeMessage(playerToChallenge, numberRounds, gameEnv);

    return deepClone(flattenToObj(arguments[0]), acceptChallengePromise())
}
// returns promise resolves to challengeResult 

// possibl exit points
// -----------------------------------------------------------
export function endGameEarly() {
    /** early end conditions
     *  -player disco
     *  -endgame slashcommand 
     *  -validation fails
     *  -error
     */
    return gameResult
}

export function playGame({ players, numberRounds } = challengeResult) {

    const gameResult = 

    playRounds(players, numberRounds)
    .then(getGameResult);

    return gameResult
}
    //----------------------------------------------------------------------
    function playRounds(players, numberRounds) {

        const _roundResults = [];

        startRoundStage(players, numberRounds) // passes challengeResult object
            .then(selectTimeStage)
            .then(runTimeStage)
            .catch(err => console.log(err)) // future: improve exception handling
            .then(winRoundStage)
            .then(winRoundResult => {

                roundResults.push(winRoundResult)
                if (numberRounds > 0) return playRounds(players, numberRounds - 1)
            })
            .catch(err => console.log(err)) // future: improve exception handling

    }
    //return a promise that resolves to the roundResults

    function getGameResult(roundResults) {

//         roundResults.reduce((_gameResult, current, index, arr) => {

//             if(index > 0) _gameResult.
// // --------------------fwa0923-408iwa-08-aw-09-w0f TODO
//         }, {
//             won: {player, score},
//             lost: {player, score},
//             roundResults,
//         })
//     }   
}
// both return a promise that resolves to gameResult object
// -----------------------------------------------------------



// STAGE FUNCTIONS: each game is made up of four stages

// assigns players their roles
export function startRoundStage(players) {

    // if validate players errors resolves to assignRoles(players)
    const playerVal = validatePlayers(players, 'startRoundStage')

    // if(playerVal is error) throw playerVal or handle

    const startRoundResult = playerVal(players)

    return startRoundResult;
}
    // returns promise resolves to players

// timerPlayer selects time to wait
function selectTimeStage(players) {

    const selectTimeResult = selectTimePromise()

    // send UI messages
    sendSelectTimeMessage(players.timerPlayer);
    sendWaitMessage(players.greedyPlayer);

    return selectTimeResult;

}
// return promise which resolves to selectTimeResult

// will the timer run down or greedy player click the button first?
function runTimeStage({ players, timeLimit } = selectTimeResult) {

    // resolve to either greedyOnClick() or setTimeout()
    const runTimeResult = runTimePromise(arguments[0]) // <---- this passes selectTimeResult

    // send UI messages
    sendTimerMessage(players.timerPlayer);
    sendGreedyClickMessage(players.greedyPlayer);

    return runTimeResult; // { winner, timeLimit, timeReached }
}
// return promise which resolves to runTimeResult

function winRoundStage({ winner, timeLimit, timeReached } = runTimeResult) {

}
    // return roundResult

// --------------------------------------------------
// HELPER FUNCTIONS

// randomly select a greedy and timer player
function assignRoles() {
    const randBool = Math.random() > 0.5
}

// swap timer and greedy roles
function swapRoles() {
    
}