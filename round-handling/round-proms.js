export { challengeMaking, challengeResponding, timerRunning }
import events from 'events';
// -----------------------------------------------------------------------
// functions that invoke new Promise() and handles the arguments they need


function timerRunning({ timeLimit, players } = selectTimeResult) {

    const { timerPlayer, greedyPlayer } = players;

    return new Promise((resolve, reject,) => {
        const startTime = new Date().getTime();

        const timer = setTimeout(resolve({
            timeReached: timeLimit,
            winner: timerPlayer,
            timeLimit,
        }), timeLimit);

        events.EventEmitter.once('greedyClick', () => {
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