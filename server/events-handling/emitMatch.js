import { em } from '../index.mjs'

export default function emitMatch(req, res) {
    const thisPlayer = req.name;
    const matchObj = {
        matchFound: true,
        player2: thisPlayer,
        matchId: Math.floor(Math.random() * 100000) + thisPlayer,
    };
    em.emit('match', matchObj);
    return matchObj;
};