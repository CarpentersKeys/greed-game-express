import { em } from '../index.mjs'
import deepClone from '../util/deepClone.js';

export default (function awaitMatching() {

    function timeoutCb(reject, rejectObj, matchCb) {
        em.removeListener('match', matchCb);
        return reject(rejectObj);
    }
    function makeMatchCb(resolve, resolveObj, timeout) {
        console.log('makeMatchCb')
        return function matchCb(match) {
            console.log('matchCb:', resolve, resolveObj, timeout)
            const { matchId, player2 } = match;

            clearTimeout(timeout);

            const newObj = deepClone(resolveObj)
            newObj.players.player2 = player2;
            newObj.matchId = matchId;

            return resolve(newObj)
        }
    }

    return function awaitMatching(req) {
        const numberOfRounds = (req.body.numberOfRounds);
        const thisPlayer = req.name;

        return new Promise((resolve, reject) => {
            let matchCb;
            let timeout;

            const resolveObj = {
                matchFound: true,
                players: {
                    player1: thisPlayer,
                },
                // currently ignoring round discrepancy, just use the play who was waiting
                numberOfRounds,
            }

            matchCb = makeMatchCb(resolve, resolveObj, timeout);
            console.log(typeof (timeoutCb));
            timeout = setTimeout(timeoutCb, 3000,
                // args for timeOutCb
                reject,
                {
                    matchFound: false,
                    reason: 'timed out',
                    player: thisPlayer,
                },
                matchCb // BUG this isn't a function for some reason check line 8
            );

            em.once('match', matchCb);
        });
    };
}());