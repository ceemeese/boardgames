const express = require('express');
const { getGameUsers, postGameUsers, deleteGameUsers } = require('../controller/gamesUsers');
const router = express.Router();

router.get('/games-details/:gameId/users', getGameUsers);
router.post('/games-details/:gameId/users', postGameUsers);
router.delete('/games-details/:gameId/users', deleteGameUsers)


module.exports = router;