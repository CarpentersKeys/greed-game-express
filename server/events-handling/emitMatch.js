import { em } from '../index.mjs'

export default function emitMatch(req, res) {
    const thisPlayer = req.name
    const matchId = Math.floor(Math.random() * 100000) + thisPlayer;
    em.emit('match', {
        player2: thisPlayer,
        matchId,
    });
    return matchId;
};