import React from 'react';

function SensorCard({ title, value, unit, classification, icon }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${classification?.color || '#3b82f6'}`,
      flex: 1,
      minWidth: '200px',
    }}>
      <div style={{ fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {icon} {title}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0', color: '#111827' }}>
        {value}<span style={{ fontSize: '16px', color: '#6b7280', marginLeft: '4px' }}>{unit}</span>
      </div>
      {classification && (
        <div style={{
          display: 'inline-block',
          background: classification.color,
          color: 'white',
          padding: '3px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          {classification.label}
        </div>
      )}
    </div>
  );
}

export default SensorCard;