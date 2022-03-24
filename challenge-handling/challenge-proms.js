
export { challengeMaking, challengeResponding }

// begins to wait for a challenge event, initialized on startup
function challengeMaking(gameEnv) {

    return new Promise((resolve, reject) => {

        gameEnv.addEventListener('onChallenge', (players, numberRounds) => {
            if (Array.isArray(players))
                resolve({ players, numberRounds, gameEnv })
        })

        gameEnv.addEventListener('botInactive', (logs) => {
            console.log('bot became inactive. log:', logs)
            reject();
        })
    })
};

function challengeResponding({players, numberRounds, gameEnv}) {

    return newPromise((resolve, reject) => {

        gameEnv.addEventListener('onAccept', (players, numberRounds) => {
            resolve()
        })

    })
}
