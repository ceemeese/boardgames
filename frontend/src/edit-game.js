import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';

let boardgamesList = [];
let currentMinPlayers = 1;
let currentMaxPlayers = Infinity;

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
console.log(gameId);

document.querySelector('#boardgames').addEventListener('change', (e) => {
    setPlayersLimits(e.target.value);
});


document.addEventListener('DOMContentLoaded', function() {
    
    getListBoardgames();
    getListUsers();
    const header = document. createElement("h1");
    const sectionHeader = document.getElementById('sectionGames')

    if(gameId != null) {
        getGame(gameId);
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
            return postGameUsers(inputsForm.players, newGame);
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

//OBTENER PARTIDA PARA MODIFICAR
function getGame(gameId) {
    axios.get(`http://localhost:8080/game-info/${gameId}`)
        .then((response) => {
            console.log(response.data);
            drawGameData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching game:', error);
        }
    )
}

//OBTENER TODOS LOS JUEGOS
function getListBoardgames(selectedBoardgameId = null) {
    axios.get('http://localhost:8080/boardgames')
        .then((response) => {
            boardgamesList = response.data;
            showBoardGamesList(response.data, selectedBoardgameId);
            console.log(response.data);

            if(selectedBoardgameId) {
                setPlayersLimits(selectedBoardgameId);
            }
        })
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}

//OBTENER TODOS LOS USUARIOS
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

//OBTENER USUARIOS DE PARTIDA ESPECIFICA
function getListUsersFromGame(game) {
        axios.get(`http://localhost:8080/game-info/${game.id}/players`)
        .then((response) => {
            markSelectedPlayers(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}


//MOSTRAS LISTADO TODOS USUARIOS EN FORM PARA EL SELECT. SIEMPRE SE MUESTRAN TODOS
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

//OBTENER ARRAY SELECCIONADO DE MULTISELECT
function getSelectedPlayers() {
    const select = document.querySelector('#players');
    console.log(select.selectedOptions);
    
    return Array.from(select.selectedOptions).map(option => option.value);
}





//MOSTRAR LISTADO JUEGOS EN FORM PARA EL SELECT
function showBoardGamesList(boardgames, selectedBoardgameId = null) {

    const selectBoardgame = document.querySelector('#boardgames');

    boardgames.forEach(boardgame => {
        
        const optionBoardgames = document.createElement('option');

        optionBoardgames.value = boardgame.id;
        optionBoardgames.textContent = boardgame.name;

        if (selectedBoardgameId && boardgame.id == selectedBoardgameId) {
            optionBoardgames.selected = true;
        }

        selectBoardgame.appendChild(optionBoardgames);

    });

}




//REGISTRAR PARTIDA
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

//REGISTRAR USUARIOS EN PARTIDA
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
function drawGameData(game) {
    const nameInput = document.getElementById('name');

    if (nameInput) nameInput.value = game.name;
    console.log(nameInput.value);
    
    markSelectedGame(game.boardgameId);
    getListUsersFromGame(game);;

    setPlayersLimits(game.boardgameId);

    console.log('Datos de partida cargados:', game);
}


//MARCAR BOARDGAME ACTIVO AL MODIFICAR
function markSelectedGame(boardgameIdFromGame) {
    const boardgameInput = document.getElementById('boardgames');

    if (boardgameInput)
    {
        // Limpia selecciones anteriores
        Array.from(boardgameInput.options).forEach(opt => opt.selected = false); 
        const optionToSelect = Array.from(boardgameInput.options).find(opt => opt.value == boardgameIdFromGame);
        if (optionToSelect) {
            optionToSelect.selected = true;
        }
    }
}


//MARCAR USUARIOS ACTIVOS DE PARTIDA AL MODIFICAR
function markSelectedPlayers(playersFromGame) {
    const select = document.querySelector('#players');

    // Limpia selección anterior
    for (const option of select.options) {
        option.selected = false;
    }

    playersFromGame.forEach(player => {
        const optionToSelect = Array.from(select.options).find(opt => opt.value == player.id);
        if (optionToSelect) {
            optionToSelect.selected = true;
        }
    });
}


//ESTABLECER MINIMO MAXIMO JUGADORES TRAS ESCUCHAR CAMBIOS EN JUEGO SELECCIONADO
function setPlayersLimits(boardgameId) {
    const game = boardgamesList.find( bg => bg.id == boardgameId)

    if (game) {
        currentMinPlayers = game.minPlayers;
        currentMaxPlayers = game.maxPlayers;
        console.log('Límites de jugadores establecidos para juego ', game.name);
    }
}





//OBTENER DATOS FORMULARIO
function getFormData() {
    return {
        name: document.querySelector("#name").value,
        boardgameId: document.querySelector("#boardgames").value,
        players: getSelectedPlayers()
    };
}

//VALIDACIONES DE FORMULARIO
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

    if (game.players.length < currentMinPlayers) {
        notifyKO(`Debe seleccionar al menos ${currentMinPlayers} jugadores`);
        return false;
    }

    if (game.players.length > currentMaxPlayers) {
        notifyKO(`No puede seleccionar más de ${currentMaxPlayers} jugadores`);
        return false;
    }

    return true;
}





