import { useState, useEffect } from 'react';

export default function AnimatedGallery({ images, name, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slideshow
  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images, currentIndex]);

  const nextSlide = () => {
    if (!images || images.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (!images || images.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsAnimating(false);
    }, 300);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`gallery-placeholder ${className}`} style={{
        background: 'linear-gradient(135deg, #f3e8ff, #e8f4e8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        borderRadius: '16px',
        height: '100%',
        minHeight: '200px'
      }}>
        📦
      </div>
    );
  }

  return (
    <div className={`gallery-container ${className}`} style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      height: '100%',
      minHeight: '200px'
    }}>
      {/* Main Image with Animation */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        <img
          src={images[currentIndex]}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease, opacity 0.3s ease',
            transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
            opacity: isAnimating ? 0.8 : 1
          }}
        />
        
        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          padding: '2rem 1rem 1rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.3s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.3s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            ❯
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 10
        }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsAnimating(false);
                }, 200);
              }}
              style={{
                width: currentIndex === idx ? '30px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentIndex === idx ? '#ec4899' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}