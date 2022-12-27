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
            validator: s => s === 'Esperando' || s === 'Aprobado',
            message: props => `${props.value} no es un estado valido!`
        },
        default: 'Esperando'
    },
    rol: {
        type: String,
        validate: {
            validator: r => r === 'Estudiante' || r === 'Egresado' || r === 'Administrador' || r === 'TA' || r === 'Henry Hero',
            message: props => `${props.value} no es un rol valido!`
        },
        default: 'Estudiante'
    },
    score: { type: Number, default: 0 },
    avatar: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/henry-ask-ad0f8.appspot.com/o/avatar%20default%2Favatar.jpg?alt=media&token=2297bfa3-3530-4aef-ad76-a718ea3fa93f' },
})

module.exports = model('User', schema)