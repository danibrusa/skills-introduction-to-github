import React from 'react';
import './GabriPage.css';

const GabriPage: React.FC = () => {
  return (
    <div className="gabri-page">
      <div className="inter-background">
        {/* Inter logo pattern */}
        <div className="inter-stripes">
          <div className="stripe blue"></div>
          <div className="stripe black"></div>
          <div className="stripe blue"></div>
          <div className="stripe black"></div>
          <div className="stripe blue"></div>
        </div>

        {/* Floating Inter badges */}
        <div className="floating-badges">
          <div className="badge badge-1">⚽</div>
          <div className="badge badge-2">🏆</div>
          <div className="badge badge-3">⭐</div>
          <div className="badge badge-4">⚽</div>
          <div className="badge badge-5">🏆</div>
          <div className="badge badge-6">⭐</div>
        </div>

        {/* Scrolling text container */}
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            <span className="text-content">CIAO NONNA GABRI</span>
            <span className="text-content">CIAO NONNA GABRI</span>
            <span className="text-content">CIAO NONNA GABRI</span>
            <span className="text-content">CIAO NONNA GABRI</span>
          </div>
        </div>

        {/* Inter Milano text */}
        <div className="inter-badge">
          <div className="badge-circle">
            <div className="badge-text">
              <span className="fc">FC</span>
              <span className="inter">INTERNAZIONALE</span>
              <span className="milano">MILANO</span>
            </div>
          </div>
        </div>

        {/* Football field lines */}
        <div className="field-lines">
          <div className="center-circle"></div>
          <div className="center-line"></div>
        </div>
      </div>
    </div>
  );
};

export default GabriPage;
