import React, { useEffect, useState } from 'react';
import { getLatestReading, getHistory, getDeviceStatus } from '../services/api';
import { classifyAirQuality, classifyTemperature, classifyHumidity } from '../services/classify';
import SensorCard from '../components/SensorCard';
import HistoryChart from '../components/HistoryChart';
import RecentReadings from '../components/RecentReadings';

function Dashboard({ onStatusChange }) {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [latestRes, historyRes, statusRes] = await Promise.all([
        getLatestReading(),
        getHistory(50),
        getDeviceStatus(),
      ]);
      setLatest(latestRes.data);
      setHistory(historyRes.data);
      setError(null);
      onStatusChange?.(statusRes.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 0',
      }}>
        <div style={{ textAlign: 'center' }}>
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
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Live environmental readings from device ENV-001
        </p>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <SensorCard
          title="Temperature"
          value={latest ? parseFloat(latest.temperature).toFixed(1) : '--'}
          unit="°C"
          icon="🌡️"
          classification={latest ? classifyTemperature(parseFloat(latest.temperature)) : null}
        />
        <SensorCard
          title="Humidity"
          value={latest ? parseFloat(latest.humidity).toFixed(0) : '--'}
          unit="%"
          icon="💧"
          classification={latest ? classifyHumidity(parseFloat(latest.humidity)) : null}
        />
        <SensorCard
          title="Air Quality"
          value={latest ? parseFloat(latest.air_quality).toFixed(0) : '--'}
          unit="raw"
          icon="🌫️"
          classification={latest ? classifyAirQuality(parseFloat(latest.air_quality)) : null}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {history.length > 0 && <HistoryChart data={history} />}
        {history.length > 0 && <RecentReadings readings={history} />}
      </div>
    </div>
  );
}

export default Dashboard;