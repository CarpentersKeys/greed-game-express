
export function runTimerPromise(_timelimit) {
    return new Promise((resolve, reject,) => {
        //create timerResult object
        const timerResult = {}

        // (greedyPlayer, timeLimit, timeReached)
        setTimeout(resolve(), _timelimit);

        greedyOnClick(() => {
        // (timerPlayer, timeLimit, timeReached)
        resolve(timerResult)
        })
    })
}