const Answer = require('../../models/Answer')

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
        .select({ user: 0 })

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

module.exports = {
    createAnswer,
    editAnswer,
    getAnswersFromPost,
    getAnswersFromUser
}