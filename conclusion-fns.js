export { acceptChallenge, endGameEarly, playGame }

// possibl exit points
// -----------------------------------------------------------
function endGameEarly() {
    /** early end conditions
     *  -player disco
     *  -endgame slashcommand 
     *  -validation fails
     *  -error
     */
    return gameResult
}

function playGame({ players, numberRounds } = challengeResult) {

    const gameResult =

        playRounds(players, numberRounds)
            .then(getGameResult);

    return gameResult
}
    //----------------------------------------------------------------------