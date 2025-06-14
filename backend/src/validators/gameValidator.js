const { body, param } = require('express-validator');

const gameValidation = [

    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('boardgameId')
        .notEmpty()
        .withMessage('El juego es obligatorio'),
]


const gameIdValidation = [
    param('id')
        .isInt({min: 1})
        .withMessage('El ID debe ser positivo')
]

module.exports = {
    gameValidation,
    gameIdValidation
}