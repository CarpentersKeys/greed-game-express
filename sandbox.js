import deepClone from "./util/deepClone";

const players = {
   greed: { name: 'Tim', gameRole: 'greedyPlayer' },
    time: { name: 'Jom', gameRole: 'timerPlayer' },

}

players.greedyPlayer = players.greed;
players.greed
players.greedyPlayer
deepClone(players);
Object.assign(players, {greed:'hat'})
players.greed
players
players.greedyPlayer