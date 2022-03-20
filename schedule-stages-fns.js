export {startRoundStage, selectTimeStage, runTimeStage, winRoundStage}
// SCHEDULE STAGE functions

// assigns players their roles
function startRoundStage(players) {

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