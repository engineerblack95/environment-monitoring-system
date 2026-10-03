import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [deviceStatus, setDeviceStatus] = useState(null);

  return (
    <BrowserRouter>
      <Layout
        deviceStatus={deviceStatus?.status}
        lastSeen={deviceStatus?.lastSeen}
      >
        <Routes>
          <Route path="/" element={<Dashboard onStatusChange={setDeviceStatus} />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;