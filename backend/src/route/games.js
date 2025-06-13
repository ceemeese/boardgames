const express = require('express');
const { getGames, getGame, postGame, putGame, deleteGame } = require('../controller/games');
const router = express.Router();

router.get('/game-info', getGames);
router.get('/game-info/:id', getGame);
router.post('/games', postGame);
router.put('games/:id)', putGame);
router.delete('games/:id)', deleteGame);


module.exports = router;