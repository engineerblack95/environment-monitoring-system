const DEVICE_ID = 'ENV-001';
const API_URL = 'http://localhost:5000/api/readings';
const INTERVAL_MS = 5000;

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function generateReading() {
  return {
    deviceId: DEVICE_ID,
    temperature: randomBetween(22, 32),
    humidity: randomBetween(50, 75),
    airQuality: randomBetween(250, 650),
  };
}

async function sendReading() {
  const reading = generateReading();
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reading),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const saved = await response.json();
    console.log(
      `✅ [${new Date().toLocaleTimeString()}] ` +
      `T=${reading.temperature}°C  H=${reading.humidity}%  AQ=${reading.airQuality}  →  id=${saved.id}`
    );
  } catch (err) {
    console.error(`❌ Failed to send:`, err.message);
  }
}

console.log(`📡 Simulator starting — sending every ${INTERVAL_MS / 1000}s`);
console.log(`Target: ${API_URL}`);
console.log('Press Ctrl+C to stop.\n');

sendReading();
setInterval(sendReading, INTERVAL_MS);