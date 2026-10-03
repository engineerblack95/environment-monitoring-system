import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function HistoryChart({ data }) {
  const formatted = [...data].reverse().map((r) => ({
    time: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: parseFloat(r.temperature),
    humidity: parseFloat(r.humidity),
    airQuality: parseFloat(r.air_quality),
  }));

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3 style={{ marginTop: 0, color: '#111827' }}>📈 Sensor History</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temp (°C)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="airQuality" stroke="#f59e0b" name="Air Quality" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;