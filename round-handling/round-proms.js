export { timerSetting, timerRunning }
import events from 'events';
// -----------------------------------------------------------------------
// functions that invoke new Promise() and handles the arguments they need

function timerSetting(players) {
    const { timerPlayer, greedyPlayer } = players;

    return new Promise(resolve => {
        events.EventEmitter.once('onTimerSet', resolve)

    })

}

// probably doing too much here
function timerRunning(timerSet) {

    return new Promise(resolve => {
        const startTime = new Date().getTime();

        const timer = setTimeout(resolve, timerSet, timerSet);

        events.EventEmitter.once('onGreedyClick', () => {
            clearTimeout(timer);
            const timeRan = new Date().getTime() - startTime;
            resolve(timeRan);
        });
    });
};