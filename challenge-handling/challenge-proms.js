
export { challengeMaking, challengeResponding }

// begins to wait for a challenge event, initialized on startup
function challengeMaking(gameEnv) {

    return new Promise((resolve, reject) => {

        gameEnv.addEventListener('onChallenge', (players, numberRounds) => {
            if (Array.isArray(players))
                resolve({ players, numberRounds, gameEnv })
        })

        gameEnv.addEventListener('botInactive', (logs) => {
            reject('bot became inactive. log:', logs);
        })
    })
};

function challengeResponding({players, numberRounds, gameEnv}) {

    return newPromise((resolve, reject) => {

        gameEnv.addEventListener('onAccept', (players, numberRounds) => {
            resolve(true);
        })

        // reject after 20s
        setTimeout(() => {

            sendChallengeTimeoutMessage(); // doesn't exist yet actually probably handle this higher up 
            reject('challenge timed out')
        }, 1000 * 20);

    })
}
