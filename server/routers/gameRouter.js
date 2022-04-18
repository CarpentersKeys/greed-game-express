import { Router } from "express";
import EventEmmiter, { once } from 'events';
import auth from "../middleware/auth.js";

const gameRouter = Router();

const em = new EventEmmiter()

const makeMatchEvent = (player1, numberOfRounds) => {
    return (player2, numberOfRounds2) => {
        // if (player1 === player2) { return response.status(500).send({ errorMessage: 'weird, you can\'t player yourself' }); }
        if (numberOfRounds !== numberOfRounds2) { return }

        // return response.send({ player1, player2, numberOfRounds });
    }
}

gameRouter.post('/match', auth, (req, res,) => {


    em.on('error', (err) => console.log('error event:', err))

    const { player, numberOfRounds } = (req.body);

    const anymatch = em.listeners('match').length > 0;

    if (anymatch) {
        em.emit('match', player, numberOfRounds);
        return res.send({ matchFound: true, player, numberOfRounds });
    };

    const timeout = setTimeout(() => {
        em.removeListener('match', thisMatch);
        return res.status(500).send({ errorMessage: 'No matches avail' });
    }, 1000);

    let thisMatch;
    thisMatch = makeMatchEvent(player, numberOfRounds);
    // once('match', thisMatch)
    // .then(sth => console.log(sth));
})

export default gameRouter ;
