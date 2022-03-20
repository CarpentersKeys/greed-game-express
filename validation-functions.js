
const { PLAYER_ROLES } = require('./templates')

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


// validation and exeption handlers
function validatePlayers(players, gameStage) {

    if (players.length > 2) throwPlayerError(ERROR_TYPES.toManyPlayers, gameStage);
    if (players.length < 2) throwPlayerError(ERROR_TYPES.toFewPlayers, gameStage);

    // true is both roles assigned
    const rolesAssigned = PLAYER_ROLES.every(pR => { 
        players.some(p => p.gameRole === pR)
    })

    if(!rolesAssigned) roleAssignment 


    if(gameStage === 'startRoundStage') {const validationAction = roleAssignment};
    if(gameStage !== 'startRoundStage') {const validationAction = throwPlayerError};


    if (players.some(p => p, gameRole !== PLAYER_ROLES.timerPlayer)) { // can these be refactoreD?
        validateAction(players, gameStage, ERROR_TYPES.noTimerPlayer)
    }

    if (players.some(p => p, gameRole !== PLAYER_ROLES.greedyPlayer)) {
        validateAction(players, gameStage, ERROR_TYPES.noTimerPlayer)    // thistoo
    }


}


    // if gameStage is startRound then we return certain functinos
    // if not we throw error fn

function throwPlayerError(players, gameStage, errType) {

}

function roleAssignment(players) {

}
