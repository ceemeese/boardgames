import axios from 'axios';

document.addEventListener('DOMContentLoaded', function() {
    getListBoardgames(); 




    console.log('Hola script principal')
});

function getListBoardgames() {
    axios.get('http://localhost:8080/boardgames')
        .then((response) => {
            drawData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching boardgames:', error);
        }
    )
}


function deleteBoardgame(boardgameId) {

    axios.delete(`http://localhost:8080/boardgames/${boardgameId}`)
        .then((response) => {
            readBoardgames();
            console.log('Juego eliminado con éxito');
            const deleteButton = document.getElementById(`btn-del-${boardgameId}`);
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('404, Juego no encontrado');
                } else if (error.response.status === 500) {
                    console.error('500, Error interno del servidor');
            } else {
                console.error('Error al realizar la solicitud:', error.message);
            }
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
                    <img alt="${boardgame.name}" width="100%" height="225"/>
                    <div class="card-body">
                        <p class="card-text">${boardgame.name}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="" type="button" class="btn btn-sm btn-outline-secondary">Ver</a>
                                <a href="/boardgames/${boardgame.id}/edit" type="button" class="btn btn-sm btn-outline-secondary">Editar</a>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="" id="del-btn-${boardgame.id}">Eliminar</button>
                            </div>
                            <small class="text-body-secondary">${boardgame.category}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);


        const deleteButton = document.getElementById(`del-btn-${boardgame.id}`);
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            deleteBoardgame(id);
        });        

    });
}








