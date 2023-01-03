const Answer = require('../../models/Answer')
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')

function checkFields(fields) {
    for (const field in fields) {
        const value = fields[field]
        switch (field) {
            case 'body':
                if(!value) return 'Cuerpo requerido'
                if(value.length < 15) return 'Cuerpo debe tener al menos 15 caracteres'
                if(value.length > 600) return 'Cuerpo debe ser menor o igual a 600 caracteres'
                break;
            case 'answer_id':
                if(!value ) return 'Id de respuesta requerido'
                break;
            case 'post_id':
                if(!value) return 'Id de post requerido'
                break;
            case 'comment_id':
                if(!value) return 'Id de comentario requerido'
                break;
            case 'page':
                if(!value) return 'Numero de pagina requerido'
                if(value <= 0) return 'Numero de pagina debe ser mayor a 0'
                break;
            default:
                break;
        }
    }
    return ''
}

const createComment = async (req, res) => {
    const { body, post_id, answer_id } = req.body
    const message = checkFields({ body})
    if (message) return res.status(400).json({ message })
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
    const message = checkFields({ body, comment_id})
    if (message) return res.status(400).json({ message })

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
    const message = checkFields({ post_id, page})
    if (message) return res.status(400).json({ message })

    const post = await Post.findById(post_id)
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
    const message = checkFields({ page, answer_id})
    if (message) return res.status(400).json({ message })

    const answer = await Answer.findById(answer_id)
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