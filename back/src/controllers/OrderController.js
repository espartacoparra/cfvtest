const Models = require("../models/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class CartController {
  async index(req, res) { }

  async getCart(req, res) {
    var user = req.headers;
    try {
      const Val = await Models.Order.findOne({
        where: { user_id: user.user_id, status: 'cart' },
        include: [{ model: Models.Item, include: { model: Models.Product, include: [{ model: Models.Image }, { model: Models.Size }] } }]
      });
      if (Val == null) {
        res.json('empy');
      } else {
        res.json(Val);
      }

    } catch (error) { }

  }

  async getOrder(req, res) {
    var user = req.headers;
    try {
      const Val = await Models.Order.findOne({
        where: { user_id: user.user_id, status: 'order' },
        include: [{ model: Models.Item, include: { model: Models.Product, include: [{ model: Models.Image }, { model: Models.Size }] } }]
      });
      if (Val == null) {
        res.json('empy');
      } else {
        res.json(Val);
      }

    } catch (error) { }

  }

  async create(req, res) {
    var user = req.headers;
    var data = req.body;
    //return res.json(data);
    var query = {
      user_id: user.user_id,
      quantity: data.request.quantity,
      status: "cart",
      img: null,
      total: 0
    };
    try {
      var Val = await Models.Order.findOne({
        where: { user_id: user.user_id, status: 'cart' },
        include: { model: Models.Item }
      });

      if (Val == null) {
        const Order = await Models.Order.create(query);
        var Val = await Models.Order.findOne({
          where: { user_id: user.user_id, status: 'cart' },
          include: { model: Models.Item }
        });
      }

      const Product = await Models.Product.findOne({
        where: { id: data.product.id }
      });
      var validateSize = Val.items.filter(item => {
        if (item.product_id == data.product.id && item.size_id == data.request.size) {
          return item;
        }
      });
      if (validateSize.length == 0) {
        const Item = await Models.Item.create({
          id: "",
          order_id: Val.id,
          product_id: data.product.id,
          quantity: data.request.quantity,
          size_id: data.request.size,
          price: Product.price
        });
        return res.json('01');
      }
      return res.json('02');
    } catch (error) {
      res.json("error");
    }
  }

  async update(req, res) {
    var data = req.body;
    console.log(data);
    try {
    } catch (error) {
      res.json(error);
    }
  }
  async delete(req, res) {
    var data = req.body;

    try {
      const item = await Models.Item.destroy({ where: { id: data.id } });
      return res.json('ok');
    } catch (error) {
      return res.json('error');
    }
  }

  async loadOrder(req, res) {
    var data = req.body;
    try {
      const deleteItem = await Models.Item.destroy({ where: { order_id: data[0].order_id } });
      var prices = await getPrices(data);
      var total = 0;
      for (let index = 0; index < data.length; index++) {
        total += prices[index].price * data[index].quantity;
        data[index].price = prices[index].price;
      }
      updateSizes(data);
      const Item = await Models.Item.bulkCreate(data);
      const Order = await Models.Order.update({ status: "order", total: total }, { where: { id: data[0].order_id } });
      return res.json('ok');
    } catch (error) {
      return res.json('error');
    }
  }



  async getSize(req, res) {
    const Size = await Models.Size.findAll();
    res.json(Size);
  }
}

//functions

async function getPrices(data) {
  var Product = [];
  for (let index = 0; index < data.length; index++) {
    var p = await Models.Product.findOne({ where: { id: data[index].product.id } });
    data[index].price
    Product.push(p);
  }
  return Product;
}

async function updateSizes(data) {
  for (let index = 0; index < data.length; index++) {
    var Size = await Models.Products_Size.findOne({ where: { product_id: data[index].product.id, size_id: data[index].size_id } });
    console.log(Size.quantity);
    var quantity = Size.quantity - data[index].quantity;
    Size = { product_id: data[index].product.id, size_id: data[index].size_id, quantity: quantity };
    var sizeUpdate = await Models.Products_Size.update(Size, { where: { product_id: data[index].product.id, size_id: data[index].size_id } });
    console.log(sizeUpdate);
  }
}
module.exports = new CartController();
