const Post = require('../../models/Post')
const User = require('../../models/User')

function checkFields(fields) {
    for (const field in fields) {
        const value = fields[field]
        switch (field) {
            case 'title':
                if(!value) return 'Titulo requerido';
                if(value.length < 15) return 'Titulo debe tener al menos 15 caracteres'
                if(value.length > 150) return 'Titulo debe ser menor o igual a 150 caracteres'
                break;
            case 'body':
                if(!value) return 'Cuerpo requerido'
                if(value.length < 20) return 'Cuerpo debe tener al menos 20 caracteres'
                break;
            case 'tags':
                if(value && value.length === 0) return 'Debe haber al menos un tag'
                if(value && value.length > 3) return 'Pueden haber hasta 3 tags'
                break;
            case 'module':
                const modules = ['M1', 'M2', 'M3', 'M4', 'Graduado']
                if(value && !modules.includes(value)) return 'Modulo invalido'
                break;
            case 'post_id':
                if(!value) return 'Id de post requerido'
                break;
            case 'page':
                if(!value) return 'Numero de pagina requerido'
                if(value <= 0) return 'Numero de pagina debe ser mayor a 0'
                break;
            case 'user_id':
                if(!value) return 'Id de usuario requerido'
                break;
            case 'type':
                if(!value) return 'Tipo de voto requerido'
                break;
            default:
                break;
        }
    }
    return ''
}

const createPost = async (req, res) => {
    const { title, body, tags, module } = req.body
    let message = checkFields({ title, body, tags, module })
    if(!tags) message = 'Tags requeridos'
    if(!module) message = 'Modulo requerido'
    if (message) return res.status(400).json({ message })

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
    let message = checkFields({ post_id, title, body, tags, module })
    if(!tags) message = 'Tags requeridos'
    if(!module) message = 'Modulo requerido'
    if (message) return res.status(400).json({ message })
    try {
        const post = await Post.findById(post_id) //siempre ya que cuando editas, por default, tiene la info anterior
        if (!post) return res.status(404).json({ message: 'El post no fue encontrado!' })
        if (post.user !== req.id) return res.status(401).json({ message: 'Usted no es el autor de este post!' })

        post.title = title
        post.body = body
        post.tags = tags
        post.module = module
        await post.save()

        res.json({ message: 'Post actualizado!', post })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getPostsByUserId = async (req, res) => {
    const { page, user_id, sort } = req.query
    const message = checkFields({ page, user_id })
    if (message) return res.status(400).json({ message })

    let searchPaginatedPosts = Post.find({ user: user_id }) //busqueda para obtener posts paginados
    let searchAllPosts = Post.find({ user: user_id }) //busqueda para obtener numero maximo de pagina    

    searchPaginatedPosts = sort === 'score'
        ? searchPaginatedPosts.sort({ score: -1 }) //ordena por puntaje de mayor a menor
        : searchPaginatedPosts.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedPosts.skip(page * 6 - 6).limit(6).select({ user: 0, voters: 0, numberComments: 0 }),
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
    const message = checkFields({ page, module })
    if (message) return res.status(400).json({ message })

    //Creo la query de busqueda
    function buildQuery() {
        let query = null
        if (q) { //si filtra por titulo
            q = q.replace(/[^\w ]+/g, '')
            query = Post.find({ title: new RegExp(q.trim(), 'i') })
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
        .select({ numberComments: 0, voters: 0 })
        .skip(page * 10 - 10)
        .limit(10)
        .populate('user', { userSlack: 1, score: 1, rol: 1, avatar: 1 })

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

const votePost = async (req, res) => {
    const { type } = req.params
    const { post_id } = req.body
    const message = checkFields({ type, post_id})
    if (message) return res.status(400).json({ message })
    try {
        const voter = await User.findById(req.id) //votante
        const votedPost = await Post.findById(post_id)
        if (!votedPost) return res.status(404).json({ message: 'El post no fue encontrado!' })
        const author = await User.findById(votedPost.user) //autor del post
        if (author.mail === voter.mail) return res.status(400).json({ message: 'No puedes votar tu propio post!' })
        const previousVoteType = votedPost.voters[voter.mail] //obtengo voto previo
        let message = ''

        if (previousVoteType === type) {
            //Si usuario ya votó el mismo tipo de voto que ahora entonces se anula
            return res.status(400).json({ message: 'El nuevo voto debe ser de un tipo diferente al anterior' })
        }

        if (type === '1') {
            votedPost.score = previousVoteType === '-1'
                ? votedPost.score + 2 //si voto abajo anteriormente, entonces sumo dos puntos
                : votedPost.score + 1 //si no voto entonces sumo un punto
            author.score = previousVoteType === '-1'
                ? author.score + 2
                : author.score + 1
            votedPost.voters = { ...votedPost.voters, [voter.mail]: type }
            message = 'El usuario votó arriba'
        }

        else if (type === '0') {

            if (!previousVoteType) {
                return res.status(404).json({ message: 'Voto no puede ser borrado porque no existe' })
            }

            votedPost.score = previousVoteType === '1'
                ? votedPost.score - 1 //si voto arriba entonces resto un punto
                : votedPost.score + 1 //si voto abajo entonces sumo un punto
            author.score = previousVoteType === '1'
                ? author.score - 1
                : author.score + 1
            const voters = votedPost.voters
            delete voters[voter.mail]
            votedPost.voters = voters
            votedPost.markModified('voters') //porque si voters es un obj vacio, no lo guarda
            message = 'El usuario borró su voto'
        }

        else if (type === '-1') {
            votedPost.score = previousVoteType === '1'
                ? votedPost.score - 2 //si voto arriba anteriormente, entonces resto dos puntos
                : votedPost.score - 1 //si no voto entonces resto un punto
            author.score = previousVoteType === '1'
                ? author.score - 2
                : author.score - 1
            votedPost.voters = { ...votedPost.voters, [voter.mail]: type }
            message = 'El usuario votó abajo'
        }

        else {
            return res.status(400).json({ message: 'Tipo de voto inválido' })
        }

        await votedPost.save()
        await author.save() //actualizo la puntuacion de autor de la respuesta
        res.json({ message })

    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = {
    createPost,
    editPost,
    getPostsByUserId,
    getPosts,
    votePost,
    getPostDetail
}
