const {findBoardgames, findBoardgame, registerBoardgame, modifyBoardgame, removeBoardgame} = require('../service/boardgames');

const getBoardgames = (async (req, res) => {
    const boardgamesList = findBoardgames();
})

const getBoardgame = (async (req, res) => {
    const boardgame = findBoardgame(req.params.id);
})

const postBoardgame = (async (req, res) => {
    registerBoardgame(req.body.name, req.body.description, req.body.minPlayers, req.body.maxPlayers, req.body.category);
})

const putBoardgame = (async (req, res) => {
    modifyBoardgame(req.params.id, req.body.name, req.body.description, req.body.minPlayers, req.body.maxPlayers, req.body.category);
})

const deleteBoardgame = (async (req, res) => {
    removeBoardgame(req.params.id);
})

module.exports = {
    getBoardgames, 
    getBoardgame,
    postBoardgame,
    putBoardgame,
    deleteBoardgame
}