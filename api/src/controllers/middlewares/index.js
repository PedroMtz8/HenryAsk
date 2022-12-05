const admin = require('../../firebase/index')

const verifyToken = async (req, res) => {
    const request = req.headers['authorization']
    const token = request?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'El token no fue encontrado!' })

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        req.uid = decodedToken.uid
        next()
    } catch (error) {
        return res.status(498).json({ message: 'El token no es valido!' })
    }
}

module.exports = {
    verifyToken
}