import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import HistoryChart from '../components/HistoryChart';

function History() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getHistory(limit);
      setReadings(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <div className="fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <div>
          <h1 className="page-title">History</h1>
          <p className="page-subtitle">
            Historical sensor readings retrieved from PostgreSQL
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
            Show last:
          </label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              background: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <option value={25}>25 readings</option>
            <option value={50}>50 readings</option>
            <option value={100}>100 readings</option>
            <option value={250}>250 readings</option>
            <option value={500}>500 readings</option>
          </select>

          <button
            onClick={fetchHistory}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'var(--brand-500)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'var(--danger-bg)',
          color: 'var(--danger-fg)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '20px',
          fontSize: '14px',
          border: '1px solid var(--danger)',
        }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--gray-200)',
            borderTopColor: 'var(--brand-500)',
            borderRadius: '50%',
            margin: '0 auto 12px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
            Loading {limit} readings...
          </div>
        </div>
      ) : readings.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-500)' }}>
          No readings found. Make sure the simulator or ESP32 is running.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <HistoryChart data={readings} />

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <h3 className="section-title" style={{ margin: 0 }}>
                All Readings ({readings.length})
              </h3>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ position: 'sticky', top: 0, background: 'var(--gray-50)' }}>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Time</th>
                    <th style={thStyle}>Temperature</th>
                    <th style={thStyle}>Humidity</th>
                    <th style={thStyle}>Air Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((r) => (
                    <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={tdStyle}>
                        <span style={{ color: 'var(--gray-400)', fontFamily: 'monospace' }}>
                          {r.id}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                      <td style={tdStyle}>{parseFloat(r.temperature).toFixed(1)} °C</td>
                      <td style={tdStyle}>{parseFloat(r.humidity).toFixed(1)} %</td>
                      <td style={tdStyle}>{parseFloat(r.air_quality).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '12px 16px',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--gray-500)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '2px solid var(--border)',
};

const tdStyle = {
  padding: '12px 16px',
  color: 'var(--gray-700)',
};

export default History;