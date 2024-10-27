const mongoose = require('mongoose')
const config = require('./src/config/index')

mongoose.connect(
    config.MONGO_URI,
    (err) => {
        if (err) throw err
        console.log('Conectado correctamente a DB')
    }
)

