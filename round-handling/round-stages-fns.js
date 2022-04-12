import { assignRoles } from "./round-helper-fns";
import { timerRunning } from "./round-proms";
export { startRoundStage, setTimerStage, runTimeStage, winRoundStage }
// SCHEDULE STAGE functions

// assigns players their roles
function startRoundStage({ players }) {

    // assigns roles randomly or swaps existing roles
    const newPlayers = assignRoles(players);


    const result = { players: newPlayers };
    Object.freeze(result);

    // { players }
    return result;
}
// returns promise resolves to players

// timerPlayer selects time to wait
function setTimerStage({ players }) {

    const result = { timerSet: timerSetting() }

    // send UI messages
    sendSetTimerMessage(players.timerPlayer);
    sendWaitMessage(players.greedyPlayer);

    return result;

}
// return promise which resolves to selectTimeResult

// will the timer run down or greedy player click the button first?
function runTimeStage({ players, timerSet }) {

    // resolve to either greedyOnClick() or setTimeout()
    const timeRan = timerRunning(timerSet) // <---- this passes selectTimeResult

    // send UI messages
    sendTimerMessage(players.timerPlayer);
    sendGreedyClickMessage(players.greedyPlayer);

    return runTimeResult; // { winner, timeLimit, timeReached }
}
// return promise which resolves to runTimeResult

function winRoundStage({ winner, timeLimit, timeReached } = runTimeResult) {

}
// return roundResult

