const express = require('express');
const { getBoardgames, postBoardgame, putBoardgame, deleteBoardgame, getBoardgame } = require('../controller/boardgames');
const { boardgameValidation, boardgameIdValidation } = require('../validators/boardgameValitador');

const upload  = require('../middleware/upload');

const router = express.Router();

router.get('/boardgames', getBoardgames);
router.get('/boardgames/:id', boardgameIdValidation, getBoardgame);
router.post('/boardgames',upload.single('image'), boardgameValidation,  postBoardgame);
router.put('/boardgames/:id', boardgameIdValidation, boardgameValidation, putBoardgame);
router.delete('/boardgames/:id', boardgameIdValidation, deleteBoardgame);


module.exports = router;