const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const boardgames = [
    {
        "title": "Bang" ,
        "maxPlayers": 10,
        "description": "Lorem ipsum dolor sit amet consectetur, adipiscing elit massa molestie, integer pretium scelerisque ac."
    }
];

app.get('/boardgames', (req, res) => {
    res.json(boardgames);
});



app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});