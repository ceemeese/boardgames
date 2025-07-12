import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';
import { API_URL } from './config';


const urlParams = new URLSearchParams(window.location.search);
const boardgameId = urlParams.get('id');
console.log(boardgameId);

document.addEventListener('DOMContentLoaded', function() {
    const header = document. createElement("h1");
    const sectionHeader = document.getElementById('sectionBoardgames')
    
    if(boardgameId) {
        getBoardgame(boardgameId);
        header.innerHTML = "Ver detalle de juego"
        sectionHeader.appendChild(header);
    } else {
        console.log('No hay ID de juego');
        
    }

    console.log('Hola script principal')
});






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


function postBoardgame(datos) {
    console.log('Datos enviados al backend:', datos);
    
    axios.post(`${API_URL}/boardgames`, datos, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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
    axios.put(`${API_URL}/boardgames/${boardgameId}`, datos)
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

    const formData = new FormData();
    formData.append('name', document.querySelector("#name").value);
    formData.append('description', document.querySelector("#description").value);
    formData.append('minPlayers', document.querySelector("#minPlayers").value);
    formData.append('maxPlayers', document.querySelector("#maxPlayers").value);
    formData.append('category', document.querySelector("#category").value);
    
    const imageFile = document.querySelector("#image").files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    return formData;
}


//Evento de envío de formulario añadir juego
form.addEventListener('submit', function (event){
    event.preventDefault();

    const inputsForm = getFormData()

    console.log('ASI SE VE EL INPUTS FORM', inputsForm);
    

    const isValid = validationForm(inputsForm);

    if (!isValid) {
        return;
    }

    if(boardgameId != null) {
        updateBoardgame(inputsForm);

    } else {
        postBoardgame(inputsForm);
    }
});



function validationForm(boardgame) {

    const minPlayers = parseInt(boardgame.get('minPlayers'), 10);
    const maxPlayers = parseInt(boardgame.get('maxPlayers'), 10);

    console.log(boardgame.get('minPlayers'));
    
    console.log(minPlayers);
    console.log(maxPlayers)
    console.log(boardgame.get('name'));
    
    if (!boardgame.get('name') || boardgame.get('name').trim() === '') {
        notifyKO('El nombre no puede estar vacío')
        return false;
    }

    if (isNaN(minPlayers) || minPlayers <= 0) {
        notifyKO('El número mínimo de jugadores debe ser un número mayor que 0.')
        return false;
    }

    if (isNaN(maxPlayers) || maxPlayers <= 0) {
        notifyKO('El número máximo de jugadores debe ser un número mayor que 0.')
        return false;
    }

    if (minPlayers > maxPlayers) {
        notifyKO('El número mínimo de jugadores no puede ser mayor al máximo.')
        return false;
    }

    if (!boardgame.get('image')) {
        notifyKO('La imagen es obligatoria')
        return false;
    }

    return true;
}



