const Comment = require('../../models/Comment')

const createComment = async (req, res) => {
    const { body, post_id, answer_id } = req.body
    if (!body) return res.status(400).json({ message: 'Descripcion requerida.' })
    if (!post_id && !answer_id) return res.status(400).json({ message: 'Id de post o respuesta requerido.' })

    try {

        if (post_id) {
            const newComment = await Comment.create({
                body,
                user: req.id,
                post: post_id
            })
            return res.json({ message: 'Comentario añadido con exito!', comment: newComment })
        } else {
            const newComment = await Comment.create({
                body,
                user: req.id,
                answer: answer_id
            })
            return res.json({ message: 'Comentario añadido con exito!', comment: newComment })
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

const editComment = async (req, res) => {
    const { comment_id, body } = req.body
    if (!comment_id || !body) return res.status(400).json({ message: 'Id de comentario y descripcion requeridos.' })

    try {
        const comment = await Comment.findById(comment_id)

        if (!comment) return res.status(404).json({ message: 'El comentario no fue encontrado!' })
        if (comment.user !== req.id) return res.status(401).json({ message: 'Usted no es el autor de este comentario!' })

        comment.body = body
        await comment.save()

        res.json({ message: 'Comentario actualizado!', comment })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getCommentsFromPost = async (req, res) => {
    let { post_id } = req.query
    if (!post_id) return res.status(400).json({ message: 'Id de post requerido.' })

    try {
        let comments = await Comment.find({ post: post_id })
            .sort({ createdAt: 1 })
            .populate('user', { userSlack: 1 })
            .select({ post: 0 })

        res.json({ message: 'Comentarios encontrados!', comments })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getCommentsFromAnswer = async (req, res) => {
    let { answer_id } = req.query
    if (!answer_id) return res.status(400).json({ message: 'Id de respuesta requerido.' })

    try {
        let comments = await Comment.find({ answer: answer_id })
            .sort({ createdAt: 1 })
            .populate('user', { userSlack: 1 })
            .select({ answer: 0 })

        res.json({ message: 'Comentarios encontrados!', comments })
    } catch (error) {
        res.json({ message: error.message })
    }

}

module.exports = {
    createComment,
    editComment,
    getCommentsFromAnswer,
    getCommentsFromPost
}