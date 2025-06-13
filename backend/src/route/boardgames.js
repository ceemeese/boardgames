const express = require('express');
const { getBoardgames, postBoardgame, putBoardgame, deleteBoardgame, getBoardgame } = require('../controller/boardgames');
const router = express.Router();

router.get('/boardgames', getBoardgames);
router.get('/boardgames/:id', getBoardgame);
router.post('/boardgames', postBoardgame);
router.put('boardgames/:id)', putBoardgame);
router.delete('/boardgames/:id', deleteBoardgame)


module.exports = router;