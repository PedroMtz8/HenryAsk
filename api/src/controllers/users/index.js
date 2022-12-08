const User = require('../../models/User')

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
        const user = await User.findById(req.id)
        res.json({ status: user.status })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const approveUser = async (req, res) => {
    const { mail } = req.body
    if (!mail) return res.status(400).json({ message: 'Mail requerido.' })

    const user = await User.findOneAndUpdate({ mail }, { status: 'approved' }, { new: true })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado!' })

    return res.json({ message: 'Usuario aprobado!', user })
}

const getUserById = async (req, res) => {
    const foundUser = await User.findById(req.id)
    res.json(foundUser)
}
module.exports = {
    registerUser,
    approveUser,
    checkStatusUser,
    getUserById
}