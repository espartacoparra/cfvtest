const Models = require("../models/models");
const fs = require("fs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const enviroment = require("../config/enviroment");
const imgPath = "./public/images/";
class ProductController {
  async index(req, res) {
    try {
      const products = await Models.Product.findAll({
        include: [
          { model: Models.Category },
          { model: Models.Image },
          { model: Models.Size }
        ]
      });
      res.json(products);
    } catch (error) {
      res.json();
    }
  }

  async getOne(req, res) {
    var id = req.params.id;
    try {
      const products = await Models.Product.findOne({
        where: { id: id },
        include: [
          { model: Models.Category },
          { model: Models.Size },
          { model: Models.Image }
        ]
      });
      res.json(products);
    } catch (error) {
      res.json();
    }
  }

 

  async create(req, res) {
    var data = req.body;
    //return res.json(data);
    try {
      const Product = await Models.Product.create({
        user_id: data.user_id,
        name: data.name,
        price: data.price,
        description: data.description,
        quantity: data.quantity
      });
      data.product_id = Product.id;
      var cat = data.categories.map(cat => {
        return { category_id: cat, product_id: Product.id };
      });
      var sizes = data.size.map(data => {
        return {
          product_id: Product.id,
          size_id: data.sizeId,
          quantity: data.quantity
        };
      });
      var images = await createImage(data);
      const result = Promise.all([
        Models.Categories_Products.bulkCreate(cat),
        Models.Products_Size.bulkCreate(sizes),
        Models.Image.bulkCreate(images)
      ]);
      res.json("ok");
    } catch (error) {
      res.json(error);
    }
  }
  async update(req, res) {
    var data = req.body;
    //res.json(data);
    try {
      const ciclo1 = Promise.all([
        Models.Product.update(data, { where: { id: data.id } }),
        Models.Categories_Products.destroy({ where: { product_id: data.id } }),
        Models.Products_Size.destroy({ where: { product_id: data.id } })
      ]);

      var cat = data.categories.map(cat => {
        return { category_id: cat, product_id: data.id };
      });
      var siz = data.size.map(siz => {
        return {
          size_id: siz.sizeId,
          product_id: data.id,
          quantity: siz.quantity
        };
      });
      const ciclo2 = Promise.all([
        Models.Categories_Products.bulkCreate(cat),
        Models.Products_Size.bulkCreate(siz)
      ]);
      res.json("ok");
    } catch (error) {
      res.json(error);
    }
  }
  async delete(req, res) {
    var data = req.body;
    try {
      const product = await Models.Product.destroy({ where: { id: data.id } });
      data.images.map(image => {
        var target_path = "./public/images/" + image.name;
        fs.unlink(target_path, err => {
          if (err) throw err;
          console.log("image was deleted");
        });
      });

      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }

  //methods front
  async populars(req, res) {
    try {
      const products = await Models.Product.findAll({
        include: [
        { model: Models.Category },
        { model: Models.Image },
        { model: Models.Size }]
      });
      res.json(products);
    } catch (error) {
      res.json();
    }
  }

  async getOferts(req, res) {
    try {
      const products = await Models.Product.findAll({
        include: [
          { model: Models.Category, where: { category: 'Ofertas' } },
          { model: Models.Size },
          { model: Models.Image }
        ]
      });
      res.json(products);
    } catch (error) {
      res.json();
    }
  }

  async getRelated(req, res) {
    var data = req.body;

    try {
      const Product = await Models.Product.findAll({
        include: [
          { model: Models.Category, where: { id: 1 } },
          { model: Models.Size },
          { model: Models.Category },
          { model: Models.Image }
        ]
      });
      res.json(Product);
    } catch (error) { }
  }

  //public methods
  async getAllForCategories(req, res) {
    var data = req.body;
    //res.json(data.query);
    try {
      var cat = await Models.Category.findAll();
      cat = cat.map(cat => {
        return { id: cat.id };
      });
      var siz = await Models.Size.findAll();
      siz = siz.map(siz => {
        return { id: siz.id };
      });
      //res.json(siz);
      if (data.query == "0") {
        const Product = await Models.Product.findAll({
          include: [
            { model: Models.Category, where: { [Op.or]: cat } },
            { model: Models.Size, where: { [Op.or]: siz } },
            { model: Models.Image }
          ]
        });
        res.json(Product);
      } else {
        var c = "";
        var s = "";
        if (data.categories.length == 0) {
          c = cat;
        } else {
          c = data.categories;
        }
        if (data.sizes.length == 0) {
          s = siz;
        } else {
          s = data.sizes;
        }
        //res.json(data);
        const Product = await Models.Product.findAll({
          include: [
            { model: Models.Category, where: { [Op.or]: c } },
            { model: Models.Size, where: { [Op.or]: s } },
            { model: Models.Image }
          ]
        });
        res.json(Product);
      }
    } catch (error) {
      res.json(error);
    }
  }
}

//funciones no enrrutadas
async function createImage(data) {
  var images = data.image.map(image => {
    var date = new Date();
    var name =
      date +
      Math.random()
        .toString(36)
        .substring(7) +
      ".png";
    var target_path = imgPath + name;
    var buff = Buffer.from(image, "base64");
    fs.writeFile(target_path, buff, err => {
      if (err) throw err;
      console.log("The binary data has been decoded and saved to my-file.png");
    });
    return {
      product_id: data.product_id,
      name: name,
      url: enviroment.images_path + name
    };
  });
  return images;
}

module.exports = new ProductController();