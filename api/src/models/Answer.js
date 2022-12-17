const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    score: { type: Number, default: 0 },
    user: {
        type: String,
        ref: 'User',
        immutable: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        immutable: true
    },
}, { timestamps: true })

module.exports = model('Answer', schema)