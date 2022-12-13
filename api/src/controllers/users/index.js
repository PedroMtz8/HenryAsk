const User = require('../../models/User')
const admin = require('../../firebase/index')

const registerUser = async (req, res) => {
    const { uid, mail, userSlack, country } = req.body
    if (!mail || !userSlack || !country) return res.status(400).json({ message: 'Mail, usuario de Slack, modulo y pais requeridos.' })

    const duplicated = await User.findOne({ mail })
    if (duplicated) return res.status(409).json({ message: `${mail} ya está registrado` })

    try {
        const newUser = await User.create({ _id: uid, mail, userSlack, country })
        return res.json({ message: `El usuario ${userSlack} está pendiente a ser verificado!`, user: newUser })
    } catch (error) {
        return res.json({ message: error.message })
    }
}

const registerAdmin = async (req, res) => {
    const { mail, password, userSlack, country } = req.body
    if (!mail || !userSlack || !country) return res.status(400).json({ message: 'Mail, usuario de Slack, modulo y pais requeridos.' })

    const duplicated = await User.findOne({ mail })
    if (duplicated) return res.status(409).json({ message: `${mail} ya está registrado` })

    const user = await admin.auth().createUser({
        email: mail,
        emailVerified: true,
        password: password,
    })

    try {
        const newAdmin = await User.create({ _id: user.uid, mail, userSlack, country, rol: 'Administrador', status: 'approved' })
        return res.json({ message: `El administrador ${userSlack} ha sido creado!`, user: newAdmin })
    } catch (error) {
        return res.json({ message: error.message })
    }
}

const checkStatusUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)
        if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado!' })
        res.json({ status: foundUser.status })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)
        if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado!' })

        res.json({ message: 'Usuario encontrado!', user: foundUser })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getUsers = async (req, res) => {
    const { page, mail } = req.query
    if (!page) return res.status(400).json({ message: 'Numero de pagina requerido.' })

    try {

        const numberOfDocs = await User.countDocuments()
        const maxPages = Math.ceil(numberOfDocs / 10)

        if (mail) {
            var foundUsers = await User.findOne({ mail: new RegExp(mail.trim()) }).skip(page * 10 - 10).limit(10).select({ _id: 0, mail: 1, userSlack: 1, status: 1, rol: 1 })
        } else {
            foundUsers = await User.
                find().
                skip(page * 10 - 10).
                limit(10).
                sort({ mail: 1 }).
                select({ _id: 0, mail: 1, userSlack: 1, status: 1, rol: 1 })
        }

        res.json({ message: 'Usuarios encontrados!', foundUsers, maxPages })
    } catch (error) {
        res.json({ message: error.message })
    }
}



module.exports = {
    registerUser,
    registerAdmin,
    checkStatusUser,
    getUserById,
    getUsers
}