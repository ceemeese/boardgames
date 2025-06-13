const db = require('../db');


const findUsers = (async () => {
    return await db('users').select('*');
})

const findUser = (async (id) => {
    return await db('users').select('*').where({id: id}).first();
})

const registerUser = (async (name, surname, email, alias, password) => {
    await db('users').insert({
        name: name,
        surname: surname,
        email: email,
        alias: alias,
        password: password,
    });
})

const modifyUser = (async (id, name, surname, email, alias, password) => {
    await db('users').update({
        name: name,
        surname: surname,
        email: email,
        alias: alias,
        password: password,
    }).where({id: id})
})

const removeUser = (async (id) => {
    await db('users').delete().where({id : id});
})

const findUserByAlias = (async (alias) => {
  return await db('users').where({ alias : alias }).first();
})

const findUserByEmail = (async (email) => {
  return await db('users').where({ email :email }).first();
})


module.exports = {
    findUsers,
    findUser,
    registerUser,
    modifyUser,
    removeUser,
    findUserByAlias,
    findUserByEmail
}