export { assignRoles };
// HELPER FUNCTIONS

// randomly select a greedy and timer player
function assignRoles(players) {
    const GAME_ROLES = ['timerPlayer', 'greedyPlayer']

        return (function () {

            const newPlayers = [...players];
            const rand = (Math.random() > 0.5);

            newPlayers.forEach((player, ind) => {
                const roleIndex = GAME_ROLES.indexOf(player.gameRole) + 1
                || rand + ind;
                player.gameRole = GAME_ROLES[(roleIndex) % 2];
            });

            Object.freeze(newPlayers);
            return newPlayers;
        }());
}

// const firstcall = assignRoles([
//     { player: 1, gameRole: 'timerPlayer' },
//     { player: 2, gameRole: 'greedyPlayer'}
// ])

// firstcall