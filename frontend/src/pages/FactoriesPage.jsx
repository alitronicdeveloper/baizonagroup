import { useState } from 'react';
import { Link } from 'react-router-dom';
import { factoriesData } from '../data/mockData';

const regions = ["Yote", "Dar es Salaam", "Tanga", "Morogoro", "Mwanza", "Arusha", "Mbeya"];
const sectors = ["Yote", "Chakula", "Ujenzi", "Vinywaji", "Nguo", "Kemikali"];

const sectorColors = {
  Chakula: '#f59e0b',
  Ujenzi: '#6b7280',
  Vinywaji: '#3b82f6',
  Nguo: '#ec4899',
  Kemikali: '#10b981',
};

export default function FactoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Yote');
  const [selectedSector, setSelectedSector] = useState('Yote');
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredFactories = factoriesData.filter(factory => {
    const matchesSearch =
      factory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factory.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'Yote' || factory.region === selectedRegion;
    const matchesSector = selectedSector === 'Yote' || factory.sector === selectedSector;
    return matchesSearch && matchesRegion && matchesSector;
  });

  const clearFilters = () => { setSearchTerm(''); setSelectedRegion('Yote'); setSelectedSector('Yote'); };
  const hasFilters = searchTerm || selectedRegion !== 'Yote' || selectedSector !== 'Yote';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>

      {/* ── HEADER ── */}
      <div
        className="animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, #1f1f2e 0%, #7c3aed 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: 'white',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '15%', width: '100px', height: '100px', background: 'rgba(124,58,237,0.3)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Uzalishaji wa Kitaifa
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
            🏭 Viwanda vya Tanzania
          </h1>
          <p style={{ opacity: 0.8 }}>Viongozi wa uzalishaji Tanzania na Afrika Mashariki</p>
          <div style={{
            marginTop: '1.25rem',
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: '50px',
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            gap: '1rem',
          }}>
            <span>🏭 {factoriesData.length} Viwanda</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>🏷️ {sectors.length - 1} Sekta</span>
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
          boxShadow: '0 4px 24px rgba(31,31,46,0.08)',
          border: '1px solid rgba(124,58,237,0.08)',
        }}
      >
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Tafuta kiwanda, sekta au eneo..."
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
          {searchTerm && <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.1rem' }}>✕</button>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedRegion !== 'Yote' ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedRegion !== 'Yote' ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: selectedRegion !== 'Yote' ? '#7c3aed' : '#374151',
              fontWeight: selectedRegion !== 'Yote' ? 600 : 400,
              cursor: 'pointer', outline: 'none',
            }}
          >
            {regions.map(r => <option key={r} value={r}>{r === 'Yote' ? '📍 Mikoa Yote' : `📍 ${r}`}</option>)}
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: `1px solid ${selectedSector !== 'Yote' ? '#7c3aed' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: selectedSector !== 'Yote' ? '#f5f3ff' : 'white',
              fontSize: '0.875rem',
              color: selectedSector !== 'Yote' ? '#7c3aed' : '#374151',
              fontWeight: selectedSector !== 'Yote' ? 600 : 400,
              cursor: 'pointer', outline: 'none',
            }}
          >
            {sectors.map(s => <option key={s} value={s}>{s === 'Yote' ? '🏷️ Sekta Zote' : `🏷️ ${s}`}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: 'linear-gradient(135deg,#1f1f2e,#7c3aed)', color: 'white', borderRadius: '50px', padding: '0.2rem 0.7rem', fontWeight: 700, fontSize: '0.8rem' }}>
              {filteredFactories.length}
            </span>
            viwanda vimepatikana
          </div>
          {hasFilters && (
            <button onClick={clearFilters} style={{ background: '#f5f3ff', border: 'none', color: '#7c3aed', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
              ✕ Futa Filters
            </button>
          )}
        </div>
      </div>

      {/* Sector chips */}
      <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {sectors.map(sector => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            style={{
              background: selectedSector === sector ? 'linear-gradient(135deg,#1f1f2e,#7c3aed)' : 'white',
              color: selectedSector === sector ? 'white' : '#374151',
              border: selectedSector === sector ? 'none' : '1px solid #e5e7eb',
              padding: '0.35rem 1rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: selectedSector === sector ? 700 : 400,
              transition: 'all 0.2s',
              boxShadow: selectedSector === sector ? '0 4px 10px rgba(124,58,237,0.25)' : 'none',
            }}
          >
            {sector === 'Yote' ? '🏭 Zote' : sector}
          </button>
        ))}
      </div>

      {/* ── FACTORIES LIST ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredFactories.map((factory, index) => {
          const accentColor = sectorColors[factory.sector] || '#7c3aed';
          return (
            <Link
              key={factory.id}
              to={`/factory/${factory.id}`}
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
                  border: factory.featured ? '2px solid #ec4899' : '1px solid rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: `linear-gradient(to bottom, ${accentColor}, #7c3aed)`, borderRadius: '20px 0 0 20px' }} />

                <div style={{ paddingLeft: '0.75rem' }}>
                  {factory.featured && (
                    <span style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: 'white', padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.75rem' }}>
                      ⭐ Featured
                    </span>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f1f2e' }}>{factory.name}</h2>
                        <span style={{ background: `${accentColor}18`, color: accentColor, padding: '0.15rem 0.6rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                          {factory.sector}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>📍 {factory.location}</span>
                        <span style={{ color: '#10b981', fontSize: '0.82rem' }}>📅 Est. {factory.founded}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>👥 {factory.employees || '50+'} Wafanyakazi</span>
                      </div>

                      <p style={{ color: '#6b7280', lineHeight: 1.5, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                        {factory.description}
                      </p>

                      {factory.products?.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600 }}>Bidhaa:</span>
                          {factory.products.slice(0, 3).map((p, idx) => (
                            <span key={idx} style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', color: '#374151' }}>
                              {p.name}
                            </span>
                          ))}
                          {factory.products.length > 3 && (
                            <span style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>+{factory.products.length - 3} zaidi</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ background: `linear-gradient(135deg,${accentColor}15,#f5f3ff)`, padding: '0.75rem 1rem', borderRadius: '14px', marginBottom: '0.5rem', minWidth: '90px' }}>
                        <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uzalishaji</div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: accentColor, marginTop: '0.2rem' }}>{factory.production}</div>
                      </div>
                      <div style={{ color: '#7c3aed', fontSize: '0.8rem', fontWeight: 600 }}>Angalia →</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── EMPTY STATE ── */}
      {filteredFactories.length === 0 && (
        <div className="animate-fade-in-up" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>🏭</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hakuna kiwanda kilichopatikana</h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Jaribu kubadilisha search au ondoa filters zako</p>
          <button
            onClick={clearFilters}
            style={{ background: 'linear-gradient(135deg,#1f1f2e,#7c3aed)', color: 'white', padding: '0.85rem 2.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 700, boxShadow: '0 8px 20px rgba(124,58,237,0.3)' }}
          >
            🔄 Futa Filters Zote
          </button>
        </div>
      )}
    </div>
  );
}