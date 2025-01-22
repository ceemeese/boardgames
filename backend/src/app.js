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

app.get('/boardgames', async (req, res) => {
    const data = await db('boardgames').select('*');
    res.json(data);
});

app.get('/boardgames/:id', async (req, res) => {
    const data = await db('boardgames').select('*').where({id : req.params.id});
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



app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});