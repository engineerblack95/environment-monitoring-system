import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function HistoryChart({ data }) {
  const formatted = [...data].reverse().map((r) => ({
    time: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: parseFloat(r.temperature),
    humidity: parseFloat(r.humidity),
    airQuality: parseFloat(r.air_quality),
  }));

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px 24px 16px',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--gray-800)',
            letterSpacing: '-0.01em',
          }}>
            Sensor History
          </h3>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '13px',
            color: 'var(--gray-500)',
          }}>
            Last {formatted.length} readings
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={formatted} margin={{ top: 6, right: 8, bottom: 6, left: -8 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="aqGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 4" stroke="#eef1f5" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            minTickGap={30}
          />
          <YAxis
            yAxisId="left"
            stroke="#9ca3af"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'dataMax + 10']}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-md)',
              fontSize: '13px',
              padding: '10px 14px',
            }}
            labelStyle={{ color: 'var(--gray-500)', fontSize: '12px', marginBottom: '4px' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            name="Temperature (°C)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            name="Humidity (%)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="airQuality"
            stroke="#f59e0b"
            name="Air Quality (raw)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;