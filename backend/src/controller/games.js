const {findGamePlayers, findGames, findGame, findGameBasic, registerGame, modifyGame, removeGame} = require('../service/games');
const { validationResult } = require('express-validator')

const getGamePlayers = (async (req, res) => {

    try {
        const gamePlayers = await findGamePlayers(req.params.id);

        if (gamePlayers.length === 0) {
            return res.status(404).json({
                status: 'No encontrada',
                message: 'Partida no encontrada'
            });
        }
        res.status(200).json(gamePlayers);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }

})

const getGames = (async (req, res) => {

    try {
        const gamesList = await findGames();
        res.status(200).json(gamesList);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }

})


const getGame = (async (req, res) => {

    try {
        const game = await findGame(req.params.id);

        if(game === undefined) {
            res.status(404).json({
                status: 'No encontrada',
                message: 'Partida no encontrada'
            })
            return;
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})


const getGameBasic = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }

       const gameBasic = await findGameBasic(req.params.id);

       if(gameBasic === undefined) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            })
            return;
        }

        res.status(200).json(gameBasic);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
})

const postGame = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }

        await registerGame(
            req.body.name, 
            req.body.boardgameId
        );

        res.status(201).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})

const putGame = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }

        await modifyGame(
            req.params.id, 
            req.body.name, 
            req.body.boardgameId
        );

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
    
})

const deleteGame = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }

        await removeGame(req.params.id);

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})

module.exports = {
    getGamePlayers,
    getGames, 
    getGame,
    getGameBasic,
    postGame,
    putGame,
    deleteGame
}