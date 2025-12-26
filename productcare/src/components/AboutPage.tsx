import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="christmas-background">
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
        </div>

        <div className="christmas-trees">
          <div className="tree tree-left">
            <div className="tree-star">⭐</div>
            <div className="tree-top">🎄</div>
            <div className="tree-ornaments">
              <span className="ornament">🔴</span>
              <span className="ornament">🟡</span>
              <span className="ornament">🔵</span>
            </div>
          </div>

          <div className="tree tree-right">
            <div className="tree-star">⭐</div>
            <div className="tree-top">🎄</div>
            <div className="tree-ornaments">
              <span className="ornament">🟢</span>
              <span className="ornament">🟣</span>
              <span className="ornament">🟠</span>
            </div>
          </div>
        </div>

        <div className="animated-message">
          <span className="letter">A</span>
          <span className="letter">u</span>
          <span className="letter">g</span>
          <span className="letter">u</span>
          <span className="letter">r</span>
          <span className="letter">i</span>
          <span className="space"> </span>
          <span className="letter">M</span>
          <span className="letter">a</span>
          <span className="letter">r</span>
          <span className="letter">c</span>
          <span className="letter">o</span>
          <span className="space"> </span>
          <span className="letter">B</span>
          <span className="letter">r</span>
          <span className="letter">u</span>
          <span className="letter">s</span>
          <span className="letter">a</span>
        </div>

        <div className="christmas-decorations">
          <span className="decoration">🎁</span>
          <span className="decoration">🎅</span>
          <span className="decoration">⛄</span>
          <span className="decoration">🔔</span>
          <span className="decoration">🕯️</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
