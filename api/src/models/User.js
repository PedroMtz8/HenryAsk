const { Schema, model } = require('mongoose')

const schema = new Schema({
    _id: String,
    mail: { type: String, unique: true, required: true },
    userSlack: { type: String, required: true },
    country: { type: String, required: true },
    name: { type: String },
    lastname: { type: String },
    status: {
        type: String,
        validate: {
            validator: s => s === 'awaiting' || s === 'approved',
            message: props => `${props.value} no es un estado valido!`
        },
        default: 'awaiting'
    },
    rol: {
        type: String,
        validate: {
            validator: r => r === 'Estudiante' || r === 'Egresado' || r === 'Administrador',
            message: props => `${props.value} no es un rol valido!`
        },
        default: 'Estudiante'
    },
    score: { type: Number, default: 0 },
})

module.exports = model('User', schema)