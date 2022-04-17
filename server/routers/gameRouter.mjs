import { Router } from "express";
import EventEmmiter from 'events';
import { clear } from "console";

const gameRouter = Router();

const em = new EventEmmiter()

const makeChallengeEvent = (timer, response) => {
    return (challenger, numberOfRounds) => {
        clearTimeout(timer);
        return response.send({ challenger: {player: 2, name: challenger}, numberOfRounds });
    }
}

gameRouter.post('/challenge', (req, res,) => {

    const { challenger, numberOfRounds } = (req.body);

    const anyChallengers = em.listeners('challenge').length > 0;

    if (anyChallengers) {
        em.emit('challenge', challenger, numberOfRounds);
        return res.send({ challenger: {player: 1, name: challenger}, numberOfRounds });
    };

    const timeout = setTimeout(() => {
        em.removeListener('challenge', thisChall);
        return res.status(500).send({ errorMessage: 'No challengers avail' });
    }, 1000);
    const thisChall = makeChallengeEvent(timeout, res);
    em.once('challenge', thisChall);
})

export { gameRouter };
