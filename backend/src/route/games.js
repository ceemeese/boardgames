const express = require('express');
const router = express.Router();

router.get('/game-info');
router.get('/game-info/:id');
router.post('/games');
router.put('games/:id)');
router.delete('games/:id)');


module.exports = router;