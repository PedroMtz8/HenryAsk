const User = require('../../models/User')
const { checkUserWasFound } = require('./functions')

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

const checkStatusUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)
        checkUserWasFound(foundUser)
        res.json({ status: foundUser.status })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const approveUser = async (req, res) => {
    const { mail } = req.body
    if (!mail) return res.status(400).json({ message: 'Mail requerido.' })

    const user = await User.findOneAndUpdate({ mail }, { status: 'approved' }, { new: true })
    checkUserWasFound(user)

    return res.json({ message: 'Usuario aprobado!', user })
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)
        checkUserWasFound(foundUser)
        res.json(foundUser)
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    approveUser,
    checkStatusUser,
    getUserById
}