import axios from 'axios';
import { notifyOK, notifyKO } from './utils.js';
var validator = require("email-validator");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log(userId);

document.addEventListener('DOMContentLoaded', function() {
    const headerUser = document. createElement("h1");
    const sectionHeaderUser = document.getElementById('sectionUsers')
    console.log(sectionHeaderUser);
    
    if(userId != null) {
        getUser(userId);
        headerUser.innerHTML = "Modificar usuario"
        sectionHeaderUser.appendChild(headerUser);
    }  else {
        headerUser.innerHTML = "Añadir usuario"
        sectionHeaderUser.appendChild(headerUser)
    }

    console.log('Hola script usuarios')
});




function getUser(userId) {
    axios.get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
            console.log(response.data);
            drawUserData(response.data);
        })
    
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}


function postUser(datos) {
    console.log('Datos enviados al backend:', datos);
    axios.post('http://localhost:8080/users', datos)
        .then((response) => {
            const data = response.data;
            console.log('Usuario añadido con éxito:', data);
            notifyOK('Usuario registrado correctamente');
            form.reset();
            return data;
        })
    
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}




function updateUser(datos) {
    console.log('Datos enviados al backend:', datos);
    axios.put(`http://localhost:8080/users/${userId}`, datos)
        .then((response) => {
            const data = response.data;
            console.log('Usuario modificado con éxito:', data);
            notifyOK('Usuario modificado correctamente');
            return data;
        })
    
        .catch((error) => {
            console.error('Error fetching users:', error);
        }
    )
}



function drawUserData(user) {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const aliasInput = document.getElementById('alias');
    const passwordInput = document.getElementById('password');

    if (nameInput) nameInput.value = user.name;
    if (surnameInput) surnameInput.value = user.surname;
    if (emailInput) emailInput.value = user.email;
    if (aliasInput) aliasInput.value = user.alias;
    if (passwordInput) passwordInput.value = user.password;

    console.log('Datos del juego cargados:', user);
}


function getFormData() {
    return {
        name: document.querySelector("#name").value,
        surname: document.querySelector("#surname").value,
        email: document.querySelector("#email").value,
        alias: document.querySelector("#alias").value,
        password: document.querySelector("#password").value,
    };
}




form.addEventListener('submit', function (event){
    event.preventDefault();

    const inputsForm = getFormData();

    const isValid = validationForm(inputsForm);

    if (!isValid) {
        return;
    }

    if(userId != null) {
        updateUser(inputsForm);

    } else {
        postUser(inputsForm);
    }
});




function validationForm(user) {

    if (!user.alias || user.alias.trim() === '') {
        notifyKO('El nickname no puede estar vacío');
        return false;
    }

    if (!user.email || user.email.trim() === '') {
        notifyKO('El correo no puede estar vacío');
        return false;
    }

    if (!validator.validate(user.email)) {
        notifyKO('El correo debe ser válido');
        return false;
    }

    if (!user.password || user.password.trim() === '') {
        notifyKO('La contraseña no puede estar vacía');
        return false;
    }

    return true;
}