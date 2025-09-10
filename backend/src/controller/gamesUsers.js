const { findUsersNameByGame, registerUserByGame, removeUserByGame } = require("../service/gamesUsers")
const { validationResult } = require('express-validator')

const getGameUsers = (async (req, res) => {
    
    try {
        const usersGameList = await findUsersNameByGame(req.params.gameId);
        res.status(200).json(usersGameList);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }

})

const postGameUsers = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }

        const {id} = await registerUserByGame(
            req.params.gameId, 
            req.body.userId
        );

        res.status(201).json({id});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})

const deleteGameUsers = (async (req, res) => {

    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'Error',
                    message: errors.array()
                })
            }
        
        const result = await removeUserByGame(req.params.gameId);

        //TODO Se comenta porque no funciona en caso que la partida no tenga usuarios asociados
       /* if(result === 0){
            return res.status(404).json({
                status: '',
                message: 'Relación partida-usuario no encontrada'
            })
        }*/

        return res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
    
})

module.exports = {
    getGameUsers,
    postGameUsers,
    deleteGameUsers
}