import React from 'react';

function Footer({ deviceStatus, lastSeen }) {
  const isOnline = deviceStatus === 'ONLINE';

  return (
    <footer style={{
      borderTop: '1px solid var(--chrome-border)',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      padding: '18px 0',
      marginTop: 'auto',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        fontSize: '13px',
        color: '#94a3b8',
      }}>
        <div>
          Environmental Monitor • Device <strong style={{ color: '#f1f5f9' }}>ENV-001</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: isOnline ? '#10b981' : '#ef4444',
              boxShadow: `0 0 8px ${isOnline ? '#10b981' : '#ef4444'}`,
              animation: isOnline ? 'pulse 2s infinite' : 'none',
            }} />
            Status: <strong style={{ color: isOnline ? '#34d399' : '#f87171' }}>
              {deviceStatus || 'UNKNOWN'}
            </strong>
          </span>

          {lastSeen && (
            <span>Last seen: {new Date(lastSeen).toLocaleString()}</span>
          )}

          <span>© {new Date().getFullYear()} IoT Project</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;