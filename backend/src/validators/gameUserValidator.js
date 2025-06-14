const { body, param } = require('express-validator');

const gameUserValidation = [

    body('userId')
        .isInt({min: 1})
        .withMessage('El ID de jugador debe ser positivo')
]


const gameUserIdValidation = [
    param('gameId')
        .isInt({min: 1})
        .withMessage('La ID de partida debe ser positivo')
]





module.exports =  {
    gameUserValidation, 
    gameUserIdValidation,
};