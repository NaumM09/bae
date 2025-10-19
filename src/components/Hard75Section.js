import React, { useState, useEffect } from 'react';
import './Hard75Section.css';

// Firebase imports - you'll need to install: npm install firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWELqCMMuD4IkjlmCeCV8rXimI3oaAUEQ",
  authDomain: "shay-hlatse.firebaseapp.com",
  databaseURL: "https://shay-hlatse-default-rtdb.firebaseio.com",
  projectId: "shay-hlatse",
  storageBucket: "shay-hlatse.firebasestorage.app",
  messagingSenderId: "424216440629",
  appId: "1:424216440629:web:ab456b6b6d8d5552c6e67c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const Hard75Section = () => {
  const [currentUser, setCurrentUser] = useState('person1');
  const [person1Tasks, setPerson1Tasks] = useState({});
  const [person2Tasks, setPerson2Tasks] = useState({});
  const [allDaysData, setAllDaysData] = useState({});
  const [currentDay, setCurrentDay] = useState(1);

  const startDate = new Date('2025-10-20');

  // Your custom task list
  const taskCategories = [
    { id: 'wakeup', label: 'Out of bed by 8 am', icon: '⏰' },
    { id: 'morning_prayer', label: 'Morning prayer', icon: '🙏' },
    { id: 'grateful', label: 'List 5 things I\'m grateful for', icon: '✨' },
    { id: 'social_noon', label: 'Don\'t scroll on social media before 12pm', icon: '📱' },
    { id: 'workout', label: '30 minutes workout', icon: '💪' },
    { id: 'water', label: 'Drink 4 glasses of water a day', icon: '💧' },
    { id: 'outside', label: 'Spend 10 minutes outside', icon: '🌞' },
    { id: 'bible', label: 'Read a chapter of the bible', icon: '📖' },
    { id: 'read', label: 'Read 5 pages minimum', icon: '📚' },
    { id: 'night_prayer', label: 'I did my night prayer', icon: '🌙' },
    { id: 'social_night', label: 'Don\'t scroll on social media past 10 pm', icon: '🌃' },
    { id: 'fruit', label: 'I ate a fruit', icon: '🍎' }
  ];

  useEffect(() => {
    signInAnonymously(auth).catch(error => {
      console.error("Auth error:", error);
    });

    // Listen to ALL days data for calendar
    const allDaysRef = ref(database, 'hard75');
    onValue(allDaysRef, (snapshot) => {
      const data = snapshot.val();
      setAllDaysData(data || {});
    });

    // Listen to current day person 1 tasks
    const person1Ref = ref(database, 'hard75/person1/day' + currentDay);
    onValue(person1Ref, (snapshot) => {
      const data = snapshot.val();
      setPerson1Tasks(data || {});
    });

    // Listen to current day person 2 tasks
    const person2Ref = ref(database, 'hard75/person2/day' + currentDay);
    onValue(person2Ref, (snapshot) => {
      const data = snapshot.val();
      setPerson2Tasks(data || {});
    });
  }, [currentDay]);

  const toggleTask = (taskId) => {
    const userPath = `hard75/${currentUser}/day${currentDay}`;
    const taskRef = ref(database, `${userPath}/${taskId}`);
    
    const currentTasks = currentUser === 'person1' ? person1Tasks : person2Tasks;
    const newValue = !currentTasks[taskId];
    
    set(taskRef, newValue);
  };

  const calculateProgress = (tasks) => {
    const completed = Object.values(tasks).filter(Boolean).length;
    return Math.round((completed / taskCategories.length) * 100);
  };

  const isDayCompleted = (dayNum, person) => {
    const dayData = allDaysData?.[person]?.[`day${dayNum}`];
    if (!dayData) return false;
    const completed = Object.values(dayData).filter(Boolean).length;
    return completed === taskCategories.length;
  };

  const getDayDate = (dayNum) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (dayNum - 1));
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const currentTasks = currentUser === 'person1' ? person1Tasks : person2Tasks;
  const currentProgress = calculateProgress(currentTasks);
  const currentName = currentUser === 'person1' ? 'Shay' : 'Hlatse';
  const otherName = currentUser === 'person1' ? 'Hlatse' : 'Shay';
  const otherUser = currentUser === 'person1' ? 'person2' : 'person1';
  const otherTasks = currentUser === 'person1' ? person2Tasks : person1Tasks;
  const otherProgress = calculateProgress(otherTasks);

  return (
    <section className="hard75-section">
      <div className="hard75-container">
        {/* Header */}
        <div className="hard75-header">
          <div className="hard75-badge">
            <span className="badge-dot"></span>
            Our Challenge Together
          </div>
          <h2 className="hard75-title">
            75 Day Hard Challenge
          </h2>
        </div>

        {/* User Toggle - Moved to top */}
        <div className="user-toggle">
          <button 
            className={`toggle-btn ${currentUser === 'person1' ? 'active' : ''}`}
            onClick={() => setCurrentUser('person1')}
          >
            <span className="toggle-avatar">👩</span>
            <span className="toggle-name">Shay</span>
          </button>
          <button 
            className={`toggle-btn ${currentUser === 'person2' ? 'active' : ''}`}
            onClick={() => setCurrentUser('person2')}
          >
            <span className="toggle-avatar">👩</span>
            <span className="toggle-name">Hlatse</span>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-section">
          <div className="calendar-header">
            <h3>Challenge Calendar</h3>
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-dot completed-both"></span>
                <span>Both completed</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot completed-partial"></span>
                <span>One completed</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot incomplete"></span>
                <span>Incomplete</span>
              </div>
            </div>
          </div>
          <div className="calendar-grid">
            {Array.from({ length: 75 }, (_, i) => {
              const dayNum = i + 1;
              const person1Complete = isDayCompleted(dayNum, 'person1');
              const person2Complete = isDayCompleted(dayNum, 'person2');
              const bothComplete = person1Complete && person2Complete;
              const oneComplete = person1Complete || person2Complete;
              
              return (
                <div
                  key={dayNum}
                  className={`calendar-day ${currentDay === dayNum ? 'active' : ''} ${
                    bothComplete ? 'completed-both' : oneComplete ? 'completed-partial' : 'incomplete'
                  }`}
                  onClick={() => setCurrentDay(dayNum)}
                >
                  <span className="calendar-day-number">{dayNum}</span>
                  <span className="calendar-day-date">{getDayDate(dayNum)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Selector */}
        <div className="day-selector">
          <button 
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="day-nav-btn"
          >
            ←
          </button>
          <div className="current-day">
            <span className="day-label">Day</span>
            <span className="day-number">{currentDay}</span>
            <span className="day-total">of 75</span>
            <span className="day-date">{getDayDate(currentDay)}</span>
          </div>
          <button 
            onClick={() => setCurrentDay(Math.min(75, currentDay + 1))}
            disabled={currentDay === 75}
            className="day-nav-btn"
          >
            →
          </button>
        </div>

        {/* Single Task Card for Current User */}
        <div className="single-card-container">
          <div className="task-card main-card">
            <div className="card-header">
              <div className="user-avatar">{currentUser === 'person1' ? '👩' : '👩'}</div>
              <div className="user-info">
                <h3>{currentName}'s Tasks</h3>
                <p>Day {currentDay} • {getDayDate(currentDay)}</p>
              </div>
              <div className="progress-circle">
                <svg width="70" height="70">
                  <circle cx="35" cy="35" r="30" fill="none" stroke="#e5e7eb" strokeWidth="5"/>
                  <circle 
                    cx="35" 
                    cy="35" 
                    r="30" 
                    fill="none" 
                    stroke={currentUser === 'person1' ? '#ec4899' : '#8b5cf6'}
                    strokeWidth="5"
                    strokeDasharray={`${currentProgress * 1.88} 188`}
                    strokeLinecap="round"
                    transform="rotate(-90 35 35)"
                  />
                  <text x="35" y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
                    {currentProgress}%
                  </text>
                </svg>
              </div>
            </div>
            
            <div className="tasks-list">
              {taskCategories.map(task => (
                <div 
                  key={task.id}
                  className={`task-item ${currentTasks[task.id] ? 'completed' : ''} clickable`}
                  onClick={() => toggleTask(task.id)}
                >
                  <span className="task-icon">{task.icon}</span>
                  <span className="task-label">{task.label}</span>
                  <span className="task-check">{currentTasks[task.id] ? '✓' : '○'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Person's Progress Summary */}
          <div className="other-person-summary">
            <div className="summary-header">
              <div className="summary-avatar">{otherUser === 'person1' ? '👩' : '👩'}</div>
              <div className="summary-info">
                <h4>{otherName}'s Progress</h4>
                <p>Day {currentDay}</p>
              </div>
            </div>
            <div className="summary-progress">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{
                    width: `${otherProgress}%`,
                    background: otherUser === 'person1' ? '#ec4899' : '#8b5cf6'
                  }}
                ></div>
              </div>
              <span className="progress-text">{otherProgress}% Complete</span>
            </div>
            <div className="summary-tasks-preview">
              {taskCategories.slice(0, 4).map(task => (
                <div key={task.id} className="mini-task">
                  <span className="mini-icon">{task.icon}</span>
                  <span className={`mini-status ${otherTasks[task.id] ? 'done' : ''}`}>
                    {otherTasks[task.id] ? '✓' : '○'}
                  </span>
                </div>
              ))}
              {taskCategories.length > 4 && (
                <div className="mini-task more">
                  <span className="mini-text">+{taskCategories.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="motivation-box">
          <p className="motivation-text">
            "Discipline is choosing between what you want now and what you want most."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hard75Section;