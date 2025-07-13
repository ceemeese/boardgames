const db = require('../db');


const findBoardgames = (async () => {
    return await db('boardgames').select('*');
})

const findBoardgame = (async (id) => {
    return await db('boardgames').select('*').where({id: id}).first();
})

const registerBoardgame = (async (name, description, minPlayers, maxPlayers, category, nameImage) => {
    const [id] = await db('boardgames').insert({
        name: name,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        category: category,
        nameImage: nameImage
    });

    return id;
})

const modifyBoardgame = (async (id, name, description, minPlayers, maxPlayers, category, nameImage) => {
    await db('boardgames').update({
        name: name,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        category: category,
        nameImage: nameImage
    }).where({id: id})
})

const removeBoardgame = (async (id) => {
    const row = await db('boardgames').delete().where({id: id});

    return row;
})


module.exports = {
    findBoardgames,
    findBoardgame,
    registerBoardgame,
    modifyBoardgame,
    removeBoardgame
}