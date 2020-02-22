const Models = require('../models/models');
const Sequelize = require('sequelize');
const Code = require('../config/code');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Op = Sequelize.Op;
class LoginController {

    async loadSession(req, res) {
        var data = req.body;
        try {
            const validateUser = await Models.User.findOne({ where: { [Op.and]: [{ email: data.email }, { cedula: data.cedula }, { id: data.id }, { name: data.name }, { lastname: data.lastname }, { type: data.type }] }, include: [{ model: Models.Token, where: { token: data.tokens[0].token } }] });
            if (validateUser == null) {
                res.json(1);
            } else {
                res.json(validateUser);
            }
        } catch (error) {
            res.json(error);
        }

    }

    async sigin(req, res) {
        var data = req.body;
        try {
            const validateUser = await Models.User.findOne({ where: { [Op.or]: [{ email: data.email }, { cedula: data.cedula }] } });
            console.log(validateUser);
            if (validateUser != null) {
                res.json(1);
            } else {
                data.password = await bcrypt.hash(data.password, saltRounds);
                const createUser = await Models.User.create(data);
                var tk = jwt.sign({ foo: 'bar' }, Code.key);
                const Token = await Models.Token.create({ user_id: createUser.id, token: tk });
                const User = await Models.User.findOne({ where: { id: createUser.id }, include: { model: Models.Token } })
                res.json(User);
            }
        } catch (error) {
            res.json(error);
        }
    }
    async login(req, res) {
        var data = req.body;
        console.log(data);
        try {
            const validateUser = await Models.User.findOne({ where: { email: data.email } });
            if (validateUser != null) {
                const match = await bcrypt.compare(data.password, validateUser.password);
                if (match) {
                    var tk = jwt.sign({ foo: 'bar' }, Code.key);
                    const Token = await Models.Token.create({ user_id: validateUser.id, token: tk });
                    const User = await Models.User.findOne({ where: { id: validateUser.id }, include: { model: Models.Token, where: { id: Token.id } } })
                    res.json(User);
                } else {
                    res.json(1);
                }
            } else {
                res.json(1);
            }
        } catch (error) {
            res.json(error);
        }
    }
    async logOut(req, res) {
        var data = req.body;
        try {
            var tk = "" + req.headers.api_token;
            var uid = "" + req.headers.user_id;
            const delToken = await Models.Token.destroy({ where: { [Op.and]: [{ user_id: uid }, { token: tk }] } });
            res.json('ok');
        } catch (error) {
            res.json(error);
        }

    }
}

module.exports = new LoginController();