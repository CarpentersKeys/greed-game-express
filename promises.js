
export function runTimePromise({ timeLimit, players } = selectTimeResult) {

    const { timerPlayer, greedyPlayer } = players;

    return new Promise((resolve, reject,) => {
        const startTime = new Date().getTime();

        const timer = setTimeout(resolve({
            timeReached: timeLimit,
            winner: timerPlayer,
            timeLimit,
        }), timeLimit);

        greedyOnClick(() => {
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