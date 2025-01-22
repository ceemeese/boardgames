# Proyecto API Gestor de juegos de mesa


Hazme un readme donde se explica que el proyecto es una API con Backend y Frontend, en un mismo proeycto pero separado por directorio. Primero se configura backend el package.json con la configuracion basica del proyecto, no será como módulo, y script para que de forma automática arranque la aplicación con npm start y la libreria express. Se instalan las dependencias con npm install y se actualizan con npm update. Se crea app.js como fichero de codigo dentro de directorio src, dentro de backend. Se hace prueba get con datos para ver si funciona correctamente. Se instala nodemon monitoriza el estado del proyecto y cada vez que hay cambio se reinicia solo. Se instala con "npm install -g nodemon" Tambien se instala libreria CORS para permitir o restringir las solicitudes de recursos entre diferentes puertos de backend/frontend
Para la configuracion del frontend dentroe de la carpeta frontendcreamos package.json y src para meter el codigo de la aplicacion con index.js. En el json configuramos para que sea como módulo y libreria parcel de node para lanzar la aplicación y axios para la comunicacion con backend. Se hace un pequeno HTML para probar.


Quiero que me lo hagas bonito bien estructurado 


# Proyecto API con Backend y Frontend Separados

Este proyecto es una API con un **Backend** y **Frontend** dentro del mismo proyecto, pero separados por directorios. El Backend está basado en Node.js utilizando Express, mientras que el Frontend está configurado para funcionar con Parcel y Axios para la comunicación con el Backend.

## Estructura del Proyecto

El proyecto se organiza de la siguiente manera:

/boardgames ├── /backend  
                    └──/src │
                        └── app.js 
                    └── package.json 
            ├── /frontend 
                    └──/src   
                        └── index.html
                        └── index.js 
                    └── package.json 
            ├── README.md



## Backend 

### 1.  Configuración de `package.json`**

En el directorio backend, primero se configura el archivo `package.json` con la configuración básica del proyecto.

{
    "name": "boardgames-backend",
    "version": "0.1",
    "description": "Boardgames application",
    "scripts": {
      "start": "node src/app.js"
    },
    "author": "Cristina Malmierca",
    "license": "GPL-2.0-only",
   
    "dependencies": {
      "express": "^4.21.1",
      "cors": "^2.8.5"
    }
}

📚 Librerías utilizadas 
Express: Framework para crear la API.
CORS: Middleware que permitirá gestionar las solicitudes entre el Frontend y el Backend.


### 2.  Instalación 👩‍💻
Una vez configurado, es necesario instalar: npm install
A continuación se utiliza comando para actualizar: npm update


### 3.  Ejecución 🏃
Para poder ver la aplicación funcionando y seguir desarrollando, es necesario lanzar el proceso "npm start". 
Para no tener que ejecutarlo cada vez que se modifique parte del código, se instala Nodemon y de esta forma se reinicie automáticamente cada vez que detecte un cambio.
npm install -g nodemon

### 4.  Prueba Backend ✅
La API debería estar corriendo en http://localhost:8080/ 
Si todo está correcto, al acceder a este endpoint deberías ver la respuesta:

{
  "message": "Backend iniciado correctamente por puerto 8080"
}

El código inicial para realizar la prueba es el siguiente:
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const boardgames = [
    {
        "title": "Bang" ,
        "maxPlayers": 10,
        "description": "Lorem ipsum dolor sit amet consectetur, adipiscing elit massa molestie, integer pretium scelerisque ac."
    }
];

app.get('/boardgames', (req, res) => {
    res.json(boardgames);
});



app.listen(8080, () => {
    console.log("Backend iniciado correctamente por puerto 8080");
});



## Frontend

### 1.  Configuración de `package.json`**
En el directorio frontend, primero se configura el archivo `package.json` con la configuración básica del proyecto.

{
    "name": "boardgames-frontend",
    "version": "0.1",
    "source": "src/index.html",
    "type": "module",
    "scripts": {
        "start": "parcel --no-cache",
        "build": "parcel build"
    },
    "devDependencies": {
        "buffer": "^6.0.3",
        "parcel": "latest",
        "process": "^0.11.10"
    },
    "dependencies": {
        "axios": "^1.7.7"
    }
}

📚 Librería utilizada
Axios: hacer solicitudes HTTP desde el navegador o desde un entorno de Node.js


### 2.  Instalación 👩‍💻
Una vez configurado, es necesario instalar: npm install
A continuación se utiliza comando para actualizar: npm update


### 3.  Ejecución 🏃
Para poder ver la aplicación funcionando y seguir desarrollando, es necesario lanzar el proceso "npm start". 
Para no tener que ejecutarlo cada vez que se modifique parte del código, se instala el bundle parcel y de esta forma se reinicie automáticamente cada vez que detecte un cambio.
Ya está incluido en la configuración del json


### 4.  Prueba Frontend ✅
La web debería estar corriendo en http://localhost:1234 
Se configura código en el js para que se pueda recoger la información de la API del backend

import axios from 'axios';

window.readBoardgames = function() {
    axios.get('http://localhost:8080/boardgames')
        .then((response) => {
            const boardgamesList = response.data;
            const boardgameUl = document.getElementById('boardgames');

            boardgamesList.forEach(boardgame => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(boardgame.title));
                boardgameUl.appendChild(li);
            });
        })
}

Código HTML

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boardgames</title>
    <script type="module" src="index.js"></script>
</head>
<body onload="readBoardgames()">
    <h1>HOLA</h1>
    <ul id="boardgames">
    </ul>
</body>
</html>?




## Ejecutar proyecto
Para poder visualizar el aplicativo es necesario arrancar tanto Frontend como Backend y tener los dos corriendo a la vez. 
