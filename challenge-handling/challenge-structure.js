import { awaitMakeChallenge, awaitChallengeResponse } from './challenge-fns';
import { patientReduce } from '../util/patientReduce';

export { handleChallenge };

const handleChallenge = (function init() {

    const CHALLENGE_SCHEDULE = [
        awaitMakeChallenge,
        // the app booted: initialize given client, await challenges
        // return initial challengeMaking promise(players, numberOfRounds), 
        awaitChallengeResponse,
        // someone made a challenge: send the UI to the user who was challenged
        // returns makeChallengeResult = {challengeResponse (promise)}
    ]

    return function handleChallenge(gameClient) {

        return patientReduce(CHALLENGE_SCHEDULE, (gameState, currentStageFn) => {

            const newGameState = { ...gameState };
            newGameState.current.stage = currentStageFn.name;

            const stageResult = currentStageFn(gameState);

            Object.assign(newGameState, stageResult);
            Object.freeze(newGameState);

            return newGameState;
        }, {
            gameClient,
            current: {
                phase: 'challenge',
            },
        })
    }
}());