import React from 'react';

function RecentReadings({ readings }) {
  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3 style={{ marginTop: 0, color: '#111827' }}>🕐 Recent Readings</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px', color: '#6b7280' }}>Time</th>
              <th style={{ padding: '8px', color: '#6b7280' }}>Temp (°C)</th>
              <th style={{ padding: '8px', color: '#6b7280' }}>Humidity (%)</th>
              <th style={{ padding: '8px', color: '#6b7280' }}>Air Quality</th>
            </tr>
          </thead>
          <tbody>
            {readings.slice(0, 10).map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '8px' }}>{new Date(r.created_at).toLocaleTimeString()}</td>
                <td style={{ padding: '8px' }}>{parseFloat(r.temperature).toFixed(1)}</td>
                <td style={{ padding: '8px' }}>{parseFloat(r.humidity).toFixed(1)}</td>
                <td style={{ padding: '8px' }}>{parseFloat(r.air_quality).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentReadings;