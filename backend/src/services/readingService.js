const pool = require('../config/db');

async function insertReading({ deviceId, temperature, humidity, airQuality }) {
  const query = `
    INSERT INTO environmental_readings 
      (device_id, temperature, humidity, air_quality)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [deviceId, temperature, humidity, airQuality];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getLatestReading() {
  const result = await pool.query(
    `SELECT * FROM environmental_readings 
     ORDER BY created_at DESC LIMIT 1`
  );
  return result.rows[0] || null;
}

async function getHistory(limit = 50) {
  const result = await pool.query(
    `SELECT * FROM environmental_readings 
     ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return result.rows;
}

async function getDeviceStatus(thresholdSeconds) {
  const result = await pool.query(
    `SELECT device_id, created_at 
     FROM environmental_readings 
     ORDER BY created_at DESC LIMIT 1`
  );
  
  if (result.rows.length === 0) {
    return { status: 'OFFLINE', lastSeen: null, deviceId: null };
  }
  
  const last = result.rows[0];
  const lastSeen = new Date(last.created_at);
  const now = new Date();
  const diffSeconds = (now - lastSeen) / 1000;
  
  return {
    status: diffSeconds <= thresholdSeconds ? 'ONLINE' : 'OFFLINE',
    lastSeen: last.created_at,
    deviceId: last.device_id,
    secondsSinceLastReading: Math.floor(diffSeconds),
  };
}

module.exports = {
  insertReading,
  getLatestReading,
  getHistory,
  getDeviceStatus,
};