const Answer = require('../../models/Answer')
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')

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
            await Post.findByIdAndUpdate(post_id, { $inc: { numberComments: 1 } })
            return res.json({ message: 'Comentario añadido con exito!', comment: newComment })
        } else {
            const newComment = await Comment.create({
                body,
                user: req.id,
                answer: answer_id
            })
            await Answer.findByIdAndUpdate(answer_id, { $inc: { numberComments: 1 } })
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
    let { post_id, page } = req.query
    if (!post_id || !page) return res.status(400).json({ message: 'Id de post y numero de pagina requerido.' })
    const post = Post.findById(post_id)
    let numberOfCommentsLeft = post.numberComments - 5 * page > 0
        ? post.numberComments - 5 * page
        : 0
    try {
        let comments = await Comment.find({ post: post_id })
            .skip(page * 5 - 5)
            .limit(5)
            .sort({ createdAt: 1 })
            .populate('user', { userSlack: 1 })
            .select({ post: 0 })

        res.json({ message: 'Comentarios encontrados!', comments, numberOfCommentsLeft })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getCommentsFromAnswer = async (req, res) => {
    let { answer_id, page } = req.query
    if (!answer_id || !page) return res.status(400).json({ message: 'Id de respuesta y numero de pagina requerido.' })
    const answer = Answer.findById(answer_id)
    let numberOfCommentsLeft = answer.numberComments - 5 * page > 0
        ? answer.numberComments - 5 * page
        : 0

    try {
        let comments = await Comment.find({ answer: answer_id })
            .skip(page * 5 - 5)
            .limit(5)
            .sort({ createdAt: 1 })
            .populate('user', { userSlack: 1 })
            .select({ answer: 0 })

        res.json({ message: 'Comentarios encontrados!', comments, numberOfCommentsLeft })
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