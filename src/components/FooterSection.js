// components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-message">
            <h3 className="footer-title">Made with ❤️ for the most amazing person in my world</h3>
            <p className="footer-subtitle">
              This website is a digital love letter, a collection of our memories, 
              and a promise of all the beautiful moments yet to come.
            </p>
          </div>
          
          <div className="footer-quote">
            <blockquote>
              "In all the world, there is no heart for me like yours. 
              In all the world, there is no love for you like mine."
            </blockquote>
            <cite>- Maya Angelou</cite>
          </div>   
              </div>
          
        <div className="footer-bottom">
          <div className="footer-hearts">
            <span className="floating-heart">💕</span>
            <span className="floating-heart">💖</span>
            <span className="floating-heart">💝</span>
            <span className="floating-heart">💗</span>
            <span className="floating-heart">💕</span>
          </div>
          
          <p className="footer-copyright">
            © {currentYear} Our Love Story • Created with endless love and devotion
          </p>
        </div>
      </div>
      
      <div className="footer-decorations">
        <div className="decoration-left">🌸</div>
        <div className="decoration-right">🦋</div>
      </div>
    </footer>
  );
};

export default Footer;