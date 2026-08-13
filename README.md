# Miniblog API

## Descripción del proyecto
Este proyecto es una API RESTful desarrollada en Node.js + Express + PostgreSQL para la gestión de un miniblog, organizando los módulos de authors y posts mediante una arquitectura modular que separa rutas, controladores, servicios y validadores.

---
## Estructura del proyecto
miniblog-projectM2-main/
├── .env.example
├── .gitignore
├── openapi.yaml
├── package.json
├── package-lock.json
├── vitest.config.js
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db-test-connection.js
│   │   ├── db.js
│   │   ├── seed.sql
│   │   └── setup.sql
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── postController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   └── postRoutes.js
│   ├── services/
│   │   ├── authorService.js
│   │   └── postService.js
│   └── utils/
│       ├── errors.js
│       └── validators.js
└── tests/
    ├── app.test.js
    └── validators.test.js

## Requisitos previos
* Node.js >= 18
* PostgreSQL >= 14
* npm >= 9

## Ejecución local
### 1. Clonar e instalar dependencias
`git clone https://github.com/angelicalunagar/miniblog-projectM2.git
 cd miniblog-projectM2
 npm install`

### 2. Configurar las variables de entorno
Crear un archivo `.env` tomando como referencia el archivo `.env.example`:
`PORT=a_number
DB_USER=db_user
DB_HOST=host_url
DB_PASSWORD=a_password
DB_NAME=db_name
DB_PORT=a_number`

### 3. Configuración de la base de datos