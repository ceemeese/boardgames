import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
console.log(gameId);


document.addEventListener('DOMContentLoaded', function() {
    getListBoardgames();
    getListUsers();
    const header = document. createElement("h1");
    const sectionHeader = document.getElementById('sectionGames')

    if(gameId != null) {
        getBoardgame(gameId);
        header.innerHTML = "Modificar partida"
        sectionHeader.appendChild(header);
    } else {
        header.innerHTML = "Añadir partida"
        sectionHeader.appendChild(header);
    }


    const form = document.getElementById('form')


    form.addEventListener('submit', function (event){
        event.preventDefault();

        const inputsForm = getFormData();
        const isValid = validationForm(inputsForm);

        if(!isValid) {
            return;
        }

        postGame( {
            name: inputsForm.name, 
            boardgameId: inputsForm.boardgameId
        })
        .then (newGame => {
            console.log('Nueva partida creada:', newGame);
            return postGameUsers(inputsForm.players, newGame.id);
        })
        .then ( () => {
            notifyOK('Partida y jugadores registrados correctamente');
            form.reset()
        })
        .catch (error => {
            notifyKO('Error al registrar partida o jugadores')
            console.log(error); 
        })
    })


    console.log('Hola script principal')
});



function getListBoardgames() {
    axios.get('http://localhost:8080/boardgames')
        .then((response) => {
            showBoardGamesList(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function getListUsers() {
    axios.get('http://localhost:8080/users')
        .then((response) => {
            showPlayersList(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}


//MOSTRAS LISTADO USUARIOS EN FORM PARA EL SELECT
function showPlayersList(users) {

    const selectPlayer = document.querySelector('#players');
    
    users.forEach(user => {

        const optionPlayer = document.createElement('option');

        optionPlayer.setAttribute('value', user.id)
        optionPlayer.textContent = user.alias;

        selectPlayer.appendChild(optionPlayer);


        console.log(user.alias)
    });
}


//MOSTRAR LISTADO JUEGOS EN FORM PARA EL SELECT
function showBoardGamesList(boardgames) {

    const selectBoardgame = document.querySelector('#boardgames');

    boardgames.forEach(boardgame => {
        
        const optionBoardgames = document.createElement('option');

        optionBoardgames.setAttribute('value', boardgame.id);
        optionBoardgames.textContent = boardgame.name;

        selectBoardgame.appendChild(optionBoardgames);

    });

}


function postGame(datos) {
    console.log('Datos enviados al backend:', datos);
    return axios.post('http://localhost:8080/games', datos)
        .then ((response) => {
            const data = response.data;
            console.log('Partida añadida con éxito', data);
            return data;
        })
        .catch((error) => {
            console.log('Error saving game', error);
            throw error;
        })
}


function postGameUsers(players, gameId) {
    console.log('Datos enviados al backend', {players, gameId});

    const promises = players.map(userId => {
        return axios.post(`http://localhost:8080/games-details/${gameId}/users`, {userId})
        .then((response) => {
            const data = response.data;
            console.log(`Jugador ${userId} guardado con éxito`, data);
            return data;
        })
        .catch ((error) => {
            console.log('Error saving relation game-users', error);
            throw error;
        });
    });
    
    return Promise.all(promises);
}



//SHOW DATA CUANDO SEA MODIFICAR
function drawGameData() {
    const nameInput = document.getElementById('name');
    console.log("nameinput", nameInput);
    const boardgameInput = document.getElementById('boardgames');
    console.log("boardgameinput", boardgameInput);
    const playersInput = document.getElementById('players');
    console.log("playerinput", playersInput);

    if (nameInput) nameInput.value = game.name;
    if (boardgameInput) boardgameInput.value = game.name;
    if (playersInput) playersInput.value = game.players;


    console.log('Datos de partida cargados:', game);
}


//OBTENER DATOS FORMULARIO
function getFormData() {
    return {
        name: document.querySelector("#name").value,
        boardgameId: document.querySelector("#boardgames").value,
        players: getSelectedPlayers()
    };
}

//OBTENER ARRAY DE MULTISELECT
function getSelectedPlayers() {
    const select = document.querySelector('#players');
    console.log(select.selectedOptions);
    
    return Array.from(select.selectedOptions).map(option => option.value);
}




//VALIDACION DE FORMULARIO
function validationForm(game) {
    if (!game.name || game.name.trim() === '') {
        notifyKO('El nombre no puede estar vacío')
        return false;
    }

    if (!game.boardgameId || game.boardgameId.trim() === '') {
        console.log(game.boardgameId);
        notifyKO('Debe tener un juego asociado')
        return false;
    }



    return true;
}





