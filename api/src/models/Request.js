const { Schema, model } = require('mongoose')

const schema = new Schema({
    type: {
        type: String,
        validate: {
            validator: t => t === 'Registro' || t === 'Rol',
            message: props => `${props.value} no es un tipo de peticion valido!`
        },
        required: true
    },
    rol: {
        type: String,
        validate: {
            validator: r => r === 'Estudiante' || r === 'Egresado' || r === 'Administrador' || r === 'TA' || r === 'Henry Hero',
            message: props => `${props.value} no es un tipo de peticion valido!`
        },
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
        immutable: true
    },
}, { timestamps: true })

module.exports = model('Request', schema)