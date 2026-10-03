import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="fade-in" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
      <h1 style={{ fontSize: '28px', margin: '0 0 8px', color: 'var(--gray-800)' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: '24px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{
        display: 'inline-block',
        padding: '10px 20px',
        background: 'var(--brand-500)',
        color: 'white',
        borderRadius: 'var(--radius-sm)',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
      }}>
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;