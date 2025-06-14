const { body, param } = require('express-validator');

const boardgameValidation = [

    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('minPlayers')
        .isInt({min:1})
        .withMessage('El número mínimo de jugadores debe ser superior a 0'),
    body('maxPlayers')
        .isInt({min:1})
        .withMessage('El número máximo de jugadores debe ser superior a 0')
]


const boardgameIdValidation = [
    param('id')
        .isInt({min: 1})
        .withMessage('El ID debe ser positivo')
]

module.exports =  {
    boardgameValidation, 
    boardgameIdValidation
};
