import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>ProductCare</h2>
          <p className="tagline">Product Expiration Tracker</p>
        </div>
        <div className="nav-links">
          <Link 
            to="/scan" 
            className={`nav-link ${location.pathname === '/scan' ? 'active' : ''}`}
          >
            📷 Scan
          </Link>
          <Link 
            to="/view" 
            className={`nav-link ${location.pathname === '/view' ? 'active' : ''}`}
          >
            📋 Archived
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
