import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [searchFocused, setSearchFocused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const headerRef = useRef(null);

  const locations = useMemo(() => {
    const locs = [...new Set(products.map(p => p.seller?.location?.split(',')[0] || 'Unknown'))];
    return ['Yote', ...locs];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seller?.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedLocation && selectedLocation !== 'Yote') {
      filtered = filtered.filter(p => p.seller?.location?.includes(selectedLocation));
    }

    if (priceRange === 'under50k') {
      filtered = filtered.filter(p => p.price < 50000);
    } else if (priceRange === '50k-100k') {
      filtered = filtered.filter(p => p.price >= 50000 && p.price <= 100000);
    } else if (priceRange === '100k-200k') {
      filtered = filtered.filter(p => p.price > 100000 && p.price <= 200000);
    } else if (priceRange === '200k-500k') {
      filtered = filtered.filter(p => p.price > 200000 && p.price <= 500000);
    } else if (priceRange === 'above500k') {
      filtered = filtered.filter(p => p.price > 500000);
    }

    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'name_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLocation, priceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const hasMore = visibleProducts < filteredProducts.length;
  const hasActiveFilters = searchTerm || selectedCategory || (selectedLocation && selectedLocation !== 'Yote') || priceRange || sortBy;

  const loadMore = () => setVisibleProducts(prev => prev + 20);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setPriceRange('');
    setSortBy('');
    setSearchParams({});
  };

  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
    setAnimKey(k => k + 1);
    setVisibleProducts(20);
  }, [selectedCategory, selectedLocation, priceRange, sortBy, searchTerm, setSearchParams]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem 6rem 1rem' }}>

      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        className="animate-fade-in-up"
        style={{
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '180px', height: '180px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '20%',
          width: '100px', height: '100px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '50%',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Duka la Mtandaoni
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
            📦 Bidhaa Zote
          </h1>
          <p style={{ opacity: 0.85, fontSize: '1rem', maxWidth: '500px' }}>
            Tafuta na uchague bidhaa unayohitaji kutoka kwa wauzaji <strong>Tanzania nzima</strong>
          </p>
          <div style={{
            marginTop: '1.25rem',
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50px',
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            gap: '1rem',
          }}>
            <span>🏪 {products.length} Bidhaa</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>📂 {categories.length} Kategoria</span>
          </div>
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
          marginBottom: '2rem',
          border: '1px solid rgba(124,58,237,0.08)',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <span style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
            fontSize: '1.1rem', pointerEvents: 'none',
          }}>🔍</span>
          <input
            type="text"
            id="products-search"
            placeholder="Tafuta bidhaa, muuzaji au brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 2.8rem',
              border: `2px solid ${searchFocused ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '14px',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              boxShadow: searchFocused ? '0 0 0 4px rgba(124,58,237,0.1)' : 'none',
              background: 'white',
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#999',
              }}
            >✕</button>
          )}
        </div>

        {/* Selects Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedCategory ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedCategory ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: selectedCategory ? '#7c3aed' : '#374151',
              fontWeight: selectedCategory ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">📂 Kategoria Zote</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name} ({c.count})</option>)}
          </select>

          <select
            id="filter-location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedLocation && selectedLocation !== 'Yote' ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedLocation && selectedLocation !== 'Yote' ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: selectedLocation && selectedLocation !== 'Yote' ? '#7c3aed' : '#374151',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {locations.map(l => <option key={l} value={l}>{l === 'Yote' ? '📍 Eneo Lote' : `📍 ${l}`}</option>)}
          </select>

          <select
            id="filter-price"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${priceRange ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: priceRange ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: priceRange ? '#7c3aed' : '#374151',
              fontWeight: priceRange ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">💰 Bei Zote</option>
            <option value="under50k">Chini ya TSh 50,000</option>
            <option value="50k-100k">TSh 50,000 - 100,000</option>
            <option value="100k-200k">TSh 100,000 - 200,000</option>
            <option value="200k-500k">TSh 200,000 - 500,000</option>
            <option value="above500k">Zaidi ya TSh 500,000</option>
          </select>

          <select
            id="filter-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${sortBy ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: sortBy ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: sortBy ? '#7c3aed' : '#374151',
              fontWeight: sortBy ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">📊 Panga Kwa</option>
            <option value="newest">🆕 Mpya Kwanza</option>
            <option value="price_asc">💰 Bei: Chini → Juu</option>
            <option value="price_desc">💰 Bei: Juu → Chini</option>
            <option value="views">👁️ Maarufu Zaidi</option>
            <option value="name_asc">📛 Jina A-Z</option>
          </select>
        </div>

        {/* Results row + view toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              color: 'white',
              borderRadius: '50px',
              padding: '0.2rem 0.7rem',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}>{filteredProducts.length}</span>
            bidhaa zimepatikana
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex', gap: '0.2rem',
              background: '#f3f4f6',
              padding: '0.2rem',
              borderRadius: '10px',
            }}>
              {[
                { mode: 'grid', icon: '⊞', label: 'Grid' },
                { mode: 'list', icon: '≡', label: 'List' },
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  id={`view-${mode}`}
                  onClick={() => setViewMode(mode)}
                  style={{
                    background: viewMode === mode ? '#7c3aed' : 'transparent',
                    color: viewMode === mode ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: viewMode === mode ? 700 : 400,
                    transition: 'all 0.2s',
                  }}
                >{icon} {label}</button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                id="clear-filters-btn"
                onClick={clearFilters}
                style={{
                  background: 'linear-gradient(135deg,#fce7f3,#ede9fe)',
                  border: 'none',
                  color: '#7c3aed',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
              >
                ✕ Futa Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY QUICK CHIPS ── */}
      <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <button
          onClick={() => setSelectedCategory('')}
          style={{
            background: !selectedCategory ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'white',
            color: !selectedCategory ? 'white' : '#6b7280',
            border: !selectedCategory ? 'none' : '1px solid #e5e7eb',
            padding: '0.4rem 1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.2s',
            boxShadow: !selectedCategory ? '0 4px 10px rgba(124,58,237,0.25)' : 'none',
          }}
        >
          🏪 Zote
        </button>
        {categories.slice(0, 9).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            style={{
              background: selectedCategory === cat.name ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'white',
              color: selectedCategory === cat.name ? 'white' : '#374151',
              border: selectedCategory === cat.name ? 'none' : '1px solid #e5e7eb',
              padding: '0.4rem 1rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: selectedCategory === cat.name ? 600 : 400,
              transition: 'all 0.2s',
              boxShadow: selectedCategory === cat.name ? '0 4px 10px rgba(124,58,237,0.25)' : 'none',
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && filteredProducts.length > 0 && (
        <>
          <div
            key={`grid-${animKey}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            {displayedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                id="load-more-grid"
                onClick={loadMore}
                style={{
                  background: 'white',
                  border: '2px solid #7c3aed',
                  color: '#7c3aed',
                  padding: '0.85rem 2.5rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg,#7c3aed,#ec4899)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,58,237,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#7c3aed';
                  e.currentTarget.style.borderColor = '#7c3aed';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(124,58,237,0.1)';
                }}
              >
                Bidhaa Zaidi ↓ &nbsp;
                <span style={{ opacity: 0.7, fontWeight: 400, fontSize: '0.8rem' }}>
                  ({visibleProducts} / {filteredProducts.length})
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === 'list' && filteredProducts.length > 0 && (
        <>
          <div
            key={`list-${animKey}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}
          >
            {displayedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
              >
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,58,237,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
                  }}
                  onClick={() => window.location.href = `/product/${product.id}`}
                >
                  <div style={{
                    width: '90px', height: '90px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg,#f5f3ff,#fae8ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '2.5rem' }}>📦</span>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <span style={{
                      fontSize: '0.65rem', color: '#ec4899', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      {product.category}
                    </span>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', marginTop: '0.1rem', color: '#1f1f2e' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                      {product.description?.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: '#9ca3af', flexWrap: 'wrap' }}>
                      <span>🏪 {product.seller?.business_name}</span>
                      <span>📍 {product.seller?.location?.split(',')[0]}</span>
                      <span>👁️ {product.views || 0} maoni</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '120px', flexShrink: 0 }}>
                    <p style={{ color: '#7c3aed', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                      TSh {product.price.toLocaleString()}
                    </p>
                    {product.seller?.is_verified && (
                      <span style={{
                        background: 'rgba(16,185,129,0.1)',
                        color: '#059669',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '50px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        display: 'inline-block',
                      }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center' }}>
              <button
                id="load-more-list"
                onClick={loadMore}
                style={{
                  background: 'white',
                  border: '2px solid #7c3aed',
                  color: '#7c3aed',
                  padding: '0.85rem 2.5rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg,#7c3aed,#ec4899)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#7c3aed';
                  e.currentTarget.style.borderColor = '#7c3aed';
                }}
              >
                Bidhaa Zaidi ↓ ({visibleProducts} / {filteredProducts.length})
              </button>
            </div>
          )}
        </>
      )}

      {/* ── EMPTY STATE ── */}
      {filteredProducts.length === 0 && (
        <div
          className="animate-fade-in-up"
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '5rem', marginBottom: '1.25rem', lineHeight: 1 }}>🔍</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1f1f2e' }}>
            Hakuna bidhaa zilizopatikana
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem' }}>
            Jaribu kubadilisha maneno ya utafutaji au ondoa baadhi ya filters ulizoweka.
          </p>
          <button
            id="empty-clear-btn"
            onClick={clearFilters}
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              color: 'white',
              padding: '0.85rem 2.5rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 8px 25px rgba(124,58,237,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🔄 Futa Filters Zote
          </button>
        </div>
      )}
    </div>
  );
}