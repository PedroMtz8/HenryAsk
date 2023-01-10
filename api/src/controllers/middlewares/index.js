const admin = require('../../firebase/index')
const User = require('../../models/User')

const verifyToken = async (req, res, next) => {
    const request = req.headers['authorization']
    const token = request?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'El token no fue encontrado!' })
    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        req.id = decodedToken.uid
        next()
    } catch (error) {
        return res.status(498).json({ message: error.message })
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const adminFound = await User.findById(req.id)
        if (!adminFound) return res.status(404).json({ message: 'Usuario no encontrado.' })

        if (adminFound.rol !== 'Administrador') {
            return res.status(401).json({ message: 'El usuario no es administrador!' })
        } else {
            next()
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    verifyToken,
    checkAdmin
}