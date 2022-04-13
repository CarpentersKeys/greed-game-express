import { assignRoles, sortByRole } from "./round-helper-fns";
import { timerRunning } from "./round-proms";
import { deepClone } from '../util/deepClone'

// SCHEDULE STAGE functions
export { startRoundStage, setTimerStage, runTimerStage, winRoundStage }

// assigns roles randomly or swaps existing roles
function startRoundStage(roundState) {
    const GAME_ROLES = ['greedyPlayer', 'timerPlayer'];
    const players = Object.values(roundState.players);
    const bool = !roundState.players.hasOwn('greedyPlayer') || Math.random() > 0.5;

    const result = GAME_ROLES.reduce((newPlayers, role) => {

        newPlayers[role] = 

    }, { players: {} });


    return result;
}
// returns promise resolves to players

// timerPlayer selects time to wait
function setTimerStage(roundState) {
    const [timerPlayer, greedyPlayer] = sortByRole(roundState.players);

    const result = { timerSet: timerSetting() }

    // send UI messages
    sendSetTimerMessage(timerPlayer);
    sendWaitMessage(greedyPlayer);

    // { timerSet: time in ms, players }
    return result;

}
// return promise which resolves to selectTimeResult

// will the timer run down or greedy player click the button first?
function runTimerStage(roundState) {
    const [timerPlayer, greedyPlayer] = sortByRole(roundState.players);

    const result = { timerRan: timerRunning(timerSet) }

    // send UI messages
    sendTimerMessage(timerPlayer);
    sendGreedyClickMessage(greedyPlayer);

    // { timeRan: time in ms }
    return result;
}
// return promise which resolves to runTimeResult

function winRoundStage(roundState) {
    const newRoundState = deepClone(roundState);
    const { timerRan, timerSet, players } = newRoundState;
    const [timerPlayer, greedyPlayer] = sortByRole(players);

    const result = {
        score: timerRan / timerSet * timerSet,
        winner: timerRan === timerSet && timerPlayer || greedyPlayer,
        loser: timerRan === timerSet && greedyPlayer || timerPlayer,
    };
    return result;
}
// return roundResult

