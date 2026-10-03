import React from 'react';

function About() {
  return (
    <div className="fade-in" style={{ maxWidth: '820px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="page-title">About This System</h1>
        <p className="page-subtitle">
          Full-stack IoT environmental monitoring platform
        </p>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 className="section-title">🎯 Purpose</h2>
        <p style={{ color: 'var(--gray-600)', margin: 0 }}>
          A professional environmental monitoring system that measures
          temperature, humidity, and air quality. Built as a full-stack IoT
          project combining embedded systems, networking, backend, database,
          and frontend development.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 className="section-title">🏗️ System Architecture</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '16px',
          background: 'var(--gray-50)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          fontFamily: 'monospace',
          color: 'var(--gray-700)',
        }}>
          <span>DHT11 + MQ-135</span>
          <span style={{ color: 'var(--gray-400)' }}>→</span>
          <span>ESP32</span>
          <span style={{ color: 'var(--gray-400)' }}>→</span>
          <span>Node.js API</span>
          <span style={{ color: 'var(--gray-400)' }}>→</span>
          <span>PostgreSQL</span>
          <span style={{ color: 'var(--gray-400)' }}>→</span>
          <span>React Dashboard</span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 className="section-title">🛠️ Technology Stack</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <tbody>
            <TechRow label="IoT Controller" value="ESP32 (Arduino IDE)" />
            <TechRow label="Sensors" value="DHT11 (temp + humidity), MQ-135 (air quality)" />
            <TechRow label="Backend" value="Node.js, Express.js, express-validator" />
            <TechRow label="Database" value="PostgreSQL (environmental_readings table)" />
            <TechRow label="Frontend" value="React.js, React Router, Recharts, axios" />
            <TechRow label="Communication" value="REST API over HTTP/JSON" />
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 className="section-title">📡 API Endpoints</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Endpoint</th>
              <th style={thStyle}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <ApiRow method="POST" path="/api/readings" purpose="Submit a new reading" />
            <ApiRow method="GET" path="/api/readings/latest" purpose="Latest measurement" />
            <ApiRow method="GET" path="/api/readings?limit=N" purpose="Historical data" />
            <ApiRow method="GET" path="/api/device/status" purpose="ONLINE / OFFLINE status" />
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="section-title">⚠️ MQ-135 Note</h2>
        <p style={{ color: 'var(--gray-600)', margin: 0, fontSize: '14px' }}>
          The MQ-135 raw analog value is <strong>not</strong> a calibrated ppm
          concentration. Accurate ppm estimation requires calibration in a
          controlled environment. For this system, raw values are classified
          into application-defined levels: <strong>GOOD</strong> (&lt; 300),{' '}
          <strong>MODERATE</strong> (300–500), <strong>POOR</strong> (≥ 500).
        </p>
      </div>
    </div>
  );
}

function TechRow({ label, value }) {
  return (
    <tr style={{ borderTop: '1px solid var(--border)' }}>
      <td style={{ padding: '10px 0', color: 'var(--gray-500)', width: '40%' }}>{label}</td>
      <td style={{ padding: '10px 0', color: 'var(--gray-800)' }}>{value}</td>
    </tr>
  );
}

function ApiRow({ method, path, purpose }) {
  const colors = {
    GET:  { bg: 'var(--info-bg)',    fg: 'var(--info-fg)' },
    POST: { bg: 'var(--success-bg)', fg: 'var(--success-fg)' },
  };
  const c = colors[method] || colors.GET;
  return (
    <tr style={{ borderTop: '1px solid var(--border)' }}>
      <td style={{ padding: '10px 0' }}>
        <span style={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: '4px',
          background: c.bg,
          color: c.fg,
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: 'monospace',
        }}>{method}</span>
      </td>
      <td style={{ padding: '10px 0', fontFamily: 'monospace', fontSize: '13px', color: 'var(--gray-700)' }}>
        {path}
      </td>
      <td style={{ padding: '10px 0', color: 'var(--gray-600)' }}>{purpose}</td>
    </tr>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 8px 8px 0',
  fontSize: '12px',
  color: 'var(--gray-500)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '1px solid var(--border)',
};

export default About;