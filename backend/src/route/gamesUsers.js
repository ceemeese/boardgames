const express = require('express');
const { getGameUsers, postGameUsers, deleteGameUsers } = require('../controller/gamesUsers');
const { gameUserValidation, gameUserIdValidation } = require('../validators/gameUserValidator');
const router = express.Router();

router.get('/games-details/:gameId/users', gameUserIdValidation,  getGameUsers);
router.post('/games-details/:gameId/users', gameUserIdValidation, gameUserValidation, postGameUsers);
router.delete('/games-details/:gameId/users', gameUserIdValidation, deleteGameUsers)


module.exports = router;