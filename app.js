import { playRounds } from "./round-handling/round-structure";
import { handleChallenge } from "./challenge-handling/challenge-structure";
import { concludeGame } from "./conclusion-handling/conclude-game";

handleChallenge(GAME_CLIENT)
    .catch((rejection) => {
        console.log(rejection)
    })
    .then(playRounds)
    .then(concludeGame);