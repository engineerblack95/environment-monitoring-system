const { body } = require('express-validator');

const validateReading = [
  body('deviceId')
    .isString().withMessage('deviceId must be a string')
    .notEmpty().withMessage('deviceId is required')
    .isLength({ max: 50 }),
  body('temperature')
    .isFloat({ min: -50, max: 100 })
    .withMessage('temperature must be between -50 and 100'),
  body('humidity')
    .isFloat({ min: 0, max: 100 })
    .withMessage('humidity must be between 0 and 100'),
  body('airQuality')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('airQuality must be between 0 and 10000'),
];

module.exports = { validateReading };