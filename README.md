# node-ts-final-project
# Proyecto final del curso Node JS con Typescript y API's Rest

## Para clonar el proyecto usando cli:

### 1- Situarse en el directorio donde desee guardar el proyecto

### 2- Luego ejecutar:
```
git clone https://github.com/crisstianmella/node-ts-final-project
```
### 3- Entrar al directorio del proyecto: 
```
cd node-ts-final-project
```
### 4- Instalar dependencias usando:  
```
yarn install
```
### 5- Construir la aplicación usando el comando 
```
yarn run build
```
### 6- Antes de ejecutar la aplicación de Node, debemos levantar primero nuestro Docker-compose usando
```
docker compose up -d
```
### 7- Ahora podemos ejecutar nuestra aplicación de Node 
```
yarn run prod
```

# Docker Compose

### Instrucción para ejecutar un docker-compose.yaml

```
docker compose up -d
```

### Para eliminar el contenedor que se creó con docker compose

```
docker compose down
```

### Para ver el estado de los contenedores creados con docker compose

```
docker compose ps
```

# Postman collection Request
Para facilitar la revisión se agregó también el archivo Postman collection para su importación

```
node-ts-project.postman_collection.json
```







