export { timerSetting, timerRunning }
import events from 'events';
// -----------------------------------------------------------------------
// functions that invoke new Promise() and handles the arguments they need

function timerSetting({ players }) {

    const [timerPlayer, greedyPlayer] =
        players.sort((a, b) => (a.gameRole === 'greedyPlayer' - b.gameRole === 'greedyPlayer') - 0.5)

    return new Promise(resolve => {

    })

}

// probably doing too much here
function timerRunning({ timerSet, players }) {

    // wrong
    const { timerPlayer, greedyPlayer } = players;

    return new Promise((resolve, reject,) => {
        const startTime = new Date().getTime();

        const timer = setTimeout(resolve({
            timeReached: timerSet,
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