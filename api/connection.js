const mongoose = require('mongoose')
const config = require('./src/config/index')

mongoose.connect(
    `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@cluster0.gleuq6m.mongodb.net/?retryWrites=true&w=majority`,
    (err) => {
        if (err) throw err
        console.log('Conectado correctamente a DB')
    }
)

