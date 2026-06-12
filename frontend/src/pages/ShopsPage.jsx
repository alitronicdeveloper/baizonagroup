import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wholesaleShops } from '../data/mockData';

const regions = ["Yote", "Dar es Salaam", "Mwanza", "Arusha", "Zanzibar", "Dodoma", "Mbeya", "Tanga", "Morogoro"];
const shopTypes = ["Yote", "Nguo", "Vyakula", "Mazao", "Viatu", "Vifaa vya Nyumbani"];

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Yote');
  const [selectedType, setSelectedType] = useState('Yote');
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredShops = wholesaleShops.filter(shop => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'Yote' || shop.region === selectedRegion;
    const matchesType = selectedType === 'Yote' || shop.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesRegion && matchesType;
  });

  const clearFilters = () => { setSearchTerm(''); setSelectedRegion('Yote'); setSelectedType('Yote'); };
  const hasFilters = searchTerm || selectedRegion !== 'Yote' || selectedType !== 'Yote';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>

      {/* ── HEADER ── */}
      <div
        className="animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: 'white',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '10%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.8, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            B2B Marketplace
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
            🏪 Maduka ya Jumla Tanzania
          </h1>
          <p style={{ opacity: 0.85 }}>Vituo vikuu vya biashara kutoka mikoa yote Tanzania</p>
          <div style={{
            marginTop: '1.25rem',
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '50px',
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            gap: '1rem',
          }}>
            <span>🏪 {wholesaleShops.length} Maduka</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>📍 {regions.length - 1} Mikoa</span>
          </div>
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 24px rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.08)',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Tafuta soko, mkoa au aina ya bidhaa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 2.8rem',
              border: `2px solid ${searchFocused ? '#3b82f6' : '#e5e7eb'}`,
              borderRadius: '14px',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              boxShadow: searchFocused ? '0 0 0 4px rgba(59,130,246,0.1)' : 'none',
              background: 'white',
            }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.1rem' }}>✕</button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedRegion !== 'Yote' ? '#3b82f6' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedRegion !== 'Yote' ? '#eff6ff' : 'white',
              fontSize: '0.875rem',
              color: selectedRegion !== 'Yote' ? '#1d4ed8' : '#374151',
              fontWeight: selectedRegion !== 'Yote' ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {regions.map(r => <option key={r} value={r}>{r === 'Yote' ? '📍 Mikoa Yote' : `📍 ${r}`}</option>)}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedType !== 'Yote' ? '#3b82f6' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedType !== 'Yote' ? '#eff6ff' : 'white',
              fontSize: '0.875rem',
              color: selectedType !== 'Yote' ? '#1d4ed8' : '#374151',
              fontWeight: selectedType !== 'Yote' ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {shopTypes.map(t => <option key={t} value={t}>{t === 'Yote' ? '🏷️ Aina Zote' : `🏷️ ${t}`}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', color: 'white', borderRadius: '50px', padding: '0.2rem 0.7rem', fontWeight: 700, fontSize: '0.8rem' }}>
              {filteredShops.length}
            </span>
            maduka yamepatikana
          </div>
          {hasFilters && (
            <button onClick={clearFilters} style={{ background: '#eff6ff', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
              ✕ Futa Filters
            </button>
          )}
        </div>
      </div>

      {/* ── SHOPS LIST ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredShops.map((shop, index) => (
          <Link
            key={shop.id}
            to={`/shop/${shop.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="animate-fade-in-up"
              style={{
                animationDelay: `${Math.min(index * 60, 400)}ms`,
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: shop.featured ? '2px solid #ec4899' : '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(59,130,246,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
            >
              {/* Decorative accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '4px', height: '100%',
                background: shop.featured ? 'linear-gradient(135deg,#ec4899,#7c3aed)' : 'linear-gradient(135deg,#3b82f6,#7c3aed)',
                borderRadius: '20px 0 0 20px',
              }} />

              <div style={{ paddingLeft: '0.75rem' }}>
                {shop.featured && (
                  <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: 'white', padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 }}>
                      ⭐ Maarufu
                    </span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1f1f2e' }}>
                      {shop.name}
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                      <span style={{ color: '#6b7280', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📍 {shop.location}</span>
                      <span style={{ color: '#7c3aed', fontSize: '0.82rem' }}>🏷️ {shop.type.substring(0, 30)}</span>
                      <span style={{ color: '#10b981', fontSize: '0.82rem' }}>🕒 {shop.open_hours}</span>
                    </div>
                    <p style={{ color: '#6b7280', lineHeight: 1.5, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                      {shop.description}
                    </p>

                    {shop.products?.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600 }}>Bidhaa:</span>
                        {shop.products.slice(0, 3).map((product, idx) => (
                          <span key={idx} style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', color: '#374151' }}>
                            {product.name}
                          </span>
                        ))}
                        {shop.products.length > 3 && (
                          <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>+{shop.products.length - 3} zaidi</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ background: 'linear-gradient(135deg,#f5f3ff,#eff6ff)', padding: '0.75rem 1rem', borderRadius: '14px', marginBottom: '0.5rem', minWidth: '80px' }}>
                      <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maduka</div>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#7c3aed' }}>{shop.shops}</div>
                    </div>
                    <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 600 }}>Tazama →</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredShops.length === 0 && (
        <div className="animate-fade-in-up" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>🏪</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hakuna soko lililopatikana</h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Jaribu kubadilisha search au ondoa filters zako</p>
          <button
            onClick={clearFilters}
            style={{ background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', color: 'white', padding: '0.85rem 2.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 700, boxShadow: '0 8px 20px rgba(59,130,246,0.3)' }}
          >
            🔄 Futa Filters Zote
          </button>
        </div>
      )}
    </div>
  );
}