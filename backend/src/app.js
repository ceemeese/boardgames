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
    
    res.json(data);
});

//DEVOLVER INFORMACION MAS COMPLETA CON GAMEUSERS DE PARTIDA ESPECIFICA OK GAME DETAIL Y EDIT GAME
app.get('/game-info/:id', async (req, res) => {
    
    res.json(data);
});


//GAMES POST OK EDIT GAME
app.post('/games', async (req, res) => {

    
    res.status(201).json(data);
});

//GAMES PUT OK EDIT GAME
app.put('/games/:id', async (req, res) => {

    
    res.status(204).json({});
});

//GAMES DELETE OK VIEW GAMES
app.delete('/games/:id', async (req, res) => {
  
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