const express = require('express');
const cors = require('cors')
const knex= require('knex');

const app = express();
app.use(cors());
app.use(express.json());

//conexión con la db
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'boardgames.db'
    },
    useNullAsDefault: true
})


//BOARDGAMES
app.get('/boardgames', async (req, res) => {
    const data = await db('boardgames').select('*');
    res.json(data);
});

app.get('/boardgames/:id', async (req, res) => {
    const data = await db('boardgames').select('*').where({id : req.params.id}).first();
    res.json(data);
});
    
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

app.delete('/boardgames/:id', async (req, res) => {
    await db('boardgames').delete().where({id : req.params.id});
    res.status(204).json({});
});





//USERS
app.get('/users', async (req, res) => {
    const data = await db('users').select('*');
    res.json(data);
});

app.get('/users/:id', async (req, res) => {
    const data = await db('users').select('*').where({id : req.params.id}).first();
    res.json(data);
});

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

app.delete('/users/:id', async (req, res) => {
    await db('users').delete().where({id : req.params.id});
    res.status(204).json({});
});




//GAME
app.get('/games', async (req, res) => {
    const data = await db('games').select('*');
    res.json(data);
});


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

app.get('/games/:id', async (req, res) => {
    const data = await db('games').select('*').where({id : req.params.id}).first();
    res.json(data);
});

app.post('/games', async (req, res) => {

    const data = await db('games').insert({
        name: req.body.name,
        boardgameId: req.body.boardgameId
    });
    res.status(201).json(data);
});

app.put('/games/:id', async (req, res) => {

    await db('games').update({
        name: req.body.name,
        boardgameId: req.body.boardgameId,
    }).where({id: req.params.id})
    res.status(204).json({});
});

app.delete('/games/:id', async (req, res) => {
    await db('games').delete().where({id : req.params.id});
    res.status(204).json({});
});



//GAME USERS
app.get('/games-details', async (req, res) => {
    const data = await db('gamesUsers').select('*');
    res.json(data);
});

app.get('/games-details/:id', async (req, res) => {
    const data = await db('gamesUsers').select('*').where({id : req.params.id}).first();
    res.json(data);
});

app.post('/games-details/:gameId/users', async (req, res) => {

    const [newGameId] = await db('gamesUsers').insert({
        gameId: req.params.gameId,
        userId: req.body.userId
    });
    res.status(201).json({id: newGameId});
});
//solo modificar usuario
app.put('/games/:gameId/users/:userId', async (req, res) => {

    await db('gamesUsers').update({
        userId: req.body.newUserId
    }).where({ gameId: req.params.gameId, userId: req.params.userId})
    res.status(204).json({});
});

app.delete('/games-details/:id', async (req, res) => {
    await db('gamesUsers').delete().where({id : req.params.id});
    res.status(204).json({});
});





app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});