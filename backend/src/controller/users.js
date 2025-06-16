const {findUsers, findUser, registerUser, modifyUser, removeUser, findUserByAlias} = require('../service/users');
const { validationResult } = require('express-validator')


const getUsers = (async (req, res) => {

    try {
        const usersList = await findUsers();
        res.status(200).json(usersList)
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})

const getUser = (async (req, res) => {

    try {
        const user = await findUser(req.params.id);

        if(user === undefined) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Usuario no encontrado'
            })
            return;
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }

})

const postUser = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        const idResult = await registerUser(
            req.body.name, 
            req.body.surname, 
            req.body.email, 
            req.body.alias, 
            req.body.password
        );

        res.status(201).json({
            id: idResult,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            alias: req.body.alias,
            password: req.body.password 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
})

const putUser = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        await modifyUser(
            req.params.id, 
            req.body.name, 
            req.body.surname, 
            req.body.email, 
            req.body.alias, 
            req.body.password
        );

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})

const deleteUser = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        const result = await removeUser(req.params.id);

        if(result === 0) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Usuario no encontrado'
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
    getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser
}