# Redis-node
API Rest de practica con base de datos Redis para cachear información solicitada.

## Pasos para instalar
- Clonar el repositorio
- Dentro de la raiz del proyecto colocar ```npm install``` para instalar todas las dependencias.
- Para crear un contenedor de Docker con redis utilizar el comando   
```docker run --name some-redis -p 6379:6379 -d redis```
- Una vez que redis esta corriendo en docker, utilizar el comando en el terminal del proyecto de node   
```npm run dev``` (correr el servidor de node)

## Endpoints para probar
- Pedir todos los personajes   
```GET http://localhost:3000/character```   

- Pedir personaje con el id por parametro   
```GET http://localhost:3000/character/{id}```

## Información útil
Si se quisiera ver lo que se esta guardando en la base de datos REDIS.
- Instalar de manera global ```npm i -g redis-commander```
- Luego de instalar, dentro de la raiz del proyecto colocar:   
```redis-commander```
### En localhost:8081 se podrá utilizar un panel como este, en donde se podrán ver las keys que se guardan.
![image](https://user-images.githubusercontent.com/31850880/172075261-859546a0-97de-4e01-9bcb-b807e40a2ef9.png)
