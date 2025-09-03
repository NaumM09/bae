// components/AnniversarySection.js
import React, { useState, useEffect } from 'react';
import './AnniversarySection.css';

const AnniversarySection = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMonthiversary, setIsMonthiversary] = useState(false);
  const [isReminderDay, setIsReminderDay] = useState(false);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  // Set your relationship start date here (year, month-1, day)
  const relationshipStart = new Date(2023, 1, 14); // February 14, 2023

  const monthiversaryMessages = [
    "Happy 1 month, my love! This is just the beginning of our beautiful story. 💕",
    "2 months of pure happiness with you. Every day gets better! 🌸",
    "3 months in and I'm still falling for you every single day. 💖",
    "4 months of laughter, love, and countless beautiful memories. 🌹",
    "5 months together and you still give me butterflies. 🦋",
    "Half a year of loving you feels like both forever and just a moment. 💝",
    "7 months of adventures and I can't wait for all the ones ahead. ✨",
    "8 months in and my love for you grows stronger each day. 💗",
    "9 months of being completely and utterly yours. 💕",
    "10 months of the most incredible love story. 🌟",
    "11 months of pure magic with my favorite person. 💖",
    "Our first year together! Here's to forever, my darling. 🥂"
  ];

  useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const isLastDay = isLastDayOfMonth(today);
      const isDayBefore = isLastDayOfMonth(new Date(today.getTime() + 24 * 60 * 60 * 1000));
      
      const monthsInRelationship = getMonthsInRelationship(relationshipStart, today);
      
      if (isLastDay) {
        setIsMonthiversary(true);
        setIsReminderDay(false);
        setCurrentMessage(getMonthiversaryMessage(monthsInRelationship));
      } else if (isDayBefore) {
        setIsMonthiversary(false);
        setIsReminderDay(true);
        setCurrentMessage("Tomorrow is our monthiversary! Get ready for something special. 💕");
      } else {
        setIsMonthiversary(false);
        setIsReminderDay(false);
        const daysUntil = getDaysUntilLastDayOfMonth(today);
        setDaysUntilNext(daysUntil);
        setCurrentMessage(`${daysUntil} days until our next monthiversary celebration! 🗓️`);
      }
    };

    checkDate();
    const interval = setInterval(checkDate, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const isLastDayOfMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return date.getDate() === lastDay.getDate();
  };

  const getMonthsInRelationship = (startDate, currentDate) => {
    const months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (currentDate.getMonth() - startDate.getMonth());
    return Math.max(0, months);
  };

  const getMonthiversaryMessage = (months) => {
    if (months < monthiversaryMessages.length) {
      return monthiversaryMessages[months];
    }
    return `${months + 1} months of loving you more than words can say. You are my everything. 💕`;
  };

  const getDaysUntilLastDayOfMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const diffTime = lastDay - date;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const milestones = [
  {
      title: "First DM ",
      date: "June 17, 2025",
      description: "Hey 😊 I think you're really cute and your profile caught my attention. Before I say more, just wondering, are you single?."
    },
    {
      title: "Our First Meetup",
      date: "July 1, 2025",
      description: "Who knew a simple coffee meetup would change everything"
    },
    {
      title: "First 'Date'",
      date: "July 20, 2025",
      description: "Paint and picnic seemed like the perfect way to get to know each other."
    },
    {
      title: "First 'I Love You'",
      date: "August 28, 2025",
      description: "The relief of finally saying 'I love you' after holding it in for so long."
    },
  ];

  return (
    <section className="anniversary-section">
      <div className="anniversary-container">
        <h2 className="anniversary-title">Our Journey Together</h2>
        
        <div className="monthiversary-card">
          <div className={`message-display ${isMonthiversary ? 'celebration' : isReminderDay ? 'reminder' : 'countdown'}`}>
            <div className="message-icon">
              {isMonthiversary ? '🎉' : isReminderDay ? '⏰' : '💕'}
            </div>
            <div className="message-text">{currentMessage}</div>
            {isMonthiversary && (
              <div className="celebration-effects">
                <span className="confetti">🎊</span>
                <span className="confetti">✨</span>
                <span className="confetti">💖</span>
                <span className="confetti">🎊</span>
              </div>
            )}
          </div>
        </div>

        <div className="milestones-timeline">
          <h3 className="milestones-title">Our Special Moments</h3>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="milestone-date">{milestone.date}</div>
                  <h4 className="milestone-title">{milestone.title}</h4>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="love-counter">
          <h3>We've been in love for...</h3>
          <div className="counter-grid">
            <div className="counter-item">
              <div className="counter-number" id="hours">0</div>
              <div className="counter-label">Hours</div>
            </div>
            <div className="counter-item">
              <div className="counter-number" id="minutes">0</div>
              <div className="counter-label">Minutes</div>
            </div>
            <div className="counter-item">
              <div className="counter-number" id="seconds">0</div>
              <div className="counter-label">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function updateCounter() {
            const startDate = new Date('2025-07-31T00:00:00');
            const now = new Date();
            const diff = Math.max(0, now - startDate);
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (hoursEl) hoursEl.textContent = hours;
            if (minutesEl) minutesEl.textContent = minutes;
            if (secondsEl) secondsEl.textContent = seconds;
          }
          
          updateCounter();
          setInterval(updateCounter, 1000);
        `
      }} />
    </section>
  );
};

export default AnniversarySection;