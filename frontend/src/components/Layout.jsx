import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children, deviceStatus, lastSeen }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Navbar deviceStatus={deviceStatus} />

      <main style={{
        flex: 1,
        padding: '36px 0 48px',
      }}>
        <div className="container">
          {children}
        </div>
      </main>

      <Footer deviceStatus={deviceStatus} lastSeen={lastSeen} />
    </div>
  );
}

export default Layout;