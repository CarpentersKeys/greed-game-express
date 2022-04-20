import { em } from '../index.mjs'
import timeoutListening from '../util/timeoutListening.js';



export default (function awaitMatchingInit() {

    function returnCb(result) {
        return result
    }

    return function awaitMatching(req, timeout) {

        function matchObjCb(matchObj) {

            const { numberOfRounds } = req.body;
            const player1 = req.name;
            const { player2, matchId } = matchObj;

            const newMatchObj = {
                matchFound: true,
                players: {
                    player1,
                    player2,
                },
                matchId: matchId + 'v' + player1,
                // currently ignoring round discrepancy, just use the play who was waiting
                numberOfRounds,
            }
            return newMatchObj;
        }

        return timeoutListening(em, 'match', matchObjCb, returnCb, timeout);

    }

}());