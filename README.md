# Environmental Monitoring System

Full-stack IoT system that measures **temperature**, **humidity**, and **air quality** using an ESP32, DHT11, and MQ-135 sensor, and displays live data on a React dashboard.

## Architecture

```
DHT11 + MQ-135 → ESP32 → Wi-Fi → Node.js API → PostgreSQL → React Dashboard → User
```

During development, a Node.js simulator replaces the ESP32 so the full software stack can be tested end-to-end without hardware.

## Technologies

| Layer | Technology |
|-------|-----------|
| IoT Controller | ESP32 (Arduino IDE) |
| Sensors | DHT11 (temp + humidity), MQ-135 (air quality) |
| Frontend | React.js, axios, Recharts |
| Backend | Node.js, Express.js, express-validator |
| Database | PostgreSQL |
| Communication | REST API over HTTP/JSON |
| Configuration | dotenv (.env) |

## Project Structure

```
environment-monitoring-system/
├── backend/                Node.js REST API
│   ├── src/
│   │   ├── config/         Database connection
│   │   ├── controllers/    Request handlers
│   │   ├── middleware/     Validation + error handling
│   │   ├── routes/         API endpoint definitions
│   │   ├── services/       Business logic / DB queries
│   │   └── server.js       Entry point
│   ├── .env                (never committed)
│   ├── .env.example        (template)
│   └── package.json
├── frontend/               React dashboard
│   ├── src/
│   │   ├── components/     SensorCard, StatusBadge, HistoryChart, RecentReadings
│   │   ├── pages/          Dashboard
│   │   └── services/       api.js, classify.js
│   └── package.json
├── firmware/
│   └── esp32_environment_monitor/
│       └── esp32_environment_monitor.ino
├── sensor-simulator/
│   └── sensorSimulator.js
├── database/
│   └── schema.sql
└── README.md
```

## Database Setup

Open psql and run:

```sql
CREATE DATABASE environment_monitor;
\c environment_monitor
\i 'C:/path/to/database/schema.sql'
```

The `schema.sql` file creates the `environmental_readings` table:

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Auto-increment ID |
| device_id | VARCHAR(50) | Device identifier (e.g., ENV-001) |
| temperature | DECIMAL(5,2) | °C |
| humidity | DECIMAL(5,2) | % |
| air_quality | DECIMAL(7,2) | Raw analog value |
| created_at | TIMESTAMP | Auto-generated on insert |

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
# Edit .env with your PostgreSQL credentials
npm run dev
```

Server runs on `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Dashboard opens at `http://localhost:3000`.

## Sensor Simulator (Weekend Testing)

```bash
cd sensor-simulator
node sensorSimulator.js
```

Sends a new random reading every 5 seconds to `POST /api/readings`.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/readings` | Submit a new reading |
| GET | `/api/readings/latest` | Latest measurement |
| GET | `/api/readings?limit=50` | Historical measurements |
| GET | `/api/device/status` | ONLINE / OFFLINE status |
| GET | `/health` | Health check |

### POST /api/readings — Example Body

```json
{
  "deviceId": "ENV-001",
  "temperature": 27.5,
  "humidity": 64,
  "airQuality": 420
}
```

### Validation Rules

- `deviceId`: non-empty string, max 50 chars
- `temperature`: -50 to 100 °C
- `humidity`: 0 to 100 %
- `airQuality`: 0 to 10000 (raw analog value)

Invalid data returns HTTP 400 with detailed errors. The reading is NOT saved.

## Air Quality Classification (MQ-135 Note)

The MQ-135 raw analog value is **not** a calibrated ppm reading. Accurate ppm estimation requires calibration in a controlled environment. For this project, raw values are classified into application-defined levels:

| Raw Value | Label | Meaning |
|-----------|-------|---------|
| < 300 | GOOD | Clean air |
| 300–500 | MODERATE | Acceptable |
| ≥ 500 | POOR | Elevated pollutants |

## Device Status Logic

The backend marks the device as **ONLINE** if the latest reading arrived within `DEVICE_OFFLINE_THRESHOLD_SECONDS` (default 120s). Otherwise **OFFLINE**.

## Environment Variables

See `backend/.env.example`. Required:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=environment_monitor
DB_USER=postgres
DB_PASSWORD=your_password
DEVICE_OFFLINE_THRESHOLD_SECONDS=120
```

## ESP32 Integration (Monday)

The ESP32 firmware posts the same JSON payload to the same endpoint as the simulator. **No backend or frontend changes are needed** when switching from simulator to real hardware.

### Steps

1. Open `firmware/esp32_environment_monitor/esp32_environment_monitor.ino` in Arduino IDE
2. Set `WIFI_SSID`, `WIFI_PASSWORD`, and `API_URL` (use your PC's LAN IP, e.g. `http://192.168.1.100:5000/api/readings`)
3. Wire sensors per the diagram in the sketch
4. Flash to ESP32
5. Stop `sensorSimulator.js`
6. Verify dashboard updates from real hardware

### ESP32 Error Recovery

The firmware handles:
- Wi-Fi disconnection (auto-reconnect)
- Failed sensor reads (skip cycle, retry)
- Backend unreachable (retry with backoff)
- Failed HTTP requests (log, continue)

## Success Criterion

```
Sensor → Embedded Device → Network → API → Backend → Database → Frontend → User
```

All parts communicate as one complete system.

## Author

[Your Name] — [Date]