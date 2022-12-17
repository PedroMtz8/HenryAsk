const Post = require('../../models/Post')

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
        const post = await Post.findById(post_id) //siempre ya que cuando editas, por default, tiene la info anterior
        if (!post) return res.status(404).json({ message: 'El post no fue encontrado!' })
        if (post.user !== req.id) return res.status(401).json({ message: 'Usted no es el autor de este post!' })

        await post.update({ title, body, tags, module }, { new: true })
        await post.save()

        res.json({ message: 'Post actualizado!', post })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getPostsByUserId = async (req, res) => {
    const { page, user_id, sort } = req.query
    if (!page) return res.status(400).json({ message: 'Numero de pagina e id de usuario requeridos.' })

    let searchPaginatedPosts = Post.find({ user: user_id }) //busqueda para obtener posts paginados
    let searchAllPosts = Post.find({ user: user_id }) //busqueda para obtener numero maximo de pagina    

    searchPaginatedPosts = sort === 'score'
        ? searchPaginatedPosts.sort({ score: -1 }) //ordena por puntaje de mayor a menor
        : searchPaginatedPosts.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedPosts.skip(page * 6 - 6).limit(6).select({ user: 0 }),
        searchAllPosts.select({ _id: 1 })
    ]).then(([paginatedDocs, allDocs]) => {
        const maxPages = Math.ceil(allDocs.length / 6)
        res.json({ message: 'Posts encontrados!', foundPosts: paginatedDocs, maxPages })
    }).catch(error => {
        res.json({ message: error.message })
    })
}

const getPostDetail = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user', { country: 0, status: 0, mail: 0 })
        res.json({ message: 'Post encontrado!', post })

    } catch (error) {
        res.json({ message: error.message })
    }
}

const getPosts = async (req, res) => {
    let { page, module, sort, tags, q } = req.query
    if (!page) return res.status(400).json({ message: 'Numero de pagina requerido.' })

    //Creo la query de busqueda
    function buildQuery() {
        let query = null
        if (q) { //si filtra por titulo
            q = q.replace(/[^\w\+]+/g, '')
            query = Post.find({ title: new RegExp(q.trim().replace('+', ' '), 'i') })
        }

        if (tags) {
            query = query
                ? query.find({ tags: { $all: tags.split(' ') } }) //si filtro por titulo, filtro tambien por tags
                : Post.find({ tags: { $all: tags.split(' ') } }) //si no filtro por titulo, filtro por tags
        }

        if (module) {
            query = query
                ? query.find({ module }) //si filtro por tags, filtra tambien por modulo
                : Post.find({ module }) //si no filtro por tags, filtra por modulo
        }

        if (!query) query = Post.find() //si no filtro por nada, obtiene todos los posts

        query = sort === 'score'
            ? query.sort({ score: -1 }) //ordena por puntaje de mayor a menor
            : query.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

        return query
    }

    //busqueda para obtener posts paginados
    const searchPaginatedPosts = buildQuery()
        .skip(page * 10 - 10)
        .limit(10)
        .populate('user', { userSlack: 1, score: 1, rol: 1 })

    //busqueda para obtener numero maximo de pagina
    const searchAllPosts = buildQuery().select({ _id: 1 })

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedPosts,
        searchAllPosts
    ]).then(([paginatedDocs, allDocs]) => {
        const maxPages = Math.ceil(allDocs.length / 10)
        res.json({ message: 'Posts encontrados!', foundPosts: paginatedDocs, maxPages })
    }).catch(error => {
        res.json({ message: error })
    })

}

const sumPostScore = async (req, res) => {
    const { post_id } = req.body
    try {
        const updatedPost = await Post.findByIdAndUpdate(post_id, { $inc: { score: 1 } }, { new: true })
        if (!updatedPost) return res.status(404).json({ message: 'El post no fue encontrado!' })

        res.json(updatedPost)
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    createPost,
    editPost,
    getPostsByUserId,
    getPosts,
    sumPostScore,
    getPostDetail
}
