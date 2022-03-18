const { runTimerPromise } = require('./promises')

// start point of any game
export function issueChallenge({ players, numberRounds }) {
    // setup and await challenge response
    return challengeResult
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

export function playGame({ players, numberRound } = challengeResult) {

    playRounds(players, numberRounds)

    return gameResult

    function playRounds(_players, _numberRounds) {

        var roundResults =

            startRoundStage(challengeResult).then(
                selectTimeStage(startRoundResult)).then(
                    runTimeStage(selectTimeResult)).catch(
                        (err) => { console.log(err) }).then(
                            winRoundStage(runTimeResult)).then(
                                (winRoundResult) => {

                                    if (_numberRounds > 0) playRounds(_players, _numberRounds - 1)

                                    if (roundResults) return [...roundResults, winRoundResult];
                                    return winRoundResult;
                                })

    }
    //return a promise that resolves to the roundResults

}
// both return a promise that resolves to gameResult object
// -----------------------------------------------------------



// STAGE FUNCTIONS: each game is made up of four stages

export function startRoundStage() {

}
// returns promise resolves to setupGame result 

// timerPlayer selects time to wait
function selectTimeStage({ players } = challengeResult) {

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