const { issueChallenge, endGameEarly, concludeGame } = require('./game-functions');

/* game flow
    -issue challenge (some setup can begin)
    -asynch selectTime
    -async race
    -get results
*/

issueChallenge()
.then(Promise.race(endGameEarly, concludeGame))