import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';
import { API_URL } from './config';

let boardgamesList = [];

document.addEventListener('DOMContentLoaded', function() {
    getListBoardgames();
    getListGames();

    console.log('Hola script view-games')
});

function getListBoardgames(selectedBoardgameId = null) {
    axios.get(`${API_URL}/boardgames`)
        .then((response) => {
            boardgamesList = response.data;
        })
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}



function getListGames() {
    axios.get(`${API_URL}/game-info`)
        .then((response) => {
            drawDataGames(response.data);
            console.log(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching games:', error);
        }
    )
}


function drawDataGames(games) {

    const tbodyGames = document.querySelector('#gamesList');
    tbodyGames.innerHTML = '';

    games.forEach(game => {

        const trGames = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = game.name;

        const tdBoardgame = document.createElement('td');
        tdBoardgame.textContent = game.boardgameName;

        //jugadores máximos
        const boardgame = boardgamesList.find(bg => bg.id === game.boardgameId);
        const maxPlayers = boardgame ? boardgame.maxPlayers : '?';

        const tdUsers = document.createElement('td');
        tdUsers.textContent = game.numPlayers + ' de ' + maxPlayers;

        const tdActions = document.createElement('td');

        const showButtonGame = document.createElement('a');
        showButtonGame.href = `/game-detail.html?id=${game.id}`;
        showButtonGame.type = 'button';
        showButtonGame.className = 'btn btn-sm btn-outline-secondary me-2';
        showButtonGame.textContent = 'Ver';

        const editButtonGame = document.createElement('a');
        editButtonGame.href = `/edit-game.html?id=${game.id}`;
        editButtonGame.type = 'button';
        editButtonGame.className = 'btn btn-sm btn-outline-secondary me-2';
        editButtonGame.textContent = 'Editar';

        const deleteButtonAction = document.createElement('a');
        deleteButtonAction.id = `del-btn-${game.id}`;
        deleteButtonAction.type = 'button';
        deleteButtonAction.className = 'btn btn-sm btn-outline-danger';
        deleteButtonAction.textContent = 'Eliminar';

        tdActions.appendChild(showButtonGame);
        tdActions.appendChild(editButtonGame);
        tdActions.appendChild(deleteButtonAction);

        trGames.appendChild(tdName);
        trGames.appendChild(tdBoardgame);
        trGames.appendChild(tdUsers);
        trGames.appendChild(tdActions);

        tbodyGames.appendChild(trGames);

        const deleteButton = document.getElementById(`del-btn-${game.id}`);
        deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        deleteGame(game.id);
        });

    });

}


function deleteGame(gameId) {

    axios.delete(`${API_URL}/games/${gameId}`)
        .then((response) => {
            console.log('Partida eliminada con éxito');
            notifyOK('Partida eliminada correctamente');
            getListGames();
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('404, partida no encontrada');
                    notifyKO('Partida no encontrada');
                } else if (error.response.status === 500) {
                    console.error('500, Error interno del servidor');
                    notifyKO('Error interno del servidor');
                } else {
                    console.error('Error al realizar la solicitud:', error.message);
                    notifyKO('Error al realizar la solicitud');
                }
            } else {
                console.error('Error de red o sin respuesta del servidor:', error.message);
                notifyKO('Error de conexión con el servidor');
            }
        });
}