import { challengeMaking, challengeResponding } from "./challenge-proms";
export { awaitMakeChallenge, awaitChallengeResponse };


// the app booted: initialize given client, await challenges
//return initial challengeMaking promise(players, numberOfRounds), 
function awaitMakeChallenge({ gameClient }) {

    switch (gameClient) {
        case 'discordjs':
            // await import '../discordjs/client';
            break;
        case 'web':
            // await import '../web/client';
            break;
    }

    const result = { challengeMade: challengeMaking(gameClient) };
    Object.freeze(result);

    // { players, numberOfRounds }
    return result;
};


// someone made a challenge: send the UI to the user who was challenged
// returns an object(playesr, numberOfRounds, gameClient, challengeResponding promise) 
function awaitChallengeResponse({ gameClient, players, numberOfRounds }) {

    // find the challengee
    const playerToChallenge = {
        ...Object.values(players)
            // find the player who isn't the challenger
            .find(p => p.challenger === false)
    }

    // send the challenge message
    sendChallengeMessage(playerToChallenge, numberOfRounds, gameClient);

    const result = { challengeResponse: challengeResponding(), }
    Object.freeze(result);

    // boolean
    return result;
};
