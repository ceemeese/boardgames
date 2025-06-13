const {findUsers, findUser, registerUser, modifyUser, removeUser} = require('../service/users');

const getUsers = (async (req, res) => {
    const usersList = findUsers();
})

const getUser = (async (req, res) => {
    const user = findUser(req.params.id);
})

const postUser = (async (req, res) => {
    registerUser(req.body.name, req.body.surname, req.body.email, req.body.alias, req.body.password);
})

const putUser = (async (req, res) => {
    modifyUser(req.params.id, req.body.name, req.body.surname, req.body.email, req.body.alias, req.body.password)
})

const deleteUser = (async (req, res) => {
    removeUser(req.params.id);
})

module.exports = {
    getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser
}