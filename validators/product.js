const { body } = require('express-validator');
const prisma = require('../prisma/client');

const validateProduct = [
    body('name').isLength({ min: 5 }).notEmpty().withMessage('Name is required'),
    body('description').isLength({ min: 7 }).withMessage('Description must be at least 10 characters'),
    body('price').isLength({ min: 3 }).withMessage('Harga harus lebih dari 3 digit'),
    body('stock').isLength({ min: 1 }).withMessage('Stok harus lebih dari 0'),
];

module.exports = { validateProduct }