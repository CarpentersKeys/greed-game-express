// start point of any game, triggered by onChallenge event/command
function acceptChallenge({ players, numberRounds, gameEnv } = issueChallengeResult) {
    // find the challengee
    const playerToChallenge = {
        ...players
            .find(p => p.challenger === false)
    }

    // call UI fn
    sendChallengeMessage(playerToChallenge, numberRounds, gameEnv);

    return deepClone(flattenToObj(arguments[0]), acceptChallengePromise())
}
// returns promise resolves to challengeResult