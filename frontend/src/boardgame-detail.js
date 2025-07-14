import axios from 'axios';
import { notifyOK, notifyKO } from './utils';
import { API_URL } from './config';

const urlParams = new URLSearchParams(window.location.search);
const boardgameId = urlParams.get('id');
console.log(boardgameId);

document.addEventListener('DOMContentLoaded', function() {
    getBoardgame(boardgameId);
})


function getBoardgame(boardgameId) {
    axios.get(`${API_URL}/boardgames/${boardgameId}`)
        .then((response) => {
            drawBoardgameData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function drawBoardgameData(boardgame) {

    const container = document.getElementById('sectionBoardgameDetail');

    const cardHTML = `
        <div class="card mx-auto shadow" style="max-width: 400px;">
                <div class="card-body text-center">
                    <div class="game-image-container mb-4">
                        <img src="${boardgame.imageUrl}" alt="Imagen del juego" width="100%" height="400" />
                    </div>
                    <h2 class="card-title mb-3">${boardgame.name}</h2>
                    <p class="card-text text-muted mb-4">${boardgame.description}</p>
                    
                    <ul class="list-group list-group-flush text-start">
                        <li class="list-group-item"><strong>Mínimo jugadores:</strong> ${boardgame.minPlayers} </li>
                        <li class="list-group-item"><strong>Máximo jugadores:</strong> ${boardgame.maxPlayers}</li>
                        <li class="list-group-item"><strong>Categoria:</strong> ${boardgame.category} </li>
                    </ul>

                    <a href="./index.html" type="button" class="btn btn-dark mt-4">Atrás</a>
                    <a href="./edit-boardgame.html?id=${boardgame.id}" type="button" class="btn btn-dark mt-4">Editar</a>
                </div>
        `;
        container.innerHTML = cardHTML;
}



