import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    getListGames();




    console.log('Hola script view-games')
});



function getListGames() {
    axios.get('http://localhost:8080/game-info')
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

        //TODO getNombreJuego
        const tdBoardgame = document.createElement('td');
        tdBoardgame.textContent = game.boardgameName;

        //TODO numero jugadores
        const tdUsers = document.createElement('td');
        tdUsers.textContent = game.numPlayers;

        const tdActions = document.createElement('td');

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
        deleteUser(game.id);
        });

    });

}