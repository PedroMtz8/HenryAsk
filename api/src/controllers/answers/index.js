const Answer = require('../../models/Answer')
const Post = require('../../models/Post')
const User = require('../../models/User')

const createAnswer = async (req, res) => {
    const { title, body, post_id } = req.body
    if (!title || !body) return res.status(400).json({ message: 'Titulo y descripcion requeridos.' })

    try {
        const newAnswer = await Answer.create({
            title,
            body,
            user: req.id,
            post: post_id
        })
        await Post.findByIdAndUpdate(post_id, { $inc: { numberAnswers: 1 } })

        res.json({ message: 'Respuesta creada con exito!', answer: newAnswer })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const editAnswer = async (req, res) => {
    const { answer_id, title, body } = req.body
    if (!answer_id || !title || !body) return res.status(400).json({ message: 'Id de respuesta, titulo y descripcion requeridos.' })

    try {
        const answer = await Answer.findById(answer_id)

        if (!answer) return res.status(404).json({ message: 'La respuesta no fue encontrado!' })
        if (answer.user !== req.id) return res.status(401).json({ message: 'Usted no es el autor de esta respuesta!' })

        answer.title = title
        answer.body = body
        await answer.save()

        res.json({ message: 'Respuesta actualizada!', answer })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getAnswersFromPost = async (req, res) => {
    let { page, sort, post_id } = req.query
    if (!page || !post_id) return res.status(400).json({ message: 'Numero de pagina e id de post requeridos.' })

    let searchPaginatedAnswers = Answer.find({ post: post_id }) //busqueda para obtener respuestas paginadas
    let searchAllAnswers = Answer.find({ post: post_id }) //busqueda para obtener numero maximo de pagina

    searchPaginatedAnswers = sort === 'score'
        ? searchPaginatedAnswers.sort({ score: -1 }) //ordena por puntaje de mayor a menor
        : searchPaginatedAnswers.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

    searchPaginatedAnswers = searchPaginatedAnswers
        .skip(page * 5 - 5)
        .limit(5)
        .select({ post: 0 })
        .populate('user', { userSlack: 1, score: 1, rol: 1 })

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedAnswers,
        searchAllAnswers.select({ _id: 1 }) //traer menos elementos agiliza la busqueda
    ]).then(([paginatedDocs, allDocs]) => {
        const maxPages = Math.ceil(allDocs.length / 5)
        res.json({ message: 'Respuestas encontradas!', foundAnswers: paginatedDocs, maxPages })
    }).catch(error => {
        res.json({ message: error.message })
    })
}

const getAnswersFromUser = async (req, res) => {
    let { page, sort, user_id } = req.query
    if (!page) return res.status(400).json({ message: 'Numero de pagina e id de usuario requeridos.' })

    let searchPaginatedAnswers = Answer.find({ user: user_id }) //busqueda para obtener respuestas paginadas
    let searchAllAnswers = Answer.find({ user: user_id }) //busqueda para obtener numero maximo de pagina

    searchPaginatedAnswers = sort === 'score'
        ? searchPaginatedAnswers.sort({ score: -1 }) //ordena por puntaje de mayor a menor
        : searchPaginatedAnswers.sort({ createdAt: -1 }) //ordena por fecha de creacion de mas nuevo a mas viejo

    searchPaginatedAnswers = searchPaginatedAnswers
        .skip(page * 5 - 5)
        .limit(5)
        .select({ user: 0, voters: 0 })

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedAnswers,
        searchAllAnswers.select({ _id: 1 })
    ]).then(([paginatedDocs, allDocs]) => {
        const maxPages = Math.ceil(allDocs.length / 5)
        res.json({ message: 'Respuestas encontradas!', foundAnswers: paginatedDocs, maxPages })
    }).catch(error => {
        res.json({ message: error.message })
    })

}

const voteAnswer = async (req, res) => {
    const { type } = req.params
    const { answer_id } = req.body
    try {
        const voter = await User.findById(req.id)
        const votedAnswer = await Answer.findById(answer_id)
        if (!votedAnswer) return res.status(404).json({ message: 'La respuesta no fue encontrada!' })
        const author = await User.findById(votedAnswer.user) //autor de la respuesta
        if (author.mail === voter.mail) return res.status(404).json({ message: 'No puedes votar tu propia respuesta!' })
        const previousVoteType = votedAnswer.voters[req.id] //obtengo voto previo
        let message = ''


        if (previousVoteType === type) {
            //Si usuario ya votó el mismo tipo de voto que ahora entonces se anula
            return res.status(400).json({ message: 'El nuevo voto debe ser de un tipo diferente al anterior' })
        }

        if (type === '1') {
            votedAnswer.score = previousVoteType === '-1'
                ? votedAnswer.score + 2 //si voto abajo anteriormente, entonces sumo dos puntos
                : votedAnswer.score + 1 //si no voto entonces sumo un punto
            author.score = previousVoteType === '-1'
                ? author.score + 2
                : author.score + 1
            votedAnswer.voters = { ...votedAnswer.voters, [req.id]: type }
            message = 'El usuario votó arriba'
        }

        else if (type === '0') {

            if (!previousVoteType) {
                return res.status(404).json({ message: 'Voto no puede ser borrado porque no existe' })
            }

            votedAnswer.score = previousVoteType === '1'
                ? votedAnswer.score - 1 //si voto arriba entonces resto un punto
                : votedAnswer.score + 1 //si voto abajo entonces sumo un punto
            author.score = previousVoteType === '1'
                ? author.score - 1
                : author.score + 1
            const voters = votedAnswer.voters
            delete voters[req.id]
            votedAnswer.voters = voters
            votedAnswer.markModified('voters') //porque si voters es un obj vacio, no lo guarda
            message = 'El usuario borró su voto'
        }

        else if (type === '-1') {
            votedAnswer.score = previousVoteType === '1'
                ? votedAnswer.score - 2 //si voto arriba anteriormente, entonces resto dos puntos
                : votedAnswer.score - 1 //si no voto entonces resto un punto
            author.score = previousVoteType === '1'
                ? author.score - 2
                : author.score - 1
            votedAnswer.voters = { ...votedAnswer.voters, [req.id]: type }
            message = 'El usuario votó abajo'
        }

        else {
            return res.status(400).json({ message: 'Tipo de voto inválido' })
        }

        await votedAnswer.save()
        await author.save() //actualizo la puntuacion de autor de la respuesta
        res.json({ message })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    createAnswer,
    editAnswer,
    getAnswersFromPost,
    getAnswersFromUser,
    voteAnswer
}