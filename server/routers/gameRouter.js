import { Router } from "express";
import emitMatch from "../events-handling/emitMatch.js";
import awaitMatching from "../events-handling/awaitMatching.js";
import { em } from "../index.mjs";
import auth from "../middleware/auth.js";

const gameRouter = Router();

gameRouter.post('/match', auth, (req, res) => {
    const anymatch = em.listenerCount('match') > 0;
    console.log(em.listenerCount('match'));

    // someone is waiting for a game
    if (anymatch) {
        const matchId = emitMatch(req)
        return res.send({ matchFound: true, matchId });
    };

    // otherwise wait for someone to show up
    awaitMatching(req)
        .then(matchObj => res.status(200).send(matchObj))
        .catch(rejection => {
            console.log(`matching rejected because it ${rejection.reason}`);
            res.status(500).send(rejection);
        })
})
export default gameRouter;
