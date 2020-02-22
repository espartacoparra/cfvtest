
const Models = require('../models/models');
const fs = require('fs');
const imgPath = './public/images/';
const enviroment = require('../config/enviroment');
class ImageController {

    async index(req, res) {
        var id = req.params.id;
        try {
            const products = await Models.Product.findOne({ where: { id: id }, include: { model: Models.Image } });
            res.json(products);
        } catch (error) {
            res.json()
        }

    }
    async create(req, res) {
        var data = req.body;
        try {
            var images = await createImage(data);
            const Image = await Models.Image.bulkCreate(images);
            res.json("ok");
        } catch (error) {
            res.json(error);
        }
    }
    async update(req, res) {
        var data = req.body;
        try {
            var target_path = imgPath + data.old.name;
            fs.unlink(target_path, (err) => {
                if (err) throw err;
                console.log('image was deleted');
            });
            var images = await createImage(data);
            const Image = await Models.Image.update(images[0], { where: { id: data.old.id } });
            res.json(Image);
        } catch (error) {
            res.json(error);
        }
    }
    async delete(req, res) {
        var data = req.body;
        try {
            const Image = await deleteImage(data);
            res.json(Image);
        } catch (error) {
            res.json(error);
        }
    }
}
//funciones no enrrutadas
async function createImage(data) {
    var images = data.image.map(image => {
        var date = new Date();
        var name = date + Math.random().toString(36).substring(7) + '.png';
        var target_path = imgPath + name;
        var buff = Buffer.from(image, 'base64');
        fs.writeFile(target_path, buff, (err) => {
            if (err) throw err;
            console.log('The binary data has been decoded and saved to my-file.png');
        });
        return { product_id: data.product_id, name: name, url: enviroment.images_path + name };
    });
    return images;
}
async function deleteImage(data) {
    try {
        const Image = await Models.Image.destroy({ where: { id: data.id } });
        var target_path = imgPath + data.name;
        fs.unlink(target_path, (err) => {
            if (err){
                console.log('error');
            }
            else{
                console.log('image was deleted');
            }
        });
        return Image;
    } catch (error) {
        return 'error';
    }
   
}

module.exports = new ImageController();