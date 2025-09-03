// components/HeroSection.js
import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState('16:49');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      setCurrentTime(time);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              How It All Started
            </div>
            <h1 className="hero-title">
              Our Love Story
              <span className="hero-subtitle">began with a simple message</span>
            </h1>
            <p className="hero-description">
              Sometimes the most beautiful journeys start with the courage to say hello. 
              What began as a sweet DM turned into the greatest love story we could have ever imagined.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">June 17</span>
                <span className="stat-label">First Message</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">14:13</span>
                <span className="stat-label">The Moment</span>
              </div>
            </div>
          </div>
          
          <div className="hero-phone-mockup">
            <div className="phone-frame">
              <div className="phone-screen">
                {/* Status Bar */}
                <div className="status-bar">
                  <span className="time">{currentTime}</span>
                  <div className="status-icons">
                    <div className="signal-bars">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <div className="wifi-icon">📶</div>
                    <div className="battery">🔋</div>
                  </div>
                </div>
                
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-header-left">
                    <button className="back-button">‹</button>
                    <div className="profile-info">
                      <div className="profile-avatar">
                        <span className="avatar-initial">S</span>
                      </div>
                      <div className="profile-details">
                        <div className="profile-name">Shayla Anne</div>
                        <div className="profile-username">shayla_breytenbach</div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-header-right">
                    <button className="call-button">📞</button>
                    <button className="video-button">📹</button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="messages-container">
                  <div className="message-timestamp">17 JUN AT 14:13</div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Hey 😊 I think you're really cute and your profile caught my attention. Before I say more, just wondering, are you single?
                    </div>
                  </div>
                  
                  <div className="message-timestamp">17 JUN AT 19:44</div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      Hello😊 that was really sweet of you, thank you. I'll be real with you... things are a bit complicated on my end right now🤷‍♀️ I'm taking things slow but I'm open to new connections. How about you?
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Complicated? Like the Facebook relationship status? 😂
                      <br/><br/>
                      I'm single - open to new connection s myself.
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      I see your profile says PTA/GQ, you stay in GQ or you're from there?
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      yeah thats the one unfortunately😂 😢
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      I'm from GQ originally and live in PTA currently. I try visit home as often as possible. How about you?
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      😤 Yikes!
                      <br/><br/>
                      From Limpopo currently in Centurion (tempted to say PTA - but I heard that's reaching) 😤
                      <br/><br/>
                      That's pretty cool. You must pretty tight with your family.
                      <br/><br/>
                      You studying in PTA?
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      How long have you been this side for?
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      😭 😭 oh my! This area confuses me so much. For a while when I first moved up here, everything to me was just Joburg and Pretoria (still kinda is lol) 🤣 for months I thought that centurion was PTA eish
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      My family stays here in PTA as well😊 My grandma and my friends are all that side in GQ.
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      No I'm not. I'm currently looking for work at the moment. Are you studying and if so, what are you studying?
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      If you don't mind me asking, how old are you?
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      This side? 4 years, studied in Joburg 😅
                      <br/><br/>
                      WHICH IS VALID! Because I mean Midrand? Centurion? That's kinda like a grey area but not really because at least Centurion part of Tshwane.
                      <br/><br/>
                      Ohhh that makes sense. I hear it's beautiful that side hey 😍
                      <br/><br/>
                      Nah - studying. Job market is quite insane 😢 any aspirations of moving abroad?
                      <br/><br/>
                      27, how old are you?
                    </div>
                  </div>
                  
                  <div className="message voice-message">
                    <div className="voice-bubble">
                      <div className="voice-controls">
                        <button className="play-button">▶</button>
                        <div className="voice-waveform">
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                        </div>
                        <span className="voice-duration">3:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-bubble received-bubble">
                      Sorry for the long vn but I'm lazy to type 😂 😂
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      3 minutes! I can add an instrumental and we can make a song ✍️ 🎤
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Also apologising in advance before it even gets to 3 minutes 😂 yassss!!!!
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Also up vs down here 😤 you go be there!
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Small town vibes? That's pretty cool except when everyone is in your business 🙃
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Was studying at Wits, rn I'm not studying anything, I design websites.
                    </div>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-bubble sent-bubble">
                      Movie makeup is soooo cool! How did you get into that?
                    </div>
                  </div>
                  
                  <div className="message voice-message">
                    <div className="voice-bubble">
                      <div className="voice-controls">
                        <button className="play-button">▶</button>
                        <div className="voice-waveform">
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                        </div>
                        <span className="voice-duration">2:57</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="message voice-message">
                    <div className="voice-bubble">
                      <div className="voice-controls">
                        <button className="play-button">▶</button>
                        <div className="voice-waveform">
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                          <div className="wave-bar"></div>
                        </div>
                        <span className="voice-duration">3:06</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="message-input-container">
                  <div className="message-input">
                    <button className="camera-button">📷</button>
                    <input type="text" placeholder="Message..." />
                    <button className="voice-button">🎤</button>
                    <button className="sticker-button">😊</button>
                    <button className="more-button">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-decorative-elements">
          <div className="floating-heart heart-1">💕</div>
          <div className="floating-heart heart-2">✨</div>
          <div className="floating-heart heart-3">💖</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;