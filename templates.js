export {ERROR_TYPES, PLAYERS_TEMPLATE, PLAYER_ROLES, ROUND_RESULT_TEMPLATE, GAME_RESULT_TEMPLATE,}

const PLAYER_ROLES = ['timerPlayer', 'greedyPlayer']
Object.freeze(PLAYER_ROLES)

const PLAYERS_TEMPLATE = [
    // player object identifiers are 'player' by default and reassigned in the first round
    {
        gameRole: 'timerPlayer',
        username: '',
        challenger: true,
    },
    {
        gameRole: 'greedyPlayer',
        username: '',
        challenger: false,
    },
]
Object.freeze(PLAYERS_TEMPLATE)

// after each round this get updated
const ROUND_RESULT_TEMPLATE = {
    winner: {},
    score: 0,
    stageResults: {
        challenge: {},
        selectTime: {},
        race: {},
        conclusion: {},
    },
} 
Object.freeze(ROUND_RESULT_TEMPLATE)

// at the start of the game this is created and number of rounds populated
const GAME_RESULT_TEMPLATE = {
        won: {
            'player': 'player', 
            'score': 0
        },
        lost: {
            'player': 'player', 
            'score': 0
        },
        roundResults: [],
}
Object.freeze(GAME_RESULT_TEMPLATE)

const ERROR_TYPES = {
    toFewPlayers: {
        message: 'too many players!!',
    },
    toManyPlayers: {
        message: 'not enough players!!',
    },

    playersNotAssigned: {
        message: "rtsh",
    },

    noTimerPlayer: {
        message: 'too many players!!',
    },
    noGreedyPlayer: {
        message: 'not enough players!!',
    }
}
Object.freeze(ERROR_TYPES)