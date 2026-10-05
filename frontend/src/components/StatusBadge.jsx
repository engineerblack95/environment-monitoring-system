import React from 'react';

function StatusBadge({ status }) {
  const isOnline = status === 'ONLINE';

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      background: isOnline ? 'rgba(52, 211, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)',
      border: `1px solid ${isOnline ? 'rgba(52, 211, 153, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
      color: isOnline ? 'var(--success)' : 'var(--danger)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.02em',
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: isOnline ? 'var(--success)' : 'var(--danger)',
        boxShadow: isOnline ? '0 0 10px var(--success)' : '0 0 10px var(--danger)',
        animation: isOnline ? 'pulse 2s infinite' : 'none',
      }} />
      {status || 'UNKNOWN'}
    </div>
  );
}

export default StatusBadge;