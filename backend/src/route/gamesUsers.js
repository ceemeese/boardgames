const express = require('express');
const router = express.Router();

router.get('/games-details/:gameId/users');
router.post('/games-details/:gameId/users');
router.delete('/games-details/:gameId/users')


module.exports = router;