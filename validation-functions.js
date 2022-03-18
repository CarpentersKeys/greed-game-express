
class ErrorObj {
    constructor(_message, _gameStage) {
        this.gameStage = _gameStage
        this.message = _message
    }
}

// validation and exeption handlers
function validatePlayers(_players, _gameStage) {
    if (_players.some(p => p.gameRole !== 'timer')) throw new ErrorObj('a timerPlayer wasn\'t given!', _gameStage)
    if (_players.some(p => p.gameRole !== 'greedy')) throw new ErrorObj('a greedyPlayer wasn\'t given!', _gameStage)
    if (_players.length > 2) throw new ErrorObj('too many players!!', _gameStage)
    if (_players.length < 2) throw new ErrorObj('not enough players!!', _gameStage)
}