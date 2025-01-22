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

app.get('/boardgames', (req, res) => {
    res.json(boardgames);
});



app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});