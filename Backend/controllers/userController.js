const bcrypt = require('bcryptjs');
const db = require('../models');
const tokenServices = require('../services/token');
const mailService = require('../services/EmailRecover');
const { Op } = require('sequelize');

exports.create = async (req, res, next) => {
    try {
        const user = await db.user.findOne({ where: { email: req.body.email } });
        if (user) {

            res.status(409).send({
                error: 'El correo electrónico ya se encuentra en uso.'
            })
        }
        else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            if (
                req.body.role == "admin" ||
                req.body.role == "client"
            ) {
                const user = await db.user.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    address: req.body.address,
                    department: req.body.department,
                    city: req.body.city,
                    role: req.body.role,
                    state: req.body.state,
                    confirmed: req.body.confirmed
                });

                res.status(200).send({
                    message: 'Usuario creado con éxito.'
                });
            }
            else {

                res.status(200).send({
                    error: 'Rol no permitido'
                })
            }
        }
    } catch (error) {
        res.status(200).send({
            error: error
        })
        next(error);
    }
}; 

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        console.log('Error en la autenticación: El email está vacío');
        return res.status(200).json({
            error: 'El email es requerido.'
        });
    }

    if (!password) {
        console.log('Error en la autenticación: La contraseña está vacía.');
        return res.status(200).json({
            error: 'La contraseña es requerida.'
        });
    }

    try {
        const user = await db.user.findOne({ where: { email: email } });
        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                const token = await tokenServices.encode(user);

                return res.status(200).send({
                    message: 'Bienvenido',
                    token: token,
                    user: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        department: user.department,
                        city: user.city,
                        role: user.role,
                        state: user.state,
                        confirmed: user.confirmed,
                        image_url: user.image_url
                    }
                });
            } else {
                console.log('Error en la autenticación: Contraseña incorrecta.');
                return res.status(200).json({
                    message: 'Contraseña incorrecta'
                });
            }
        } else {
            console.log('Error en la autenticación: Usuario no encontrado.');
            return res.status(200).json({
                message: 'Email no encontrado.'
            });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(200).send({
            error: '¡Error en el servidor!',
            message: error.message || 'Error interno en el servidor.'
        });
    }
};


exports.list = async (req, res, next) => {
    try {
        // Obtén los parámetros de paginación de la consulta
        const page = parseInt(req.query.page) || 1; // Página actual (por defecto es la página 1)
        const limit = parseInt(req.query.limit) || 10; // Número de elementos por página (por defecto es 10)
        const search = req.query.search || ''; // Término de búsqueda

        // Calcula el offset basado en la página actual
        const offset = (page - 1) * limit;

        // Realiza la consulta con paginación y búsqueda
        const userss = await db.user.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            }
        });

        // Envia la respuesta con los datos paginados
        res.status(200).json({
            rows: userss.rows,
            total: userss.count
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: '¡Error en el servidor!' });
    }
};