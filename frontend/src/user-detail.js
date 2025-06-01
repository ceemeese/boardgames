import axios from 'axios';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log(userId);

document.addEventListener('DOMContentLoaded', function() {
    getUser(userId);
})


function getUser(userId) {
    axios.get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
            drawUserData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
        }
    )
}


function drawUserData(user) {

    const container = document.getElementById('sectionUserDetail');

    const cardHTML = `
        <div class="card mx-auto shadow" style="max-width: 600px;">
                <div class="card-body text-center">
                    <div class="game-image-container mb-4">
                        <img src="https://via.placeholder.com/400x600?text=Imagen+del+Juego" alt="Imagen del juego" />
                    </div>
                    <h2 class="card-title mb-3">${user.name}</h2>
                    <p class="card-text text-muted mb-4">${user.alias}</p>
                    
                    <ul class="list-group list-group-flush text-start">
                        <li class="list-group-item"><strong>Apellido:</strong> ${user.surname} </li>
                        <li class="list-group-item"><strong>Correo:</strong> ${user.email}</li>
                        <li class="list-group-item"><strong>Password:</strong> ${user.password}</li>
                    </ul>

                    <a href="./index.html" type="button" class="btn btn-dark mt-4">Atrás</a>
                    <a href="./edit-boardgame.html?id=${user.id}" type="button" class="btn btn-dark mt-4">Editar</a>
                </div>
        `;
        container.innerHTML = cardHTML;
}



