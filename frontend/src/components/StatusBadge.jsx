import React from 'react';

function StatusBadge({ status }) {
  const isOnline = status === 'ONLINE';
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      borderRadius: '20px',
      background: isOnline ? '#d1fae5' : '#fee2e2',
      color: isOnline ? '#065f46' : '#991b1b',
      fontWeight: '600',
      fontSize: '14px',
    }}>
      <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: isOnline ? '#10b981' : '#ef4444',
        animation: isOnline ? 'pulse 2s infinite' : 'none',
      }} />
      {status || 'UNKNOWN'}
    </div>
  );
}

export default StatusBadge;