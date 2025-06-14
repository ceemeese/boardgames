const express = require('express');
const {getGamePlayers, getGames, getGame, getGameBasic, postGame, putGame, deleteGame } = require('../controller/games');
const { gameValidation, gameIdValidation } = require('../validators/gameValidator');
const router = express.Router();

router.get('/game-info/:id/players', gameIdValidation, getGamePlayers)
router.get('/game-info', getGames);
router.get('/game-info/:id', gameIdValidation, getGame);
router.get('/games/:id', gameIdValidation, getGameBasic)
router.post('/games', gameValidation, postGame);
router.put('/games/:id', gameIdValidation, gameValidation, putGame);
router.delete('/games/:id', gameIdValidation, deleteGame);


module.exports = router;