// components/GallerySection.js
import React, { useState } from 'react';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample photos - replace with your actual photos
  const photos = [
    {
      id: 1,
      src: 'https://i.ibb.co/TxNNWHrq/IMG-2688.png',
      caption: 'Our first meetup',
      date: ''
    },
    {
      id: 2,
      src: 'https://i.ibb.co/Fbb7kFLZ/IMG-3131.png',
      caption: 'McDonalds Cheese Burger',
      date: ''
    },
    {
      id: 3,
      src: 'https://i.ibb.co/8gYPLsDF/IMG-3208.png',
      caption: 'Ice Cream - Of cours',
      date: ''
    },
    {
      id: 4,
      src: 'https://i.ibb.co/Z1w0MdmZ/IMG-3095.png',
      caption: 'Face card never declines',
      date: ''
    },
    {
      id: 5,
      src: 'https://i.ibb.co/yFwRkXJy/IMG-3109-1.png',
      caption: 'Sushi in bed? Plus Cupcakes?😎',
      date: ''
    },
    {
      id: 6,
      src: 'https://i.ibb.co/Y6QLwZw/IMG-3218.png',
      caption: 'Cheeky Kiss',
      date: ''
    }
  ];

  const openModal = (photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="gallery-section paper-texture">
      <div className="gallery-container">
        <h2 className="gallery-title">Our Beautiful Memories</h2>
        <p className="gallery-subtitle">Each photo tells a story of our love</p>
        
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-frame" onClick={() => openModal(photo)}>
              <div className="photo-polaroid">
                <img src={photo.src} alt={photo.caption} className="photo-image" />
                <div className="photo-caption">
                  <p className="photo-text">{photo.caption}</p>
                  <p className="photo-date">{photo.date}</p>
                </div>
              </div>
              <div className="tape tape-1"></div>
              <div className="tape tape-2"></div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedImage.src} alt={selectedImage.caption} className="modal-image" />
            <div className="modal-info">
              <p className="modal-caption">{selectedImage.caption}</p>
              <p className="modal-date">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;