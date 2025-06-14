const db = require('../db');


const findGamePlayers = (async (id) => {
    return await db('gamesUsers')
        .join('users', 'gamesUsers.userId', 'users.id')
        .select('users.id', 'users.alias')
        .where('gamesUsers.gameId', id)
})

const findGames = (async () => {
    return await db('games')
        .join('boardgames', 'games.boardgameId', 'boardgames.id')
        .leftJoin('gamesUsers', 'games.id', 'gamesUsers.gameId')
        .select(
            'games.id',
            'games.name',
            'games.boardgameId',
            'boardgames.name as boardgameName'
        )
        .count('gamesUsers.userId as numPlayers')
        .groupBy('games.id', 'boardgames.name')
})

const findGame = (async (id) => {
    return await db('games')
        .join('boardgames', 'games.boardgameId', 'boardgames.id')
        .leftJoin('gamesUsers', 'games.id', 'gamesUsers.gameId')
        .select(
            'games.id',
            'games.name',
            'games.boardgameId',
            'boardgames.name as boardgameName'
        )
        .count('gamesUsers.userId as numPlayers')
        .where('games.id', id)
        .groupBy('games.id', 'boardgames.name')
        .first();
})

const findGameBasic = (async (id) => {
    return await db('games').select('*').where({id : id}).first();
})

const registerGame = (async (name, boardgameId) => {
    await db('games').insert({
        name: name,
        boardgameId: boardgameId
    });
})

const modifyGame = (async (id, name, boardgameId) => {
    await db('games').update({
        name: name,
        boardgameId: boardgameId,
    }).where({id: id})
})

const removeGame = (async (id) => {
    await db('gamesUsers').delete().where({gameId : id});
    await db('games').delete().where({id : id});
})


module.exports = {
    findGamePlayers,
    findGames,
    findGame,
    findGameBasic,
    registerGame,
    modifyGame,
    removeGame
}