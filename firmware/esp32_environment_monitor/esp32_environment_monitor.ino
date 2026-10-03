/*
 * ESP32 Environmental Monitor
 * Reads DHT11 (temperature + humidity) and MQ-135 (air quality),
 * POSTs JSON to the Node.js backend every SEND_INTERVAL_MS.
 *
 * Board: ESP32 DevKit v1 (or any ESP32 with WiFi + ADC1 on GPIO 34)
 * Libraries: DHT sensor library (Adafruit), Adafruit Unified Sensor
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// ================== CONFIGURATION ==================
const char* WIFI_SSID     = "YOUR_WIFI_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Replace with your PC's LAN IP (run `ipconfig` on Windows)
// Example: http://192.168.1.100:5000/api/readings
const char* API_URL       = "http://192.168.1.100:5000/api/readings";

const char* DEVICE_ID     = "ENV-001";

const unsigned long SEND_INTERVAL_MS  = 10000;   // 10 seconds
const unsigned long WIFI_RETRY_MS     = 5000;

// ================== PINS ==================
#define DHT_PIN        4
#define DHT_TYPE       DHT11
#define MQ135_PIN      34
#define MQ135_SAMPLES  10       // average multiple reads for stability

// ================== OBJECTS ==================
DHT dht(DHT_PIN, DHT_TYPE);
unsigned long lastSendMs = 0;
unsigned long lastWifiRetryMs = 0;

// ================== SETUP ==================
void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println();
  Serial.println("=== ESP32 Environmental Monitor ===");

  dht.begin();
  pinMode(MQ135_PIN, INPUT);

  connectWiFi();
}

// ================== LOOP ==================
void loop() {
  // Ensure Wi-Fi is connected
  if (WiFi.status() != WL_CONNECTED) {
    unsigned long now = millis();
    if (now - lastWifiRetryMs >= WIFI_RETRY_MS) {
      lastWifiRetryMs = now;
      Serial.println("Wi-Fi lost, reconnecting...");
      connectWiFi();
    }
  }

  // Send reading on interval
  unsigned long now = millis();
  if (now - lastSendMs >= SEND_INTERVAL_MS) {
    lastSendMs = now;
    if (WiFi.status() == WL_CONNECTED) {
      readAndSend();
    } else {
      Serial.println("Skipping send: Wi-Fi down");
    }
  }
}

// ================== WI-FI ==================
void connectWiFi() {
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.print("Connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println();
    Serial.println("Wi-Fi connect failed. Will retry.");
  }
}

// ================== SENSOR READ + SEND ==================
void readAndSend() {
  // --- Read DHT11 ---
  float temperature = dht.readTemperature();  // °C
  float humidity    = dht.readHumidity();     // %

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("DHT11 read failed. Skipping cycle.");
    return;
  }

  // --- Read MQ-135 (averaged) ---
  long sum = 0;
  for (int i = 0; i < MQ135_SAMPLES; i++) {
    sum += analogRead(MQ135_PIN);
    delay(10);
  }
  float airQuality = (float)sum / MQ135_SAMPLES;

  Serial.printf("Reading: T=%.1f°C  H=%.1f%%  AQ=%.0f\n",
                temperature, humidity, airQuality);

  // --- Build JSON ---
  String json = "{";
  json += "\"deviceId\":\"" + String(DEVICE_ID) + "\",";
  json += "\"temperature\":" + String(temperature, 1) + ",";
  json += "\"humidity\":" + String(humidity, 1) + ",";
  json += "\"airQuality\":" + String(airQuality, 0);
  json += "}";

  sendHTTP(json);
}

// ================== HTTP POST WITH RETRY ==================
void sendHTTP(const String& jsonBody) {
  const int maxAttempts = 3;

  for (int attempt = 1; attempt <= maxAttempts; attempt++) {
    HTTPClient http;
    http.begin(API_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(8000);

    int httpCode = http.POST(jsonBody);

    if (httpCode > 0) {
      String response = http.getString();
      Serial.printf("POST attempt %d -> HTTP %d\n", attempt, httpCode);
      Serial.println("Response: " + response);
      http.end();

      if (httpCode == 200 || httpCode == 201) {
        return;  // success
      }
    } else {
      Serial.printf("POST attempt %d failed: %s\n",
                    attempt, http.errorToString(httpCode).c_str());
      http.end();
    }

    // Backoff before retry
    delay(1000 * attempt);
  }

  Serial.println("All POST attempts failed. Will retry next cycle.");
}