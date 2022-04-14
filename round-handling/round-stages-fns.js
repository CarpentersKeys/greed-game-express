import { timerSetting, timerRunning } from "./round-proms";

// SCHEDULE STAGE functions
export { startRoundStage, setTimerStage, runTimerStage, winRoundStage }

// assigns roles randomly or swaps existing roles
function startRoundStage(roundState) {
    let rand;

    const result = { players: {} };
    // let rand = Math.random() > 0.5;

    for (const player in roundState.players) {
        if (player === 'greedyPlayer') { result.players.timerPlayer = roundState.players[player]; };
        if (player === 'timerPlayer') { result.players.greedyPlayer = roundState.players[player]; };
        if (!GAME_ROLES.includes(player)) {
            rand = (rand + 1) || 0 + Math.random() > 0.5;
            rand % 2
            result.players[GAME_ROLES[(rand % 2)]] = roundState.players[player];
        }
    }

    // returns {players: greedyPlayer: {...}, timerPlayer: {...}}
    return result;
}

// timerPlayer selects time to wait
function setTimerStage(roundState) {
    const { players } = roundState;
    const { timerPlayer, greedyPlayer } = players;

    const result = { timerSet: timerSetting(players) }

    // send UI messages
    sendSetTimerMessage(timerPlayer);
    sendWaitMessage(greedyPlayer);

    // { timerSet: time in ms, players }
    return result;

}

// will the timer run down or greedy player click the button first?
function runTimerStage(roundState) {
    const { timerSet, players } = roundState;
    const { timerPlayer, greedyPlayer } = players;

    const result = { timerRan: timerRunning(timerSet) }

    // send UI messages
    sendTimerMessage(timerPlayer);
    sendGreedyClickMessage(greedyPlayer);

    // { timeRan: time in ms }
    return result;
}

function winRoundStage(roundState) {
    const { timerRan, timerSet, players } = roundState;
    const { timerPlayer, greedyPlayer } = players;

    const result = {
        score: timerRan / timerSet * timerSet,
        winner: timerRan === timerSet && timerPlayer || greedyPlayer,
        loser: timerRan === timerSet && greedyPlayer || timerPlayer,
    };

    // { score, winner, loser }
    return result;
}
