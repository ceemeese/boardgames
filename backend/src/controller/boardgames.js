const {findBoardgames, findBoardgame, registerBoardgame, modifyBoardgame, removeBoardgame} = require('../service/boardgames');
const { validationResult } = require('express-validator')

const getBoardgames = (async (req, res) => {
    const boardgamesList = await findBoardgames();
    res.status(200).json(boardgamesList);
})

const getBoardgame = (async (req, res) => {
    try {
        const boardgame = await findBoardgame(req.params.id);

        if(boardgame === undefined) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            })
            return;
        }
        res.status(200).json(boardgame);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})

const postBoardgame = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        const idResult = await registerBoardgame(
            req.body.name, 
            req.body.description, 
            req.body.minPlayers, 
            req.body.maxPlayers, 
            req.body.category
        );

        res.status(201).json({
            id: idResult,
            name: req.body.name, 
            description: req.body.description, 
            minPlayers: req.body.minPlayers, 
            maxPlayers: req.body.maxPlayers, 
            category: req.body.category
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }  
})

const putBoardgame = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        await modifyBoardgame(
            req.params.id, 
            req.body.name, 
            req.body.description, 
            req.body.minPlayers, 
            req.body.maxPlayers, 
            req.body.category
        );

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})
    

const deleteBoardgame = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        const result = await removeBoardgame(req.params.id);

        if(result === 0) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            })
            return;
        }

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})


module.exports = {
    getBoardgames, 
    getBoardgame,
    postBoardgame,
    putBoardgame,
    deleteBoardgame
}