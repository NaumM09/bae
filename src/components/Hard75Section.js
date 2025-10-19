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
    { id: 'social_noon', label: 'Don\'t scroll on social media past 12pm', icon: '📱' },
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

  const person1Progress = calculateProgress(person1Tasks);
  const person2Progress = calculateProgress(person2Tasks);

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

        {/* User Toggle */}
        <div className="user-toggle">
          <button 
            className={`toggle-btn ${currentUser === 'person1' ? 'active' : ''}`}
            onClick={() => setCurrentUser('person1')}
          >
            Shay
          </button>
          <button 
            className={`toggle-btn ${currentUser === 'person2' ? 'active' : ''}`}
            onClick={() => setCurrentUser('person2')}
          >
            Hlatse
          </button>
        </div>

        {/* Task Cards */}
        <div className="task-cards-container">
          {/* Person 1 Card */}
          <div className="task-card">
            <div className="card-header">
              <div className="user-avatar">👩</div>
              <div className="user-info">
                <h3>My Progress</h3>
                <p>Day {currentDay}</p>
              </div>
              <div className="progress-circle">
                <svg width="60" height="60">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                  <circle 
                    cx="30" 
                    cy="30" 
                    r="25" 
                    fill="none" 
                    stroke="#ec4899" 
                    strokeWidth="4"
                    strokeDasharray={`${person1Progress * 1.57} 157`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                  <text x="30" y="35" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">
                    {person1Progress}%
                  </text>
                </svg>
              </div>
            </div>
            
            <div className="tasks-list">
              {taskCategories.map(task => (
                <div 
                  key={task.id}
                  className={`task-item ${person1Tasks[task.id] ? 'completed' : ''} ${currentUser === 'person1' ? 'clickable' : 'disabled'}`}
                  onClick={() => currentUser === 'person1' && toggleTask(task.id)}
                >
                  <span className="task-icon">{task.icon}</span>
                  <span className="task-label">{task.label}</span>
                  <span className="task-check">{person1Tasks[task.id] ? '✓' : '○'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Person 2 Card */}
          <div className="task-card">
            <div className="card-header">
              <div className="user-avatar">👩</div>
              <div className="user-info">
                <h3>Her Progress</h3>
                <p>Day {currentDay}</p>
              </div>
              <div className="progress-circle">
                <svg width="60" height="60">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                  <circle 
                    cx="30" 
                    cy="30" 
                    r="25" 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="4"
                    strokeDasharray={`${person2Progress * 1.57} 157`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                  <text x="30" y="35" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">
                    {person2Progress}%
                  </text>
                </svg>
              </div>
            </div>
            
            <div className="tasks-list">
              {taskCategories.map(task => (
                <div 
                  key={task.id}
                  className={`task-item ${person2Tasks[task.id] ? 'completed' : ''} ${currentUser === 'person2' ? 'clickable' : 'disabled'}`}
                  onClick={() => currentUser === 'person2' && toggleTask(task.id)}
                >
                  <span className="task-icon">{task.icon}</span>
                  <span className="task-label">{task.label}</span>
                  <span className="task-check">{person2Tasks[task.id] ? '✓' : '○'}</span>
                </div>
              ))}
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