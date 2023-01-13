const Request = require('../../models/Request')
const User = require('../../models/User')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-handlebars');
const path = require('path')

function checkFields(fields) {
    for (const field in fields) {
        const value = fields[field]
        switch (field) {
            case 'rol':
                if(!value) return;
                const roles = ['Administrador', 'Estudiante', 'Graduado', 'TA', 'Henry Hero']
                if(!roles.includes(value)) return 'Rol invalido'
                break;
            case 'approve':
                if(value !== true && value !== false) return 'approve debe ser true o false'
                break;
            case 'type':
                if(value && value !== 'Rol' && value !== 'Registro') return 'Tipo de pedido invalido.'
            case 'page':
                if(!value) return 'Numero de pagina requerido'
                if (value <= 0) return 'Pagina no puede ser menor o igual a 0'
                break;
            case 'rid':
                if(!value) return 'Id de request requerido'
            default:
                break;
        }
    }
    return ''
}

const createRegisterRequest = async (req, res) => {
    const { rol } = req.body
    const message = checkFields({ rol })
    if (message) return res.status(400).json({ message })
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
    const message = checkFields({ rol })
    if (message) return res.status(400).json({ message })
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
    const message = checkFields({ rid, approve })
    if (message) return res.status(400).json({ message })
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
            if(!reason) return res.status(400).json({message: 'Debe incluir una razon'})
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
    const message = checkFields({ rid, approve })
    if (message) return res.status(400).json({ message })
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
            if(!reason) return res.status(400).json({message: 'Debe incluir una razon'})
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
    const { page, type} = req.query
    const message = checkFields({ page })
    if (message) return res.status(400).json({ message })

    function buildQuery() {
        let query = ''

        if (type) {
            query = query
                ? query.find({ type })
                : Request.find({ type })
        }

        if(!query) query = Request.find()
        return query
    }
    //busqueda para obtener usuarios paginados
    const searchPaginatedRequests = buildQuery()
        .skip(page * 10 - 10)
        .limit(10)
        .sort({ createdAt: 1 })
        .populate('user', { mail: 1, userSlack: 1, rol: 1 })

    //busqueda para obtener numero maximo de pagina
    const searchAllRequests = buildQuery().select({ _id: 1 })

    //Ejecuto dos busquedas al mismo tiempo
    Promise.all([
        searchPaginatedRequests,
        searchAllRequests
    ]).then(([paginatedDocs, allDocs]) => {
        const maxPages = Math.ceil(allDocs.length / 10)
        res.json({ message: 'Pedidos encontrados!', requests: paginatedDocs, maxPages })
    }).catch(error => {
        res.json({ message: error.message })
    })
}

module.exports = {
    createRegisterRequest,
    createRolRequest,
    completeRegisterRequest,
    completeRolRequest,
    getRequests
}