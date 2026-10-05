import React from 'react';
import { NavLink } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function Navbar({ deviceStatus }) {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--chrome-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '11px',
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '21px',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
          }}>
            🌍
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>
              Environmental Monitor
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '3px', letterSpacing: '0.1em', fontWeight: 600 }}>
              IOT DASHBOARD
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '4px' }}>
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/history">History</NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>

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
        padding: '8px 16px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '14px',
        fontWeight: 500,
        color: isActive ? '#f1f5f9' : '#94a3b8',
        background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
        border: isActive ? '1px solid rgba(59, 130, 246, 0.35)' : '1px solid transparent',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      })}
    >
      {children}
    </NavLink>
  );
}

export default Navbar;