import { assignRoles } from "./round-helper-fns";
export { startRoundStage, selectTimeStage, runTimeStage, winRoundStage }
// SCHEDULE STAGE functions

// assigns players their roles
function startRoundStage(roundState) {

    const { players } = roundState;

    // assigns roles randomly or swaps existing roles
    const newPlayers = assignRoles(players);


    const result = { players: newPlayers };
    Object.freeze(result);

    // { players }
    return result;
}
// returns promise resolves to players

// timerPlayer selects time to wait
function selectTimeStage(players) {

    const result = { timeSelected: selectTimePromise()}

    // send UI messages
    sendSelectTimeMessage(players.timerPlayer);
    sendWaitMessage(players.greedyPlayer);

    return selectTimeResult;

}
// return promise which resolves to selectTimeResult

// will the timer run down or greedy player click the button first?
function runTimeStage({ players, timeLimit } = selectTimeResult) {

    // resolve to either greedyOnClick() or setTimeout()
    const runTimeResult = runTimePromise(arguments[0]) // <---- this passes selectTimeResult

    // send UI messages
    sendTimerMessage(players.timerPlayer);
    sendGreedyClickMessage(players.greedyPlayer);

    return runTimeResult; // { winner, timeLimit, timeReached }
}
// return promise which resolves to runTimeResult

function winRoundStage({ winner, timeLimit, timeReached } = runTimeResult) {

}
// return roundResult

