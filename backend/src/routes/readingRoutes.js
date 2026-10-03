const express = require('express');
const router = express.Router();
const controller = require('../controllers/readingController');
const { validateReading } = require('../middleware/validateReading');

router.post('/readings', validateReading, controller.createReading);
router.get('/readings/latest', controller.getLatest);
router.get('/readings', controller.getHistory);
router.get('/device/status', controller.getDeviceStatus);

module.exports = router;