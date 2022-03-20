
// begins to wait for a challenge event, initialized on startup
export function issueChallengePromise(gameEnv) {

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

export function acceptChallengePromise({players, numberRounds, gameEnv}) {

    return newPromise((resolve, reject) => {

        gameEnv.addEventListener('onAccept', (players, numberRounds) => {
            resolve()
        })

    })

};

export function runTimePromise({ timeLimit, players } = selectTimeResult) {

    const { timerPlayer, greedyPlayer } = players;

    return new Promise((resolve, reject,) => {
        const startTime = new Date().getTime();

        const timer = setTimeout(resolve({
            timeReached: timeLimit,
            winner: timerPlayer,
            timeLimit,
        }), timeLimit);

        onGreedyClick(() => {
            clearTimeout(timer);
            const timeReached = new Date().getTime() - startTime;
            resolve({
                timeReached,
                winner: greedyPlayer,
                timeLimit,
            });
        });
    });
};