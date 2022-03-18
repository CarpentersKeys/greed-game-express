// start point of any game
export function issueChallenge({ players, numberRounds }) {
    // setup and await challenge response

}
    // returns promise resolves to setupGame result 

// possibl exit points
// -----------------------------------------------------------
export function endGameEarly() {
    /** early end conditions
     *  -player disco
     *  -endgame slashcommand 
     *  -validation fails
     *  -error
     */

}

export function concludeGame() {

}
// -----------------------------------------------------------

// ROUND FUNCTIONS
// timerPlayer selects time to wait
function selectTime({players} = challengeResult) {

}
    // return promise which resolves to selectTimeResult

// will the timer run down or greedy player click the button first?
function callTimer({players, timeLimit} = selectTimeResult) {
    // declarations and settings

    const greedyPlayer = players.find(p => p.gameRole === 'greedy')
    const timerPlayer = players.find(p => p.gameRole === 'timer')

    // send UI messages
    sendTimerMessage(timerPlayer);
    sendGreedyClickMessage(greedyPlayer);

    const timeReached = runTimerPromise(timeLimit)
}
    // return promise which resolves to timerResult

function winGame({ winner, timeLimit, timeReached } = timerResult) {

}
    // return roundResult