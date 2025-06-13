const express = require('express');
const cors = require('cors')


const boardgames = require ('./route/boardgames');
const games = require ('./route/games');
const users = require ('./route/users');
const gamesUsers = require ('./route/gamesUsers');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', boardgames)
app.use('/', games)
app.use('/', users)
app.use('/', gamesUsers)



//BOARDGAMES OK INDEX
app.get('/boardgames', async (req, res) => {
    const data = await db('boardgames').select('*');
    res.json(data);
});

//BOARDGAMES ID OK EDIT-BOARDGAME / BOARDGAME DETAIL
app.get('/boardgames/:id', async (req, res) => {
    const data = await db('boardgames').select('*').where({id : req.params.id}).first();
    res.json(data);
});
  
//BOARDGAMES POST OK EDIT-BOARDGAME
app.post('/boardgames', async (req, res) => {

    await db('boardgames').insert({
        name: req.body.name,
        description: req.body.description,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        category: req.body.category
    });
    res.status(201).json({});
});

//BOARDGAMES PUT OK EDIT-BOARDGAME
app.put('/boardgames/:id', async (req, res) => {

    await db('boardgames').update({
        name: req.body.name,
        description: req.body.description,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        category: req.body.category
    }).where({id: req.params.id})
    res.status(204).json({});
});

//BOARDGAMES DELETE OK INDEX
app.delete('/boardgames/:id', async (req, res) => {
    await db('boardgames').delete().where({id : req.params.id});
    res.status(204).json({});
});





//USERS OK VIEW PLAYERS
app.get('/users', async (req, res) => {
    const data = await db('users').select('*');
    res.json(data);
});

//USER ID OK EDIT USER / USER DETAIL
app.get('/users/:id', async (req, res) => {
    const data = await db('users').select('*').where({id : req.params.id}).first();
    res.json(data);
});

//USER POST OK EDIT USER
app.post('/users', async (req, res) => {

    await db('users').insert({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        alias: req.body.alias,
        password: req.body.password,
    });
    res.status(201).json({});
});

//USER PUT OK EDIT USER
app.put('/users/:id', async (req, res) => {

    await db('users').update({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        alias: req.body.alias,
        password: req.body.password,
    }).where({id: req.params.id})
    res.status(204).json({});
});

//USER DELETE OK VIEW PLAYERS
app.delete('/users/:id', async (req, res) => {
    await db('users').delete().where({id : req.params.id});
    res.status(204).json({});
});




//TABLA GAME CON GAMEUSERS DEVOLVER USUARIOS OK GAME DETAIL
app.get('/game-info/:id/players', async (req, res) => {
    const players = await db('gamesUsers')
        .join('users', 'gamesUsers.userId', 'users.id')
        .select('users.id', 'users.alias')
        .where('gamesUsers.gameId',req.params.id)

    res.json(players);
});

//DEVOLVER INFORMACION TABLA GAME MAS COMPLETA CON GAMEUSERS OK VIEWGAMES
app.get('/game-info', async (req, res) => {
    const data = await db('games')
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
    res.json(data);
});

//DEVOLVER INFORMACION MAS COMPLETA CON GAMEUSERS DE PARTIDA ESPECIFICA OK GAME DETAIL Y EDIT GAME
app.get('/game-info/:id', async (req, res) => {
    const data = await db('games')
        .join('boardgames', 'games.boardgameId', 'boardgames.id')
        .leftJoin('gamesUsers', 'games.id', 'gamesUsers.gameId')
        .select(
            'games.id',
            'games.name',
            'games.boardgameId',
            'boardgames.name as boardgameName'
        )
        .count('gamesUsers.userId as numPlayers')
        .where('games.id', req.params.id)
        .groupBy('games.id', 'boardgames.name')
        .first();
    res.json(data);
});


//GAMES POST OK EDIT GAME
app.post('/games', async (req, res) => {

    const data = await db('games').insert({
        name: req.body.name,
        boardgameId: req.body.boardgameId
    });
    res.status(201).json(data);
});

//GAMES PUT OK EDIT GAME
app.put('/games/:id', async (req, res) => {

    data = await db('games').update({
        name: req.body.name,
        boardgameId: req.body.boardgameId,
    }).where({id: req.params.id})
    res.status(204).json({});
});

//GAMES DELETE OK VIEW GAMES
app.delete('/games/:id', async (req, res) => {
    await db('gamesUsers').delete().where({gameId : req.params.id});
    await db('games').delete().where({id : req.params.id});
    res.status(204).json({});
});



//TABLA GAME USERS
//TABLA GAMEUSERS DEVOLVER NOMBRES USUARIOS DE PARTIDA ESPECIFICA ID OK GAME DETAIL
app.get('/games-details/:gameId/users', async (req, res) => {

    const data = await db('gamesUsers')
        .join('users', 'gamesUsers.userId', 'users.id')
        .select('users.id', 'users.name')
        .where('gamesUsers.gameId', req.params.gameId);
    res.status(201).json(data);
});

//TABLA GAMEUSERS POST USUARIOS PARA PARPTIDA ESPECIFICA OK EDIT GAME
app.post('/games-details/:gameId/users', async (req, res) => {

    const [newGameId] = await db('gamesUsers').insert({
        gameId: req.params.gameId,
        userId: req.body.userId
    });
    res.status(201).json({id: newGameId});
});

//TABLA GAMEUSERS DELETE PARA PARTIDA ESPECIFICA TODOS USUARIOS OK EDIT GAME
app.delete('/games-details/:gameId/users', async (req, res) => {
    await db('gamesUsers').delete().where({gameId : req.params.gameId});
    res.status(204).json({});
});





app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});