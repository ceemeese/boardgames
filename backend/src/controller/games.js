const {findGames, findGame, registerGame, modifyGame, removeGame} = require('../service/games');

const getGames = (async (req, res) => {
    const gamesList = findGames();
})

const getGame = (async (req, res) => {
    const game = findGame(req.params.id);
})

const postGame = (async (req, res) => {
    registerGame(req.body.name, req.body.boardgameId);
})

const putGame = (async (req, res) => {
    modifyGame(req.params.id, req.body.name, req.body.boardgameId);
})

const deleteGame = (async (req, res) => {
    removeGame(req.params.id);
})

module.exports = {
    getGames, 
    getGame,
    postGame,
    putGame,
    deleteGame
}