const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    body: { type: String, required: true },
    module: { type: String, required: true },
    tags: [{ type: String }],
    score: { type: Number, default: 0 },
    numberAnswers: { type: Number, default: 0 },
    numberComments: { type: Number, default: 0 },
    voters: { type: Object, default: {} },
    user: {
        type: String,
        ref: 'User',
        immutable: true
    }
}, { timestamps: true, minimize: false })

module.exports = model('Post', schema)