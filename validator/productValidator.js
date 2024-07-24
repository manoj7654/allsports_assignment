const { body } = require('express-validator');

const productValidation = [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('price').notEmpty().withMessage('Price is required').isDecimal().withMessage('Price must be a decimal number'),
  body('categoryId').notEmpty().withMessage('Category ID is required').isInt().withMessage('Category ID must be an integer'),
];

module.exports = { productValidation };
