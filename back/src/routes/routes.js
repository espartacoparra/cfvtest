const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const LoginController = require("../controllers/LoginController");
const ImageController = require("../controllers/ImageController");
const OrderController = require("../controllers/OrderController");
router.get("/index", UserController.index);
router.post("/create", UserController.create);

//session--------------------------------------

router.post("/sigin", LoginController.sigin);

router.post("/login", LoginController.login);
router.post("/loadsession", LoginController.loadSession);
router.post("/logout", LoginController.logOut);
//router.post('/loguot', LoginController.loguot);

//session End--------------------------------------

//crud products--------------------------------------

router.get("/products", ProductController.index);
router.get("/product/:id", ProductController.getOne);
router.post("/products/create", ProductController.create);
router.post("/products/update", ProductController.update);
router.post("/products/delete", ProductController.delete);

router.get("/products/populars", ProductController.populars);

//crud products End--------------------------------------

//crud productsGalery--------------------------------------

router.get("/products/galery/:id", ImageController.index);
router.post("/products/galery/create", ImageController.create);
router.post("/products/galery/update", ImageController.update);
router.post("/products/galery/delete", ImageController.delete);

//crud productsGalery End--------------------------------------

//crud category--------------------------------------

router.get("/category", CategoryController.index);
router.post("/category/create", CategoryController.create);
router.post("/category/update", CategoryController.update);
//router.post('/products/create', ProductController.create);

//crud category End--------------------------------------

//methods size--------------------------------------

router.get("/sizes", CategoryController.getSize);
//methods size End--------------------------------------

//methods front--------------------------------------

//methods product related--------------------------------------
router.get("/products/populars", ProductController.populars);
router.get("/products/oferts", ProductController.getOferts);
router.post("/product/related", ProductController.getRelated);
router.post("/product/for/category", ProductController.getAllForCategories);
//methods  product related End--------------------------------------

//methods categories
router.get("/categories/all", CategoryController.getAllCategories);
//methods categories end

//Orders operations
router.get("/cart", OrderController.getCart);
router.post("/cart/add", OrderController.create);
router.post("/cart/delete", OrderController.delete);
router.get("/order", OrderController.getOrder);
router.post("/order/load", OrderController.loadOrder);
router.post("/order/pay", OrderController.payOrder);
router.post("/order/delete", OrderController.deleteOrder);
//Orders operations end
//methods front End--------------------------------------
module.exports = router;
