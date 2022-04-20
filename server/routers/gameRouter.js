import { Router } from "express";
import awaitMatching from "../events-handling/awaitMatching.js";
import emitMatch from "../events-handling/emitMatch.js";
import { em } from "../index.mjs";
import auth from "../middleware/auth.js";

const gameRouter = Router();

export default gameRouter.post('/match', auth, (req, res) => {

    const anymatch = em.listenerCount('match') > 0;

    // someone is waiting for a game
    if (anymatch) {
        const matchObj = emitMatch(req)
        return res.send(matchObj);
    };
    // otherwise wait for someone to show up
    awaitMatching(req, 1000)
        .then(matchObj => {
            res.status(200).send(matchObj)
        })
    .catch(rejection => {
        res.status(500).send(`matching rejected because it ${rejection}`);
    });
});