const { findUsersByGame, registerUserByGame, removeUserByGame } = require("../service/gamesUsers")

const getGameUsers = (async (req, res) => {
    const usersGameList = findUsersByGame(req.params.gameId);
})

const postGameUsers = (async (req, res) => {
    registerUserByGame(req.params.gameId, req.body.userId);
})

const deleteGameUsers = (async (req, res) => {
    removeUserByGame(req.params.gameId);
})

module.exports = {
    getGameUsers,
    postGameUsers,
    deleteGameUsers
}