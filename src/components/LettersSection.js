// components/LettersSection.js
import React, { useState } from 'react';
import './LettersSection.css';

const LettersSection = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const letters = [
    {
      id: 1,
      date: "August 31, 2025",
      title: "To My Dearest Shayla Anne",
      preview: "Never in my wildest dreams...",
      content: `My Dearest Love,

This is the first ever letter to you in the months that we've been together. My biggest concern is whether or not you can read my handwriting because this will be the first typescript used from now onwards for as long as you will have me.
I am writing this letter not just because you asked me but this is also a good enough reason for me to write you a note! As we have established within the first month that we are new to this love done  right thing and that our story continues to write itself  in the purest, genuine and passionate form -  and with that comes expression. Expression of you likes your interest, your hobbies,  your disklikes and the in between and with me learning from will say , please allow me the opportunity to put it into practice. Therefore one of the reasons I wrote this letter is because you asked but the main reason is to express my gratitude up to you.
Thank you Shayla I think you for teaching me about love can feel like this, I thank you for teaching me what it's your love I take this I think you for teaching me what effort looks like but most importantly I thinking you for showing what our love looks like because love is not a feeling, love is a decision you make each day to put choose each other but love decision to hold space for each other. In Sepedi when you have wronged someone, you say "Ong Tshwarele"  which directly translates to "please hold space for me." Space for me to love you, space for me to learn you and space for me to disappoint you. Thank you for a wonderful first month I look forward to many more with you. I love you- Your lil gangster ♡`
    },
  ];

  const openLetter = (letter) => {
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };

  return (
    <section className="letters-section paper-texture">
      <div className="letters-container">
        <h2 className="letters-title">Love Letters</h2>
        <p className="letters-subtitle">Words from my heart to yours</p>
        
        <div className="letters-grid">
          {letters.map((letter) => (
            <div 
              key={letter.id} 
              className="letter-envelope"
              onClick={() => openLetter(letter)}
            >
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="envelope-content">
                  <div className="letter-date">{letter.date}</div>
                  <h3 className="letter-title">{letter.title}</h3>
                  <p className="letter-preview">{letter.preview}</p>
                  <div className="read-more">Click to read →</div>
                </div>
              </div>
              <div className="envelope-stamp">💌</div>
            </div>
          ))}
        </div>

        <div className="floating-hearts">
          <span className="heart heart-1">💕</span>
          <span className="heart heart-2">💖</span>
          <span className="heart heart-3">💝</span>
          <span className="heart heart-4">💗</span>
        </div>
      </div>

      {selectedLetter && (
        <div className="letter-modal-overlay" onClick={closeLetter}>
          <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeLetter}>×</button>
            <div className="letter-paper">
              <div className="letter-header">
                <div className="letter-date-full">{selectedLetter.date}</div>
                <h3 className="letter-title-full">{selectedLetter.title}</h3>
              </div>
              <div className="letter-content">
                {selectedLetter.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="letter-paragraph">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LettersSection;