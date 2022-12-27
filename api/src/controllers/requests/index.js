const Request = require('../../models/Request')
const User = require('../../models/User')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-handlebars');
const path = require('path')

const createRegisterRequest = async (req, res) => {
    const { rol } = req.body
    try {
        const duplicated = await Request.findOne({ user: req.id })
        if (duplicated) return res.status(409).json({ message: `Usuario ${req.id} ya tiene un pedido pendiente!` })

        const newRequest = await Request.create({ type: 'Registro', rol, user: req.id })
        res.json({ message: 'Pedido creado!', request: newRequest })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createRolRequest = async (req, res) => {
    const { rol } = req.body
    try {
        const duplicated = await Request.findOne({ user: req.id })
        if (duplicated) return res.status(409).json({ message: `Usuario ${req.id} ya tiene un pedido pendiente!` })

        const newRequest = await Request.create({ type: 'Rol', rol, user: req.id })
        res.json({ message: 'Pedido creado!', request: newRequest })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const completeRegisterRequest = async (req, res) => {
    const { rid, approve, reason } = req.body
    try {
        const request = await Request.findById(rid)
        if (!request) return res.status(404).json({ message: 'Pedido no existe o ya fue completado' })
        const user = await User.findById(request.user)
        let response = ''

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 456,
            secure: true,
            auth: {
                user: "henryask.soporte@gmail.com",
                pass: process.env.AUTH_PASSWORD,
            },
            from: "henryask.soporte@gmail.com"
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./src/mails/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./src/mails/'),
            extName: ".handlebars",
        }));

        let mailOptions = {
            from: '"Henry Ask" <henryask.support@gmail.com>',
            to: `${user.mail}`,
            subject: "Verificacion de cuenta",
            text: `Verificacion de cuenta`,
        };

        if (!approve) {
            mailOptions.template = 'registerR'
            mailOptions.context = { reason }
            response = { message: 'Peticion rechazada!' }
        }

        else {
            mailOptions.template = 'registerA'
            const updatedUser = await User.findByIdAndUpdate(request.user, { rol: request.rol, status: 'Aprobado' }, { new: true })
            response = { message: 'Usuario aprobado!', user: updatedUser }
        }


        transporter.sendMail(mailOptions, async function (e) {
            if (e) return res.status(500).json({ messsage: e.message });
            else {
                await request.remove()
                return res.json(response)
            }
        });

    } catch (error) {
        res.json({ message: error.message })
    }
}

const completeRolRequest = async (req, res) => {
    const { rid, approve, reason } = req.body
    try {
        const request = await Request.findById(rid)
        if (!request) return res.status(404).json({ message: 'Pedido no existe o ya fue completado' })
        const user = await User.findById(request.user)
        let response = ''

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 456,
            secure: true,
            auth: {
                user: "henryask.soporte@gmail.com",
                pass: process.env.AUTH_PASSWORD,
            },
            from: "henryask.soporte@gmail.com"
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./src/mails/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./src/mails/'),
            extName: ".handlebars",
        }));

        let mailOptions = {
            from: '"Henry Ask" <henryask.support@gmail.com>',
            to: `${user.mail}`,
            subject: "Cambio de rol",
            text: `Cambio de rol`,
        };

        if (!approve) {
            mailOptions.template = 'rolR'
            mailOptions.context = { reason }
            response = { message: 'Peticion rechazada!' }
        }

        else {
            mailOptions.template = 'rolA'
            mailOptions.context = { rol: request.rol }
            const updatedUser = await User.findByIdAndUpdate(request.user, { rol: request.rol }, { new: true })
            response = { message: 'Rol cambiado!', user: updatedUser }
        }

        transporter.sendMail(mailOptions, async function (e) {
            if (e) return res.status(500).json({ messsage: e.message });
            else {
                await request.remove()
                return res.json(response)
            }
        });

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
        const requests = await Request.find()
            .sort({ createdAt: 1 })
            .skip(page * 10 - 10)
            .limit(10)
            .populate('user', { mail: 1, userSlack: 1, rol: 1 })
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