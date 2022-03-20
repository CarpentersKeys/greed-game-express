
export {playRounds, getGameResult}

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



