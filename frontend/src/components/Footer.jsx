import React from 'react';

function Footer({ deviceStatus, lastSeen }) {
  const isOnline = deviceStatus === 'ONLINE';

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'white',
      padding: '16px 0',
      marginTop: 'auto',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '13px',
        color: 'var(--gray-500)',
      }}>
        <div>
          Environmental Monitor • Device <strong style={{ color: 'var(--gray-700)' }}>ENV-001</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isOnline ? 'var(--success)' : 'var(--danger)',
              animation: isOnline ? 'pulse 2s infinite' : 'none',
            }} />
            Status: <strong style={{ color: isOnline ? 'var(--success-fg)' : 'var(--danger-fg)' }}>
              {deviceStatus || 'UNKNOWN'}
            </strong>
          </span>

          {lastSeen && (
            <span>
              Last seen: {new Date(lastSeen).toLocaleString()}
            </span>
          )}

          <span>© {new Date().getFullYear()} IoT Project</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;