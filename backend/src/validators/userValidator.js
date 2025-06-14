const { body, param } = require('express-validator');
const { findUserByAlias, findUserByEmail } = require('../service/users');

const userValidation = [

    body('email')
        .notEmpty()
        .withMessage('El correo es onligatorio'),
    body('alias')
        .notEmpty()
        .withMessage('El alias es obligatorio'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
]


const userIdValidation = [
    param('id')
        .isInt({min: 1})
        .withMessage('El ID debe ser positivo')
]



const checkUniqueUserFields = async (req, res, next) => {
    const {alias, email} = req.body;

  if (alias) {
    const userAliasExist = await findUserByAlias(alias);
    if (userAliasExist) {
      return res.status(400).json({ status: 'Error', message: 'Alias ya está en uso' });
    }
  }

  if (email) {
    const userEmailExist = await findUserByEmail(email);
    if (userEmailExist) {
      return res.status(400).json({ status: 'Error', message: 'Email ya está en uso' });
    }
  }

  next();
}



module.exports =  {
    userValidation, 
    userIdValidation,
    checkUniqueUserFields
};