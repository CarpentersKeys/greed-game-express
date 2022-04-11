export { challengeMaking, challengeResponding }

// begins to wait for a challenge event, initialized on startup
function challengeMaking(gameClient) {

    return new Promise((resolve, reject) => {

        gameClient.addEventListener('onChallenge', (players, numberOfRounds) => {
            if (Array.isArray(players))
                resolve({ players, numberOfRounds})
        })

        gameClient.addEventListener('botInactive', (logs) => {
            reject('bot became inactive. log:', logs);
        })
    })
};

function challengeResponding({gameClient}) {

    return newPromise((resolve, reject) => {

        gameClient.addEventListener('onAccept', resolve(true))

        // reject after 20s
        setTimeout(() => {

            reject('challenge timed out')
        }, 1000 * 20);

    })
}
