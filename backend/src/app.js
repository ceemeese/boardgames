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
        surname: req.body.description,
        email: req.body.minPlayers,
        alias: req.body.maxPlayers,
        password: req.body.category
    }).where({id: req.params.id})
    res.status(204).json({});
});


app.delete('/users/:id', async (req, res) => {
    await db('users').delete().where({id : req.params.id});
    res.status(204).json({});
});








app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});