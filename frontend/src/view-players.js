import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';
import { API_URL } from './config';

document.addEventListener('DOMContentLoaded', function() {
    getListUsers();




    console.log('Hola script view-players')
});


function getListUsers() {
    axios.get(`${API_URL}/users`)
        .then((response) => {
            drawDataUsers(response.data);
            console.log(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}


function drawDataUsers(users) {

    const tbodyUsers = document.querySelector('#usersList');
    tbodyUsers.innerHTML = '';

    users.forEach(user => {

        const trUsers = document.createElement('tr');

        const tdUsername = document.createElement('td');
        tdUsername.textContent = user.alias;

        const tdName = document.createElement('td');
        tdName.textContent = user.name;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = user.surname;

        const tdEmail = document.createElement('td');
        tdEmail.textContent = user.email;

        const tdActions = document.createElement('td');

        const showButton = document.createElement('a');
        showButton.href = `/user-detail.html?id=${user.id}`;
        showButton.type = 'button';
        showButton.className = 'btn btn-sm btn-outline-secondary me-2';
        showButton.textContent = 'Ver';

        const editButton = document.createElement('a');
        editButton.href = `/edit-user.html?id=${user.id}`;
        editButton.type = 'button';
        editButton.className = 'btn btn-sm btn-outline-secondary me-2';
        editButton.textContent = 'Editar';

        const deleteButtonAction = document.createElement('a');
        deleteButtonAction.id = `del-btn-${user.id}`;
        deleteButtonAction.type = 'button';
        deleteButtonAction.className = 'btn btn-sm btn-outline-danger';
        deleteButtonAction.textContent = 'Eliminar';

        tdActions.appendChild(showButton);
        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButtonAction);

        trUsers.appendChild(tdUsername);
        trUsers.appendChild(tdName);
        trUsers.appendChild(tdSurname);
        trUsers.appendChild(tdEmail);
        trUsers.appendChild(tdActions);

        tbodyUsers.appendChild(trUsers);

        const deleteButton = document.getElementById(`del-btn-${user.id}`);
        deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        deleteUser(user.id);
        });

    });
}



function deleteUser(userId) {

    axios.delete(`${API_URL}/users/${userId}`)
        .then((response) => {
            console.log('Jugador eliminado con éxito');
            notifyOK('Jugador eliminado correctamente');
            getListUsers();
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('404, Usuario no encontrado');
                    notifyKO('Usuario no encontrado');
                } else if (error.response.status === 500) {
                    console.error('500, Error interno del servidor');
                    notifyKO('Error interno del servidor');
                } else {
                    console.error('Error al realizar la solicitud:', error.message);
                    notifyKO('Error al realizar la solicitud');
                }
            } else {
                console.error('Error de red o sin respuesta del servidor:', error.message);
                notifyKO('Error de conexión con el servidor');
            }
        });
}