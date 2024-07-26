const express = require('express')
const router = express.Router();

// const verifyToken = require('../middlewares/auth');
// const loginController = require('../controllers/LoginConroller');
// const registerController = require('../controllers/RegisterController');
const productController = require('../controllers/ProductController');

// const { validateLogin, validateRegister } = require('../validators/auth');
const { validateProduct } = require('../validators/product');

// router.post('/login', validateLogin, loginController.login);
// router.post('/register', validateRegister, registerController.register);

router.get('/products', productController.findProducts);
router.post('/products', validateProduct, productController.createProduct);
router.get('/products/:id', productController.findProductById);
router.put('/products/:id', validateProduct, productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router