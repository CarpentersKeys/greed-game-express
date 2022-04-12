import { PLAYER_ROLES, ERROR_TYPES } from './templates';
export { validatePlayers };

// validation and exeption handlers
//------------------------------------------------------------------
function validatePlayers(players, gameStage) {

    if (players.length > 2) throwPlayerError(ERROR_TYPES.toManyPlayers, gameStage);
    if (players.length < 2) throwPlayerError(ERROR_TYPES.toFewPlayers, gameStage);




    if (gameStage === 'startRoundStage') { return rolesAssigned; };
    if (gameStage !== 'startRoundStage') { 
        return rolesAssigned || 
        throwPlayerError(ERROR_TYPES.playerNotAssigned, players, gameStage); 
    };

}


// if gameStage is startRound then we return certain functinos
// if not we throw error fn

function throwPlayerError(players, gameStage, errType) {

}