const db = require('../db');


const findBoardgames = (async () => {
    return await db('boardgames').select('*');
})

const findBoardgame = (async (id) => {
    return await db('boardgames').select('*').where({id: id}).first();
})

const registerBoardgame = (async (name, description, minPlayers, maxPlayers, category) => {
    await db('boardgames').insert({
        name: name,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        category: category
    });
})

const modifyBoardgame = (async (id, name, description, minPlayers, maxPlayers, category) => {
    await db('boardgames').update({
        name: name,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        category: category
    }).where({id: id})
})

const removeBoardgame = (async (id) => {
    await db('boardgames').delete().where({id: id});
})


module.exports = {
    findBoardgames,
    findBoardgame,
    registerBoardgame,
    modifyBoardgame,
    removeBoardgame
}