// App.js
import React from 'react';
import HeroSection from './components/HeroSection';
import Hard75Section from './components/Hard75Section';
import GallerySection from './components/GallerySection';
import PlaylistsSection from './components/PlaylistsSection';
import LettersSection from './components/LettersSection';
import AnniversarySection from './components/AnniversarySection';
import Footer from './components/FooterSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <Hard75Section />
      <GallerySection />
      <PlaylistsSection />
      <LettersSection />
      <AnniversarySection />
      <Footer />
    </div>
  );
}

export default App;