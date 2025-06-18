const express = require('express');
const cors = require('cors')
const config = require('./config/configuration');


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



app.listen(config.service.port , () => {
    console.log(`Backend iniciado correctamente por puerto ${config.service.port}`);
});


module.exports = app;