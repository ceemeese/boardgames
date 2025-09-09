import axios from 'axios';
import { API_URL } from './config';
import { notifyOK, notifyKO } from './utils.js';


document.addEventListener('DOMContentLoaded', function() {
    getListBoardgames(); 




    console.log('Hola script principal')
});

function getListBoardgames() {
    axios.get(`${API_URL}/boardgames`)
        .then((response) => {
            drawData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function deleteBoardgame(boardgameId) {

    axios.delete(`${API_URL}/boardgames/${boardgameId}`)
        .then((response) => {
            console.log('Juego eliminado con éxito');
            notifyOK('Juego eliminado correctamente');
            getListBoardgames();
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    notifyKO('Juego no encontrado');
                    console.error('404, Juego no encontrado');
                } else if (error.response.status === 500) {
                        notifyKO('Error interno del servidor');
                    console.error('500, Error interno del servidor');
                } else {
                    notifyKO('Error al realizar la solicitud');
                    console.error('Error al realizar la solicitud:', error.message);
                }
            } else {
                notifyKO('Error de conexión con el servidor');
                console.error('Error de red o sin respuesta del servidor:', error.message);
            }
        })
}




const drawData = (boardgamesList) => {

    const container = document.querySelector('.album .container .row');
    container.innerHTML = '';

    boardgamesList.forEach(boardgame => {
        const cardHTML = `
            <div class="col" id="game-${boardgame.id}" data-id="${boardgame.id}">
                <div class="card shadow-sm">
                    <img alt="${boardgame.name}" src="${boardgame.imageUrl}" width="100%" height="300"/>
                    <div class="card-body">
                        <p class="card-text">${boardgame.name}</p>
                        <small>${boardgame.description}</small></br>
                        <small>Categoria:${boardgame.category}</small></br>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div class="btn-group">
                                <a href="./boardgame-detail.html?id=${boardgame.id}" type="button" class="btn btn-sm btn-outline-secondary">Ver</a>
                                <a href="./edit-boardgame.html?id=${boardgame.id}" type="button" class="btn btn-sm btn-outline-secondary">Editar</a>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="" id="del-btn-${boardgame.id}">Eliminar</button>
                            </div>
                            <small class="text-body-secondary">${boardgame.minPlayers} - ${boardgame.maxPlayers} jugadores</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);


        const deleteButton = document.getElementById(`del-btn-${boardgame.id}`);
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            deleteBoardgame(boardgame.id);
        });        

    });
}








