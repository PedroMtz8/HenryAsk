const Post = require('../../models/Post')
const { checkPostWasFound } = require('./functions')

const createPost = async (req, res) => {
    const { title, body, tags, module } = req.body
    if (!title || !body || !tags || !module) return res.status(400).json({ message: 'Titulo, descripcion, etiquetas y modulo requeridos.' })

    try {
        const newPost = await Post.create({
            title,
            body,
            user: req.id,
            tags,
            module,
        })
        res.json({ message: 'Post creado con exito!', post: newPost })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const editPost = async (req, res) => {
    const { post_id, title, body, tags, module } = req.body
    if (!post_id || !title || !body || !tags || !module) return res.status(400).json({ message: 'Id del post, titulo, descripcion, etiquetas y modulo requeridos.' })

    try {
        const post = await Post.findByIdAndUpdate(post_id, { title, body, tags, module }, { new: true }) //siempre ya que cuando editas, por default, tiene la info anterior
        checkPostWasFound(post)
        res.json({ message: 'Post actualizado!', post })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ user_id: req.id })
        res.json({ message: 'Posts encontrados!', posts })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getPosts = async (req, res) => {
    const { page, module, sort, tags } = req.query

    if (!page) return res.status(400).json({ message: 'Numero de pagina requerido.' })

    let posts = tags && Post.find({ tags: { $all: tags.split(' ') } }) //si hay tags, filtra por tagas

    if (module) {
        posts = posts
            ? posts.find({ module }) //si filtro por tags, filtra tambien por modulo
            : Post.find({ module }) //si no filtro por tags, filtra por modulo
    }

    if (!posts) posts = Post.find() //si no filtro por nada, obtiene todos los posts

    posts = sort === 'score'
        ? posts.sort({ score: -1 }) //ordena por puntaje de mayor a menor
        : posts.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

    const foundPosts = await posts.skip(page * 10 - 10).limit(10).populate(['user']) //obtiene los 10 posts de n pagina

    res.json(foundPosts)
}

const sumPostScore = async (req, res) => {
    const { post_id } = req.body
    const updatedPost = await Post.findByIdAndUpdate(post_id, { $inc: { score: 1 } }, { new: true })
    checkPostWasFound(updatedPost)
    res.json(updatedPost)
}

module.exports = {
    createPost,
    editPost,
    getPostsByUserId,
    getPosts,
    sumPostScore,
}
