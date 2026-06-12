import { useParams, Link, useNavigate } from 'react-router-dom';
import { sellers, products } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';
import { useState } from 'react';

export default function SellerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const seller = sellers.find(s => s.id === parseInt(id));
  const sellerProducts = products.filter(p => p.seller_id === seller?.id);
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!seller) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.25rem', lineHeight: 1 }}>🏪</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1f1f2e' }}>Muuzaji Haikupatikana</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Muuzaji unayemtafuta haipo kwenye mfumo wetu.</p>
        <Link to="/products" style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: 'white', padding: '0.85rem 2rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
          ← Rudi kwenye Bidhaa
        </Link>
      </div>
    );
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(seller.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleWhatsApp = () => window.open(`https://wa.me/${seller.phone}`, '_blank');
  const handleCall = () => { window.location.href = `tel:${seller.phone}`; };

  const totalViews = sellerProducts.reduce((sum, p) => sum + (p.views || 0), 0);
  const avgPrice = sellerProducts.length > 0
    ? Math.round(sellerProducts.reduce((sum, p) => sum + p.price, 0) / sellerProducts.length)
    : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem 6rem' }}>

      {/* Breadcrumb */}
      <div className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c3aed', fontWeight: 600, padding: 0, fontSize: '0.85rem' }}>
          ← Rudi
        </button>
        <span>/</span>
        <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Nyumbani</Link>
        <span>/</span>
        <span style={{ color: '#374151' }}>{seller.business_name}</span>
      </div>

      {/* ── SELLER HERO CARD ── */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          background: 'linear-gradient(135deg, #1f1f2e 0%, #7c3aed 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: 'white',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '5%', width: '120px', height: '120px', background: 'rgba(236,72,153,0.15)', borderRadius: '50%' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
            flexShrink: 0,
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>
            🏪
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, margin: 0 }}>
                {seller.business_name}
              </h1>
              {seller.is_verified && (
                <span style={{ background: 'rgba(16,185,129,0.25)', color: '#6ee7b7', padding: '0.2rem 0.7rem', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(16,185,129,0.3)' }}>
                  ✓ Amethibitishwa
                </span>
              )}
            </div>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.4rem' }}>📍 {seller.location}</p>
            {seller.description && (
              <p style={{ opacity: 0.75, fontSize: '0.88rem', lineHeight: 1.5, maxWidth: '500px' }}>
                {seller.description}
              </p>
            )}
          </div>

          {/* Stats chips */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Bidhaa', value: sellerProducts.length, icon: '📦' },
              { label: 'Maoni', value: totalViews.toLocaleString(), icon: '👁️' },
              { label: 'Bei ya Wastani', value: `TSh ${avgPrice.toLocaleString()}`, icon: '💰' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '0.75rem 1.1rem', textAlign: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{icon} {label}</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT + INFO GRID ── */}
      <div
        className="animate-fade-in-up delay-200"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}
      >
        {/* Contact Card */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1f1f2e', paddingBottom: '0.75rem', borderBottom: '2px solid #f3f4f6' }}>
            📞 Wasiliana na Muuzaji
          </h3>

          {!showPhone ? (
            <button
              onClick={() => setShowPhone(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color: 'white',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '50px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 6px 20px rgba(124,58,237,0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              👁️ Onyesha Namba ya Simu
            </button>
          ) : (
            <div>
              <div style={{
                background: '#f5f3ff',
                borderRadius: '14px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Namba ya Simu</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7c3aed' }}>{seller.phone}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleCall} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  📞 Piga Simu
                </button>
                <button onClick={handleWhatsApp} style={{ flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  💬 WhatsApp
                </button>
                <button onClick={handleCopyPhone} style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '0.7rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}>
                  {copied ? '✓' : '📋'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Seller Info Card */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1f1f2e', paddingBottom: '0.75rem', borderBottom: '2px solid #f3f4f6' }}>
            ℹ️ Taarifa za Muuzaji
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: '🏪', label: 'Jina la Biashara', value: seller.business_name },
              { icon: '📍', label: 'Eneo', value: seller.location },
              { icon: seller.is_verified ? '✅' : '⏳', label: 'Hali', value: seller.is_verified ? 'Amethibitishwa' : 'Inasubiri Uthibitisho' },
              { icon: '📦', label: 'Bidhaa', value: `${sellerProducts.length} bidhaa zilizoorodheshwa` },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                  <p style={{ fontWeight: 600, color: '#1f1f2e', fontSize: '0.9rem' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS SECTION ── */}
      <div className="animate-fade-in-up delay-300">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f1f2e' }}>
            📦 Bidhaa za {seller.business_name}
            <span style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: 'white', padding: '0.15rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', marginLeft: '0.5rem', fontWeight: 700 }}>
              {sellerProducts.length}
            </span>
          </h2>
          <Link to="/products" style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            Tazama Bidhaa Zote →
          </Link>
        </div>

        {sellerProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {sellerProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>📦</div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1f1f2e' }}>Hakuna bidhaa bado</h3>
            <p style={{ color: '#6b7280' }}>Muuzaji huyu hajaorodhesha bidhaa yoyote bado.</p>
          </div>
        )}
      </div>
    </div>
  );
}