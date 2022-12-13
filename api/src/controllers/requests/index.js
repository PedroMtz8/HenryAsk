const Request = require('../../models/Request')
const User = require('../../models/User')

const createRegisterRequest = async (req, res) => {
    const { rol } = req.body
    try {
        const newRequest = await Request.create({ type: 'Registro', rol, user: req.id })
        res.json({ message: 'Pedido creado!', request: newRequest })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createRolRequest = async (req, res) => {
    const { rol } = req.body
    try {
        const newRequest = await Request.create({ type: 'Rol', rol, user: req.id })
        res.json({ message: 'Pedido creado!', request: newRequest })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const completeRegisterRequest = async (req, res) => {
    const { rid, uid, approve } = req.body
    try {
        const request = await Request.findById(rid)
        if (!request) return res.status(404).json({ message: 'Pedido no existe o ya fue completado' })
        await Request.findByIdAndDelete(rid)

        if (!approve) {
            return res.json({ message: 'Peticion rechazada!' })
        }

        else {
            const updatedUser = await User.findByIdAndUpdate(uid, { rol: request.rol, status: 'Aprobado' }, { new: true })
            res.json({ message: 'Usuario aprobado!', user: updatedUser })
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

const completeRolRequest = async (req, res) => {
    const { rid, uid, approve } = req.body
    try {
        const request = await Request.findById(rid)
        if (!request) return res.status(404).json({ message: 'Pedido no existe o ya fue completado' })
        await Request.findByIdAndDelete(rid)

        if (!approve) {
            return res.json({ message: 'Peticion rechazada!' })
        }

        else {
            const updatedUser = await User.findByIdAndUpdate(uid, { rol: request.rol }, { new: true })
            res.json({ message: 'Rol cambiado!', user: updatedUser })
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

const getRequests = async (req, res) => {
    const { page } = req.query
    if (!page) return res.status(400).json({ message: 'Numero de pagina requerido.' })

    try {
        const numberOfDocs = await Request.countDocuments()
        const maxPages = Math.ceil(numberOfDocs / 10)
        const requests = await Request.find().sort({ createdAt: 1 }).skip(page * 10 - 10).limit(10)
        //te devuelve las requests ordenadas de mas viejas a mas nuevas
        res.json({ message: 'Pedidos encontrados!', requests, maxPages })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    createRegisterRequest,
    createRolRequest,
    completeRegisterRequest,
    completeRolRequest,
    getRequests
}