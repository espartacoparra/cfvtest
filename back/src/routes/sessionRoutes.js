const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

//session--------------------------------------


router.post('/sigin', LoginController.sigin);
router.post('/login', LoginController.login);
router.post('/loadsession', LoginController.loadSession);
router.get('/logout', LoginController.logOut);
//router.post('/loguot', LoginController.loguot);

module.exports = router;