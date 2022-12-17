const { Schema, model } = require('mongoose')

const schema = new Schema({
    body: { type: String, required: true },
    user: {
        type: String,
        ref: 'User',
        immutable: true,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        immutable: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        immutable: true
    }
}, { timestamps: true })

module.exports = model('Comment', schema)