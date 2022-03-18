
exports.PLAYERS_TEMPLATE = [
    greedyPlayer = {
        username: '',
        challenger: true,
    },
    timerPlayer = {
        username: '',
        challenger: false,
    },
]
Object.freeze(PLAYERS_TEMPLATE)

// after each round this get updated
exports.ROUND_TEMPLATE = {
    winner: {},
    score: 0,
    stageResults: {
        challenge: {},
        selectTime: {},
        race: {},
        conclusion: {},
    },
} 
Object.freeze(ROUND_TEMPLATE)

// at the start of the game this is created and number of rounds populated
exports.GAME_TEMPLATE = {
    players: [...PLAYERS_TEMPLATE],
    winner: {},
    finalScore: [0, 0],
    roundStates: [],
}
Object.freeze(GAME_TEMPLATE)
