# Boardgames: gestor de partidas de juegos de mesa

Este proyecto es una API para gestionar una colección de juegos de mesa, partidas individuales y jugadores. El proyecto está compuesto por un **Backend** y **Frontend** dentro del mismo proyecto, pero separados por directorios. 
- Backend: ![Static Badge](https://img.shields.io/badge/-nodejs?style=flat&logo=nodedotjs&logoColor=%235FA04E&label=Node.js&labelColor=FFFFFF&color=FFFFFF)
 ![Static Badge](https://img.shields.io/badge/-express?style=flat&logo=express&logoColor=%23000000&label=Express&labelColor=FFFFFF&color=FFFFFF)
- Frontend:  ![Static Badge](https://img.shields.io/badge/-javascript?style=flat&logo=javascript&logoColor=%23F7DF1E&label=Javascript&labelColor=FFFFFF&color=FFFFFF) ![Static Badge](https://img.shields.io/badge/-axios?style=flat&logo=axios&logoColor=%235A29E4&label=Axios&labelColor=FFFFFF&color=FFFFFF) ![Static Badge](https://img.shields.io/badge/-bootstrap?style=flat&logo=bootstrap&logoColor=%237952B3&label=Bootstrap&labelColor=FFFFFF&color=FFFFFF)
- Base de datos: ![Static Badge](https://img.shields.io/badge/-mariadb?style=flat&logo=mariadb&logoColor=%23003545&label=MariaDB&labelColor=FFFFFF&color=FFFFFF) 
- Almacenamiento de imágenes: ![Static Badge](https://img.shields.io/badge/-aws?style=flat&logoColor=%23000000&label=AWS%20S3&labelColor=FFFFFF&color=FFFFFF)
- Contenerización: ![Static Badge](https://img.shields.io/badge/-docker?style=flat&logo=docker&logoColor=%232496ED&label=Docker&labelColor=FFFFFF&color=FFFFFF)
- Monitorización: ![Static Badge](https://img.shields.io/badge/-prometheus?style=flat&logo=prometheus&logoColor=%23E6522C&label=Prometheus&labelColor=FFFFFF&color=FFFFFF) ![Static Badge](https://img.shields.io/badge/-grafana?style=flat&logo=grafana&logoColor=%23F46800&label=Grafana&labelColor=FFFFFF&color=FFFFFF)
<br>
  
## 🏗️ Arquitectura

La aplicación está diseñada con una arquitectura desacoplada, separando el frontend y el backend en servicios distintos que se comunican a través de una API REST.

**Frontend:** Aplicación del lado del cliente construida con JavaScript puro y empaquetada con Parcel. Se encarga de la interacción con el usuario y realiza llamadas a la API del backend. Maquetada con Bootstrap.

**Backend API:** Servidor en Node.js utilizando el framework Express. Expone una API RESTful para todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

**Base de datos:** Una base de datos MariaDB almacena toda la información relacionada con los juegos de mesa, las sesiones de juego y los usuarios.

**Almacenamiento de imágenes:** Las imágenes de los juegos de mesa se suben y se sirven desde un bucket de AWS S3.

**Monitorización:** Prometheus recopila métricas personalizadas expuestas por el backend, y Grafana puede utilizarse para su visualización.

<br>
  
## 🚀 Primeros pasos 

### Requisitos previos
- Docker y Docker Compose
- Node.js y npm
- Un bucket de AWS S3 y credenciales de acceso
<br>
  
### Configuración del entorno
Clonar repositorio
```
git clone https://github.com/ceemeese/boardgames.git
cd boardgames
```
Crear archivo de entorno para el backend en backend/.env con tus credenciales de AWS S3:
```
# backend/.env
BUCKET_NAME=tu-nombre-s3-bucket
BUCKET_REGION=tu-s3-bucket-region
ACCESS_KEY=tu-aws-access-key
SECRET_ACCESS=tu-aws-secret-access-key
SESSION_TOKEN=tu-aws-session-token # (si aplica)
```
<br>

### Ejecutar la aplicación con Docker
Esta es la forma recomendada de ejecutar toda la aplicación. Construir e iniciar todos los servicios:
```
docker-compose up --build
```
La aplicación estará disponible en las siguientes ubicaciones:
- Frontend: http://localhost:1234
- API del Backend: http://localhost:8080
- Base de datos: localhost:3306 (accesible desde el host
  
<br>

### Desarrollo en local
También se pueden ejecutar los servicios del frontend y backend por separado durante el desarrollo.  

**Backend**
1. Acceder al directorio backend e instalar dependencias:
```
cd backend
npm install
```
2. Iniciar base de datos para desarrollo:
```
npm run database:test
```
3. Esperar a que la base de datos esté lista y después iniciar el servidor:
```
npm run start-dev
```
El servidor del backend se ejecutará en http://localhost:8080.  
<br>

**Frontend**
1. Acceder al directorio frontend e instalar dependencias:
```
cd frontend
npm install
```
2. Iniciar el servidor de desarrollo
```
npm start
```
El frontend se servirá en http://localhost:1234.
   
Para no tener que ejecutar cada vez que se modifique parte del código, se instala el bundle parcel y de esta forma se reinicie automáticamente cada vez que detecte un cambio.
Ya está incluido en la configuración del json.

<br>

## 🧪 Testing
El backend incluye una completa batería de pruebas, tanto unitarias como de integración. Los test de unitarios están hechos con Jest, en cambio, los test de integración con Mocha. Para facilitar el lanzamiento de los test se configura un archivo Makefile para automatizar los comandos de testing descritos en el json.
1. Acceder al directorio backend e instalar dependencias:
```
cd backend
npm install
```
2. Lanzar comando de arranque de contenedor de base de datos y lanzamiento de test
```
make start-all-test
```
> [!NOTE]  
> En caso de querer lanzar los test por separado:
> 1. Lanzar la base de datos en desarrollo
>    ```npm run database:test```
> 2. Lanzar o bien test unitario o integración
>    ```npm run unit-test // npm run integration-test```

<br>

## 📈 Monitorización
Se proporciona un archivo docker-compose separado para ejecutar Prometheus y Grafana.

Inicia el stack de monitorización:
```
docker-compose -f docker-compose.metrics.yaml up -d 
```
Acceder a los servicios:  
Prometheus: http://localhost:9090 (las métricas de la API del backend están disponibles en el endpoint /metrics).  
Grafana: http://localhost:3000


<br>

## ⚙️ CI/CD
Este repositorio está configurado con GitHub Actions para integración continua y despliegue.
- node.js.yml: Ejecuta automáticamente la suite de pruebas del backend en cada push y pull request a la rama develop.  
- docker-image.yml: Construye y sube imágenes Docker multi-arquitectura (linux/amd64, linux/arm64) del frontend y backend a Docker Hub.  
- sonarqube.yml: Realiza análisis estático de código y envía los informes de cobertura a SonarQube para control de calidad.


<br>

> [!IMPORTANT]
> Para poder visualizar el aplicativo es necesario arrancar tanto Frontend como Backend y tener los dos corriendo a la vez.
> Para su correcto funcionamiento es importante tener la base de datos iniciada además de tener configuradas las variables de entorno para no tener problemas con la subida de imágenes en AWS S3. 
