import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';

// PICHA ZINAZOBADILIKA (HERO SLIDESHOW) - MATATIZO YA KUTAFUTA MACHIMBO
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
    mobileImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&q=80",
    title: "⚠️ KUTEMBEA MITAA KUTAFUTA MACHIMBO?",
    subtitle: "Unatembea mitaa, unauliza watu, unapoteza muda mwingi - YOTE YANAISHA!",
    button1: "Pata Suluhisho Bure",
    button2: "Tazama Machimbo"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&q=80",
    mobileImage: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400&q=80",
    title: "💰 UNALIPA KUPATA TAARIFA ZA MACHIMBO?",
    subtitle: "Watu wanakuuzia taarifa za machimbo kwa bei kubwa - SASA BURE KABISA!",
    button1: "Pata Bure",
    button2: "Anza Sasa"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    mobileImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    title: "🏗️ HUJUI MACHIMBO YALIPO KARIBU NAWE?",
    subtitle: "Tunakusaidia kupata machimbo ya jumla na rejareja karibu na eneo lako BURE!",
    button1: "Tafuta Sasa",
    button2: "Jua Zaidi"
  }
];

// Skeleton Loading Component
const SkeletonCard = () => (
  <div style={{
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  }}>
    <div style={{
      height: '150px',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite'
    }} />
    <div style={{ padding: '1rem' }}>
      <div style={{ height: '14px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px', width: '80%' }} />
      <div style={{ height: '20px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px', width: '50%' }} />
      <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', width: '60%' }} />
    </div>
  </div>
);

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const featuredProducts = products.slice(0, 8);
  const mostViewed = [...products].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6);
  
  const filteredByCategory = searchCategory 
    ? products.filter(p => p.category === searchCategory)
    : [];
  
  const searchedProducts = searchTerm
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    stopAutoPlay();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
    startAutoPlay();
  };

  const getCategoryIcon = (catName) => {
    const cat = categories.find(c => c.name === catName);
    return cat?.icon || '📦';
  };

  const goToSlide = (index) => {
    stopAutoPlay();
    setCurrentSlide(index);
    startAutoPlay();
  };

  return (
    <div style={{ paddingBottom: '70px' }}>
      
      {/* ========== HERO SLIDESHOW - MATATIZO YA MACHIMBO ========== */}
      <div 
        ref={sliderRef}
        style={{ 
          position: 'relative', 
          height: isMobile ? '40vh' : '50vh', 
          minHeight: isMobile ? '300px' : '350px', 
          maxHeight: isMobile ? '400px' : '450px', 
          overflow: 'hidden',
          touchAction: 'pan-y pinch-zoom'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.7)), url(${isMobile ? slide.mobileImage : slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ color: 'white', maxWidth: '800px', padding: '1.5rem' }}>
              <h1 style={{ fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                {slide.title}
              </h1>
              <p style={{ fontSize: isMobile ? '0.85rem' : 'clamp(0.9rem, 2vw, 1.1rem)', marginBottom: '1.5rem', opacity: 0.95 }}>
                {slide.subtitle}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
                <Link 
                  to="/machimbo" 
                  style={{ 
                    background: '#ec4899', 
                    padding: isMobile ? '10px 20px' : '10px 24px', 
                    borderRadius: '50px', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    textAlign: 'center',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {slide.button1} →
                </Link>
                <Link 
                  to="/products" 
                  style={{ 
                    background: 'transparent', 
                    border: '2px solid white', 
                    padding: isMobile ? '10px 20px' : '10px 24px', 
                    borderRadius: '50px', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    textAlign: 'center',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {slide.button2}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          zIndex: 10
        }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentSlide ? '30px' : '8px',
                height: '8px',
                borderRadius: '8px',
                background: index === currentSlide ? '#ec4899' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: 'none',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>

      {/* ========== BURE KABISA SECTION ========== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        <Link to="/machimbo" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#10b981',
            borderRadius: '12px',
            padding: '0.8rem',
            textAlign: 'center',
            color: 'white',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>🎉 BURE KABISA!</span>
            <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', opacity: 0.9 }}>Tunakusaidia kupata machimbo - hakuna ada!</span>
          </div>
        </Link>
      </div>

      {/* ========== CATEGORY SEARCH ========== */}
      <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>🔍 Tafuta Bidhaa kwa Kategoria</h2>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            overflowX: isMobile ? 'auto' : 'visible',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            paddingBottom: isMobile ? '0.5rem' : 0,
            WebkitOverflowScrolling: 'touch'
          }}>
            <button
              onClick={() => setSearchCategory('')}
              style={{
                background: searchCategory === '' ? '#7c3aed' : '#f0f0f0',
                color: searchCategory === '' ? 'white' : '#333',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                fontSize: '0.85rem',
                flexShrink: 0
              }}
            >
              📂 Zote
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchCategory(cat.name)}
                style={{
                  background: searchCategory === cat.name ? '#7c3aed' : '#f0f0f0',
                  color: searchCategory === cat.name ? 'white' : '#333',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Tafuta bidhaa kwa jina..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 2.5rem 0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#7c3aed'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: '#999'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {(searchCategory || searchTerm) && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem' }}>
                  {searchTerm ? `Matokeo ya "${searchTerm}"` : `Bidhaa za ${searchCategory}`}
                  <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.8rem' }}>
                    ({searchTerm ? searchedProducts.length : filteredByCategory.length})
                  </span>
                </h3>
                <button
                  onClick={() => {
                    setSearchCategory('');
                    setSearchTerm('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ec4899',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Futa Search ✕
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {(searchTerm ? searchedProducts : filteredByCategory).slice(0, 6).map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'white',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        {getCategoryIcon(product.category)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{product.name}</h4>
                        <p style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '0.75rem' }}>TSh {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {(searchTerm ? searchedProducts.length === 0 : filteredByCategory.length === 0) && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  🔍 Hakuna bidhaa zilizopatikana
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========== MOST VIEWED ========== */}
      <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', background: '#f8f9fa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>👑 Most Viewed</h2>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>Bidhaa zinazotazamwa zaidi kwa sasa</p>
          </div>
          <Link to="/products" style={{ background: '#7c3aed', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '50px', textDecoration: 'none', fontSize: '0.8rem' }}>
            Tazama Zote →
          </Link>
        </div>
        
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {mostViewed.map((product, index) => (
              <div key={product.id} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#ec4899',
                  color: 'white',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  #{index + 1}
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== BIDHAA MAARUFU ========== */}
      <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>⭐ Bidhaa Maarufu</h2>
          <Link to="/products" style={{ background: '#7c3aed', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '50px', textDecoration: 'none', fontSize: '0.8rem' }}>
            Tazama Zote →
          </Link>
        </div>
        
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}