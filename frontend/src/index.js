import axios from 'axios';

window.readBoardgames = function() {
    axios.get('http://localhost:8080/boardgames')
        .then((response) => {
            const boardgamesList = response.data;
            const boardgameUl = document.getElementById('boardgames');

            boardgamesList.forEach(boardgame => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(boardgame.title));
                boardgameUl.appendChild(li);
            });
        })
}