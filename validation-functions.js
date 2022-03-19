
const PLAYER_ROLES = require('./templates')

class ErrorObj {
    constructor(_message, _gameStage) {
        this.gameStage = _gameStage
        this.message = _message
    }
}

// validation and exeption handlers
function validatePlayers(_players, _gameStage) {

    if (_players.length > 2) throw new ErrorObj('too many players!!', _gameStage)
    if (_players.length < 2) throw new ErrorObj('not enough players!!', _gameStage)

    // -0-----TODO playerrole.every.players.some
    
}