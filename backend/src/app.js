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



app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});