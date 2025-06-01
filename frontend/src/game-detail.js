import axios from 'axios';

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
console.log(gameId);

document.addEventListener('DOMContentLoaded', function() {
    getGame(gameId);
})


function getGame(gameId) {
    axios.get(`http://localhost:8080/game-info/${gameId}`)
        .then((response) => {
            drawGameData(response.data);
            getPlayersFromGame(gameId);
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
        }
    )
}


function getPlayersFromGame(gameId) {
    axios.get(`http://localhost:8080/games-details/${gameId}/users`)
        .then((response) => {
            drawPlayersData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching players:', error);
        }
    )
}


function drawGameData(game) {

    const container = document.getElementById('sectionGameDetail');

    const cardHTML = `
        <div class="card mx-auto shadow" style="max-width: 600px;">
            <div class="card-body text-center">
                <h2 class="card-title mb-3">${game.name}</h2>
                <p class="card-text text-muted mb-4">${game.boardgameName}</p>
                
                <ul class="list-group list-group-flush text-start">
                    <li class="list-group-item"><strong>Juego:</strong> ${game.boardgameName} </li>
                    <li class="list-group-item"><strong>Jugadores Actuales:</strong> ${game.numPlayers}</li>
                </ul>

                <h5 class="mt-4">Jugadores:</h5>
                <ul id="players" class="mb-4"></ul>

                <a href="./index.html" type="button" class="btn btn-dark mt-4">Atrás</a>
                <a href="./edit-game.html?id=${game.id}" type="button" class="btn btn-dark mt-4">Editar</a>
            </div>
        </div>
        `;
        container.innerHTML = cardHTML;
}


function drawPlayersData (players) {
    const container = document.getElementById('players');

    container.className = 'd-flex flex-column align-items-center gap-1 p-0';
    //container.innerHTML = '';

    if (players.length === 0) {
        ul.innerHTML = `<li class="text-muted">No hay jugadores registrados.</li>`;
        return;
    }

    if (players.length === 1) {
        container.className = 'd-flex justify-content-center';
    } else {
        container.className = 'row g-3 justify-content-center';
    }

    players.forEach((player, index) => {
        const colClass = players.length === 1 ? '' : 'col-12 col-md-6 col-lg-5'; // columnas para 2+
        const playerHTML = `
            <div class="${colClass}">
                <div class="d-flex align-items-center gap-3 border rounded px-3 py-2 shadow-sm bg-light">
                    <i class="bi bi-controller fs-4 text-primary"></i>
                    <div>
                        <div class="fw-bold mb-0">${player.name}</div>
                        <small class="text-muted">Jugador ${index + 1}</small>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', playerHTML);
    });
}



