export { acceptChallenge, earlyGameEnding, playGame }
import events from 'events';

// possibl exit points
// -----------------------------------------------------------
function earlyGameEnding() {
    /** early end conditions
     *  -player disco
     *  -endgame slashcommand 
     *  -validation fails
     *  -error
     */
    return new Promise((resolve, reject) => {
        // each API can handle the possible methods of quiting and just emit this
        events.EventEmitter.on('quit', (player, reason, details) => {
            resolve({
                player,
                reason, // disconnect, quit
                details, // time waited
            });
        });
    });
}

function endGame({ players, numberRounds } = challengeResult) {

    const gameResult = getGameResult;

    return gameResult
}
    //----------------------------------------------------------------------