import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScanPage from './components/ScanPage';
import ViewPage from './components/ViewPage';
import AboutPage from './components/AboutPage';
import GabriPage from './components/GabriPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/scan" replace />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gabri" element={<GabriPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
