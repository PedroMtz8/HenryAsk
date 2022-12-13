const { Schema, model } = require('mongoose')
const User = require('./User')

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    body: { type: String, required: true },
    module: { type: String, required: true },
    tags: [{ type: String }],
    score: { type: Number, default: 0 },
    user: {
        type: String,
        ref: User,
        immutable: true
    },
}, { timestamps: true })

module.exports = model('Post', schema)