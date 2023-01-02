require('./connection')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const env = require('./src/config/index') //contiene todas las variables de entorno
const { verifyToken } = require('./src/controllers/middlewares')

const server = express()
server.use(cors())
server.use(morgan('dev'))
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));

// Rutas
server.use('/auth', require('./src/routes/auth'))
server.use(verifyToken) //Las siguientes rutas contienen este middleware en cada peticion
server.use('/posts', require('./src/routes/posts'))
server.use('/request', require('./src/routes/request'))
server.use('/answer', require('./src/routes/answer'))
server.use('/comment', require('./src/routes/comment'))


server.listen(env.PORT, () => console.log(`Server iniciado en ${env.PORT}!`))