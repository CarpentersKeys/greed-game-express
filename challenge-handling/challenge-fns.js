import { flattenToObj } from "../util";
import { challengeMaking, challengeResponding } from "./challenge-proms";


// the app booted: initialize given client, await challenges
//return initial challengeMaking promise(players, numberOfRounds, gameClient), 
function awaitChallenge(gameClient) {

    switch(gameClient) {
        case 'discordjs': 
            // await import '../discordjs/client';
            break;
        case 'web': 
            // await import '../web/client';
            break;
    }

    const awaitChallengeResult = {
        challengeMade: challengeMaking(),
    };
    Object.freeze(awaitChallengeResult);

    return awaitChallengeResult;
};


// someone made a challenge: send the UI to the user who was challenged
// returns an object(playesr, numberOfRounds, gameClient, challengeResponding promise) 
function makeChallenge(awaitChallengeResult) {

    // clone and destructure 
    const { players, numberRounds, gameClient } = deepClone(awaitChallengeResult);

    // find the challengee
    const playerToChallenge = {
        ...players
            // find the player who isn't the challenger
            .find(p => p.challenger === false)
    }

    // send the challenge message
    sendChallengeMessage(playerToChallenge, numberRounds, gameClient);

    const makeChallengeResult = {
        challengeResponse: challengeResponding(),
        players,
        numberRounds,
        gameClient,
    };
    Object.freeze(makeChallengeResult);

    return {awaitChallengeResult, makeChallengeResult};
};

export { awaitChallenge, makeChallenge };