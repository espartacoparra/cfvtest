const Models = require('../models/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class CategoryController {
    async index(req, res) {
        const categories = await Models.Category.findAll();
        res.json(categories);

    }
    async create(req, res) {
        var date = req.body;
        try {
            const Category = await Models.Category.create(date);
            res.json('ok');
        } catch (error) {
            res.json(error);
        }
    }
    async update(req, res) {
        var data = req.body;
        console.log(data);
        try {
            const Category = await Models.Category.update(data, { where: { id: data.id } });
            res.json('ok');
        } catch (error) {
            res.json(error);
        }
    }
    async delete(req, res) {

    }

    async getSize(req, res) {
        const Size = await Models.Size.findAll();
        res.json(Size);
    }

    //public methods
    async getAllCategories(req, res) {
        try {
            const Categories = await Models.Category.findAll({ include: { model: Models.Category, where: { [Op.or]: [{ id: 1 }] } } });
            res.json(Categories);
        } catch (error) {
            res.json(error);
        }
    };

}

module.exports = new CategoryController();