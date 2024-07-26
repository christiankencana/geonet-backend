const { body } = require('express-validator');
const prisma = require('../prisma/client');

const validateProduct = [
    body('name').isLength({ min: 5 }).notEmpty().withMessage('Name is required'),
    body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('price').isLength({ min: 5 }).withMessage('Harga harus lebih dari 5 digit'),
    body('stock').isLength({ min: 1 }).withMessage('Stok harus lebih dari 0'),
];

module.exports = { validateProduct }