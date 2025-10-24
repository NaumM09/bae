import React, { useState, useEffect } from 'react';
import './Hard75Section.css';

// Firebase imports
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
  
  const startDate = new Date('2025-10-20');
  
  // Calculate current day based on today's date
  // Days lock at 11 AM the next day to give people time to complete tasks
  const calculateCurrentDay = () => {
    const now = new Date();
    const start = new Date(startDate);
    
    // If it's before 11 AM, we're still on "yesterday's" day
    const currentHour = now.getHours();
    const effectiveDate = new Date(now);
    
    if (currentHour < 11) {
      // Before 11 AM, subtract one day so people can still complete yesterday
      effectiveDate.setDate(effectiveDate.getDate() - 1);
    }
    
    effectiveDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = effectiveDate - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayNumber = diffDays + 1;
    
    return Math.max(1, Math.min(75, dayNumber));
  };
  
  const [currentDay, setCurrentDay] = useState(calculateCurrentDay());
  const actualCurrentDay = calculateCurrentDay();

  // Task categories with carry-over rules and requirements
  const taskCategories = [
    { id: 'wakeup', label: 'Out of bed by 8 am', icon: '⏰', canCarryOver: false },
    { id: 'morning_prayer', label: 'Morning prayer', icon: '🙏', canCarryOver: false },
    { id: 'grateful', label: 'List 5 things I\'m grateful for', icon: '✨', canCarryOver: false },
    { id: 'social_noon', label: 'Don\'t scroll on social media before 12pm', icon: '📱', canCarryOver: false },
    { 
      id: 'workout', 
      label: '30 minutes workout', 
      icon: '💪', 
      canCarryOver: true, 
      baseAmount: 30,
      unit: 'minutes',
      getLabel: (amount) => `${amount} minutes workout${amount > 30 ? ' (carrying over yesterday)' : ''}`
    },
    { id: 'water', label: 'Drink 4 glasses of water a day', icon: '💧', canCarryOver: false },
    { 
      id: 'outside', 
      label: 'Spend 10 minutes outside', 
      icon: '🌞', 
      canCarryOver: true,
      baseAmount: 10,
      unit: 'minutes',
      getLabel: (amount) => `Spend ${amount} minutes outside${amount > 10 ? ' (carrying over yesterday)' : ''}`
    },
    { id: 'bible', label: 'Read a chapter of the bible', icon: '📖', canCarryOver: false },
    { 
      id: 'read', 
      label: 'Read 5 pages minimum', 
      icon: '📚', 
      canCarryOver: true,
      baseAmount: 5,
      unit: 'pages',
      getLabel: (amount) => `Read ${amount} pages${amount > 5 ? ' (carrying over yesterday)' : ''}`
    },
    { id: 'night_prayer', label: 'I did my night prayer', icon: '🌙', canCarryOver: false },
    { id: 'social_night', label: 'Don\'t scroll on social media past 10 pm', icon: '🌃', canCarryOver: false },
    { id: 'fruit', label: 'I ate a fruit', icon: '🍎', canCarryOver: false }
  ];

  useEffect(() => {
    signInAnonymously(auth).catch(error => {
      console.error("Auth error:", error);
    });

    const allDaysRef = ref(database, 'hard75');
    onValue(allDaysRef, (snapshot) => {
      const data = snapshot.val();
      setAllDaysData(data || {});
    });

    const person1Ref = ref(database, 'hard75/person1/day' + currentDay);
    onValue(person1Ref, (snapshot) => {
      const data = snapshot.val();
      setPerson1Tasks(data || {});
    });

    const person2Ref = ref(database, 'hard75/person2/day' + currentDay);
    onValue(person2Ref, (snapshot) => {
      const data = snapshot.val();
      setPerson2Tasks(data || {});
    });
  }, [currentDay]);

  // Check if a day is locked (can't edit)
  const isDayLocked = (dayNum) => {
    // Before 11 AM: can edit yesterday (actualCurrentDay) or today (actualCurrentDay + 1)
    // After 11 AM: can only edit today (actualCurrentDay)
    
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour < 11) {
      // Before 11 AM: can edit current day OR next day
      if (dayNum === actualCurrentDay || dayNum === actualCurrentDay + 1) {
        return false; // Not locked
      }
    } else {
      // After 11 AM: can only edit current day
      if (dayNum === actualCurrentDay) {
        return false; // Not locked
      }
    }
    
    return true; // Everything else is locked
  };

  // Check if task was missed yesterday
  const wasTaskMissedYesterday = (taskId) => {
    if (currentDay <= 1) return false;
    const yesterdayData = allDaysData?.[currentUser]?.[`day${currentDay - 1}`];
    return yesterdayData && !yesterdayData[taskId];
  };

  // Check if task was missed two days ago
  const wasTaskMissedTwoDaysAgo = (taskId) => {
    if (currentDay <= 2) return false;
    const twoDaysAgoData = allDaysData?.[currentUser]?.[`day${currentDay - 2}`];
    return twoDaysAgoData && !twoDaysAgoData[taskId];
  };

  // FIXED: Check if carry-over should be cancelled (missed 2 days in a row)
  // This doesn't permanently fail the task - it just stops carrying over the debt
  // The task can still be completed normally going forward with its base amount
  const shouldCancelCarryOver = (taskId) => {
    const task = taskCategories.find(t => t.id === taskId);
    if (!task?.canCarryOver) return false;
    
    // If missed 2 days in a row, cancel the carry-over (reset to base amount)
    return wasTaskMissedYesterday(taskId) && wasTaskMissedTwoDaysAgo(taskId);
  };

  // Calculate how much is owed for a carry-over task
  const calculateTaskAmount = (taskId) => {
    const task = taskCategories.find(t => t.id === taskId);
    if (!task?.canCarryOver) return task?.baseAmount || 0;

    let totalAmount = task.baseAmount;
    
    // FIXED: Only carry over if missed yesterday but NOT two days ago
    // If missed both days, we cancel the carry-over and reset to base amount
    if (wasTaskMissedYesterday(taskId) && !shouldCancelCarryOver(taskId)) {
      totalAmount += task.baseAmount; // Double the requirement
    }

    return totalAmount;
  };

  // Get task display info (label, whether it's carrying over)
  const getTaskDisplayInfo = (task) => {
    const carryOverCancelled = shouldCancelCarryOver(task.id);
    const isCarryingOver = task.canCarryOver && wasTaskMissedYesterday(task.id) && !carryOverCancelled;
    const taskAmount = calculateTaskAmount(task.id);

    // FIXED: Task is never permanently failed, just show a warning if carry-over was cancelled
    let displayLabel = task.label;
    if (task.canCarryOver && task.getLabel) {
      displayLabel = task.getLabel(taskAmount);
    }

    // Add warning badge if carry-over was cancelled
    if (carryOverCancelled && task.canCarryOver) {
      displayLabel += ' ⚠️ (Carry-over cancelled - back to base)';
    }

    return {
      label: displayLabel,
      amount: taskAmount,
      isCarryingOver: isCarryingOver,
      carryOverCancelled: carryOverCancelled,
      canToggle: true // FIXED: Always allow toggling, never permanently lock
    };
  };

  const toggleTask = (taskId) => {
    const currentTasks = currentUser === 'person1' ? person1Tasks : person2Tasks;
    const newValue = !currentTasks[taskId];
    const taskRef = ref(database, `hard75/${currentUser}/day${currentDay}/${taskId}`);
    set(taskRef, newValue);
  };

  const getDayDate = (dayNum) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (dayNum - 1));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isDayCompleted = (dayNum, person) => {
    const dayData = allDaysData?.[person]?.[`day${dayNum}`];
    if (!dayData) return false;
    
    // Count completed tasks
    const completedTasks = taskCategories.filter(task => dayData[task.id]).length;
    return completedTasks === taskCategories.length;
  };

  const calculateProgress = (tasks) => {
    const completed = taskCategories.filter(task => tasks[task.id]).length;
    return Math.round((completed / taskCategories.length) * 100);
  };

  const currentTasks = currentUser === 'person1' ? person1Tasks : person2Tasks;
  const otherUser = currentUser === 'person1' ? 'person2' : 'person1';
  const otherTasks = currentUser === 'person1' ? person2Tasks : person1Tasks;
  const currentProgress = calculateProgress(currentTasks);
  const otherProgress = calculateProgress(otherTasks);
  const isCurrentDayLocked = isDayLocked(currentDay);
  const currentName = currentUser === 'person1' ? 'Shay' : 'Tshepo';
  const otherName = currentUser === 'person1' ? 'Tshepo' : 'Shay';

  return (
    <section id="hard75" className="hard75-section">
      <div className="hard75-container">
        {/* Header */}
        <div className="hard75-header">
          <h2>Our Hard 75 Challenge</h2>
          <p className="subtitle">Building discipline together, one day at a time</p>
          
          {/* User Toggle */}
          <div className="user-toggle">
            <button
              className={`toggle-btn ${currentUser === 'person1' ? 'active' : ''}`}
              onClick={() => setCurrentUser('person1')}
            >
              👩 Shay
            </button>
            <button
              className={`toggle-btn ${currentUser === 'person2' ? 'active' : ''}`}
              onClick={() => setCurrentUser('person2')}
            >
              👩 Tshepo
            </button>
          </div>
        </div>

        {/* Calendar */}
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
            {isCurrentDayLocked && (
              <span className="day-locked">🔒 {currentDay < actualCurrentDay ? 'Past Day' : 'Future'}</span>
            )}
          </div>
          <button 
            onClick={() => setCurrentDay(Math.min(75, currentDay + 1))}
            disabled={currentDay === 75}
            className="day-nav-btn"
          >
            →
          </button>
        </div>

        {/* Single Card Container */}
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
              {taskCategories.map(task => {
                const displayInfo = getTaskDisplayInfo(task);
                const isCompleted = currentTasks[task.id];
                
                return (
                  <div 
                    key={task.id}
                    className={`task-item ${isCompleted ? 'completed' : ''} ${
                      displayInfo.carryOverCancelled ? 'carry-cancelled' : ''
                    } ${displayInfo.isCarryingOver ? 'carrying-over' : ''} ${
                      !isCurrentDayLocked && displayInfo.canToggle ? 'clickable' : 'locked'
                    }`}
                    onClick={() => !isCurrentDayLocked && displayInfo.canToggle && toggleTask(task.id)}
                  >
                    <span className="task-icon">{task.icon}</span>
                    <span className="task-label">
                      {displayInfo.label}
                      {displayInfo.isCarryingOver && <span className="carry-badge">📥 Carry-over</span>}
                    </span>
                    <span className="task-check">
                      {isCompleted ? '✓' : '○'}
                    </span>
                  </div>
                );
              })}
            </div>

            {isCurrentDayLocked && (
              <div className="lock-message">
                {currentDay < actualCurrentDay 
                  ? '🔒 This day is locked - you can only edit today\'s tasks!' 
                  : '🔒 You can only edit today\'s tasks!'}
              </div>
            )}
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
          {currentProgress < 100 && currentDay === actualCurrentDay && (
            <p className="motivation-encourage">
              💫 Keep going {currentName}! Every task completed is a step closer to your best self!
            </p>
          )}
          {otherProgress < 100 && currentDay === actualCurrentDay && (
            <p className="motivation-encourage">
              💕 {otherName} needs your support today! Send them some encouragement! 
            </p>
          )}
          {currentProgress === 100 && otherProgress === 100 && currentDay === actualCurrentDay && (
            <p className="motivation-celebrate">
              🎉 Amazing! You both crushed Day {currentDay}! Keep this momentum going! 🔥
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hard75Section;