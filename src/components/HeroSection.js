// components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-decorations">
        <span className="decoration decoration-1">💕</span>
        <span className="decoration decoration-2">✨</span>
        <span className="decoration decoration-3">🌸</span>
        <span className="decoration decoration-4">💝</span>
        <span className="decoration decoration-5">🦋</span>
        <span className="decoration decoration-6">🌹</span>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Our Love Story</h1>
        <p className="hero-subtitle">A digital scrapbook of our beautiful journey together</p>
        <div className="hero-heart">
          <span className="heart-icon">❤️</span>
        </div>
        <p className="hero-message">
          Every moment with you is a treasure worth keeping forever
        </p>
      </div>
      
      <div className="hero-scroll-indicator">
        <span>Scroll to explore our memories</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default HeroSection;