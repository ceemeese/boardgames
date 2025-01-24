import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';


const urlParams = new URLSearchParams(window.location.search);
const boardgameId = urlParams.get('id');
console.log(boardgameId);

document.addEventListener('DOMContentLoaded', function() {
    
    if(boardgameId != null) {
        getBoardgame(boardgameId);
    }

    console.log('Hola script principal')
});






function getBoardgame(boardgameId) {
    axios.get(`http://localhost:8080/boardgames/${boardgameId}`)
        .then((response) => {
            drawBoardgameData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function postBoardgame(datos) {
    console.log('Datos enviados al backend:', datos);
    axios.post('http://localhost:8080/boardgames', datos)
        .then((response) => {
            const data = response.data;
            console.log('Juego añadido con éxito:', data);
            notifyOK('Juego registrado correctamente');
            form.reset();
            return data;
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function updateBoardgame(datos) {
    console.log('Datos enviados al backend:', datos);
    axios.put(`http://localhost:8080/boardgames/${boardgameId}`, datos)
        .then((response) => {
            const data = response.data;
            console.log('Juego modificado con éxito:', data);
            notifyOK('Juego modificado correctamente');
            return data;
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function drawBoardgameData(boardgame) {
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    const minPlayersInput = document.getElementById('minPlayers');
    const maxPlayersInput = document.getElementById('maxPlayers');

    if (nameInput) nameInput.value = boardgame.name;
    if (categoryInput) categoryInput.value = boardgame.category;
    if (descriptionInput) descriptionInput.value = boardgame.description;
    if (minPlayersInput) minPlayersInput.value = boardgame.minPlayers;
    if (maxPlayersInput) maxPlayersInput.value = boardgame.maxPlayers;

    console.log('Datos del juego cargados:', boardgame);
}


function getFormData() {
    return {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        minPlayers: document.querySelector("#minPlayers").value,
        maxPlayers: document.querySelector("#maxPlayers").value,
        category: document.querySelector("#category").value,
    };
}


//Evento de envío de formulario añadir juego
form.addEventListener('submit', function (event){
    event.preventDefault();

    const inputsForm = getFormData();
    if(boardgameId != null) {
        updateBoardgame(inputsForm);

    } else {
        postBoardgame(inputsForm);
    }
});



