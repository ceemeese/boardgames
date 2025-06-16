const db = require('../db');


const findUsersNameByGame = (async(gameId) => {
    return await db('gamesUsers')
        .join('users', 'gamesUsers.userId', 'users.id')
        .select('users.id', 'users.name')
        .where('gamesUsers.gameId', gameId);
})

const registerUserByGame = (async(gameId, userId) => {
    const [newGameId] = await db('gamesUsers').insert({
        gameId: gameId,
        userId: userId
    });

    return {id: newGameId }
})

const removeUserByGame = (async(gameId) => {
     const row = await db('gamesUsers').delete().where({gameId : gameId});
     return row;
})


module.exports = {
    findUsersNameByGame,
    registerUserByGame,
    removeUserByGame
}