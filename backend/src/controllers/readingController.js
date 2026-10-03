const { validationResult } = require('express-validator');
const readingService = require('../services/readingService');

async function createReading(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }

  try {
    const { deviceId, temperature, humidity, airQuality } = req.body;
    const reading = await readingService.insertReading({
      deviceId, temperature, humidity, airQuality,
    });
    res.status(201).json(reading);
  } catch (err) {
    next(err);
  }
}

async function getLatest(req, res, next) {
  try {
    const reading = await readingService.getLatestReading();
    if (!reading) {
      return res.status(404).json({ error: 'No readings found' });
    }
    res.json(reading);
  } catch (err) {
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 500);
    const readings = await readingService.getHistory(limit);
    res.json(readings);
  } catch (err) {
    next(err);
  }
}

async function getDeviceStatus(req, res, next) {
  try {
    const threshold = parseInt(process.env.DEVICE_OFFLINE_THRESHOLD_SECONDS) || 120;
    const status = await readingService.getDeviceStatus(threshold);
    res.json(status);
  } catch (err) {
    next(err);
  }
}

module.exports = { createReading, getLatest, getHistory, getDeviceStatus };