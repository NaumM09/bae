// components/PlaylistsSection.js
import React, { useState } from 'react';
import './PlaylistsSection.css';

const PlaylistsSection = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState(0);

  const playlists = [
    {
      title: "Our Song ",
      description: "The songs that define our love story",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      songs: [
        { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
        { title: "All of Me", artist: "John Legend", duration: "4:29" },
        { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
        { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" }
      ]
    },
    {
      title: "Date Night Vibes 🌙",
      description: "Perfect songs for our romantic evenings",
      cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      songs: [
        { title: "La Vie En Rose", artist: "Édith Piaf", duration: "3:28" },
        { title: "At Last", artist: "Etta James", duration: "3:01" },
        { title: "Fly Me to the Moon", artist: "Frank Sinatra", duration: "2:28" },
        { title: "The Way You Look Tonight", artist: "Tony Bennett", duration: "3:22" }
      ]
    },
    {
      title: "Road Trip Mix 🚗",
      description: "Our favorite driving songs together",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      songs: [
        { title: "Can't Stop the Feeling", artist: "Justin Timberlake", duration: "3:56" },
        { title: "Good as Hell", artist: "Lizzo", duration: "2:39" },
        { title: "Sunflower", artist: "Post Malone", duration: "2:38" },
        { title: "Golden", artist: "Harry Styles", duration: "3:28" }
      ]
    }
  ];

  return (
    <section className="playlists-section">
      <div className="playlists-container">
        <h2 className="playlists-title">Our Soundtrack</h2>
        <p className="playlists-subtitle">Music that brings us together</p>
        
        <div className="playlists-grid">
          {playlists.map((playlist, index) => (
            <div 
              key={index} 
              className={`playlist-card ${currentPlaylist === index ? 'active' : ''}`}
              onClick={() => setCurrentPlaylist(index)}
            >
              <div className="playlist-cover">
                <img src={playlist.cover} alt={playlist.title} />
                <div className="play-overlay">
                  <div className="play-button">▶</div>
                </div>
              </div>
              <div className="playlist-info">
                <h3 className="playlist-title">{playlist.title}</h3>
                <p className="playlist-description">{playlist.description}</p>
                <span className="playlist-count">{playlist.songs.length} songs</span>
              </div>
            </div>
          ))}
        </div>

        <div className="current-playlist">
          <div className="playlist-header">
            <img 
              src={playlists[currentPlaylist].cover} 
              alt={playlists[currentPlaylist].title}
              className="current-cover"
            />
            <div className="current-info">
              <h3>{playlists[currentPlaylist].title}</h3>
              <p>{playlists[currentPlaylist].description}</p>
            </div>
          </div>
          
          <div className="songs-list">
            {playlists[currentPlaylist].songs.map((song, songIndex) => (
              <div key={songIndex} className="song-item">
                <div className="song-number">{songIndex + 1}</div>
                <div className="song-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <div className="song-duration">{song.duration}</div>
                <button className="song-play">♪</button>
              </div>
            ))}
          </div>
        </div>

        <div className="music-note-decorations">
          <span className="music-note note-1">♪</span>
          <span className="music-note note-2">♫</span>
          <span className="music-note note-3">♪</span>
          <span className="music-note note-4">♫</span>
        </div>
      </div>
    </section>
  );
};

export default PlaylistsSection;