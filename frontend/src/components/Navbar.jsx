import React from 'react';
import { NavLink } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function Navbar({ deviceStatus }) {
  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        gap: '16px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>
            🌍
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)', lineHeight: 1 }}>
              Environmental Monitor
            </div>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '2px', letterSpacing: '0.3px' }}>
              IoT DASHBOARD
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/history">History</NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>

        {/* Status */}
        <StatusBadge status={deviceStatus} />
      </div>
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        padding: '8px 14px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '14px',
        fontWeight: 500,
        color: isActive ? 'var(--brand-700)' : 'var(--gray-600)',
        background: isActive ? 'var(--brand-50)' : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      })}
    >
      {children}
    </NavLink>
  );
}

export default Navbar;