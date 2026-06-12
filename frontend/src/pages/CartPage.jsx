import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    let message = "Halo, ninaomba kununua bidhaa zifuatazo kutoka Baizona Group:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - TSh ${item.price.toLocaleString()} x ${item.quantity} = TSh ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\nJumla Kuu: TSh ${cartTotal.toLocaleString()}\n`;
    message += `\nTafadhali niwasiliane kwa usafiri na malipo. Asante!`;
    const sellerPhone = cartItems[0]?.sellerPhone || '255698656019';
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  /* ── EMPTY STATE ── */
  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 1rem 6rem', textAlign: 'center' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1.5rem', lineHeight: 1 }}>🛒</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1f1f2e' }}>
          Kikapu Chako Ni Tupu
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2.5rem', fontSize: '1rem' }}>
          Hujaweka bidhaa yoyote kwenye kikapu chako bado.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/products"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              color: 'white',
              padding: '0.85rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(124,58,237,0.3)',
            }}
          >
            🛍️ Anza Kununua
          </Link>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              color: '#374151',
              padding: '0.85rem 2rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            ← Rudi Nyuma
          </button>
        </div>
      </div>
    );
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>

      {/* ── HEADER ── */}
      <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#7c3aed', fontWeight: 600, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem',
            padding: 0,
          }}
        >
          ← Rudi Kununua
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#1f1f2e', marginBottom: '0.2rem' }}>
              🛒 Kikapu Chako
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Una bidhaa <strong>{cartItems.length}</strong> ({totalItems} vitu) kwenye kikapu
            </p>
          </div>
          <button
            onClick={clearCart}
            style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#ef4444', cursor: 'pointer',
              padding: '0.5rem 1.25rem', borderRadius: '50px',
              fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
          >
            🗑️ Futa Kikapu Chote
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 340px',
        gap: '1.5rem',
        alignItems: 'start',
      }}>

        {/* ── CART ITEMS ── */}
        <div className="animate-fade-in-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 60}ms`,
                background: 'white',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,58,237,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'}
            >
              {/* Product Image */}
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                style={{
                  width: '80px', height: '80px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg,#f5f3ff,#fae8ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2rem' }}>📦</span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: '140px' }}>
                <p
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{
                    fontWeight: 700, fontSize: '0.95rem', color: '#1f1f2e',
                    marginBottom: '0.2rem', cursor: 'pointer', lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.4rem' }}>
                  🏪 {item.seller || item.seller?.business_name || 'Muuzaji'}
                </p>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#7c3aed' }}>
                  TSh {item.price.toLocaleString()} / kitu
                </p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: '34px', height: '34px',
                    borderRadius: '8px',
                    border: '1.5px solid #e5e7eb',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#7c3aed'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                >
                  −
                </button>
                <span style={{
                  minWidth: '38px', textAlign: 'center',
                  fontWeight: 700, fontSize: '1rem', color: '#1f1f2e',
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '34px', height: '34px',
                    borderRadius: '8px',
                    border: '1.5px solid #e5e7eb',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#7c3aed'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{ textAlign: 'right', minWidth: '110px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1f1f2e' }}>
                  TSh {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: '#fef2f2', border: 'none', cursor: 'pointer',
                  width: '34px', height: '34px', borderRadius: '8px',
                  fontSize: '1rem', color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
                title="Toa bidhaa"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* ── ORDER SUMMARY SIDEBAR ── */}
        <div
          className="animate-fade-in-up delay-200"
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.08)',
            position: 'sticky',
            top: '1rem',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: '#1f1f2e', paddingBottom: '0.75rem', borderBottom: '2px solid #f3f4f6' }}>
            📋 Muhtasari wa Agizo
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280' }}>
              <span>Bidhaa ({cartItems.length} aina)</span>
              <span>{totalItems} vitu</span>
            </div>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af' }}>
                <span style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name} ×{item.quantity}
                </span>
                <span style={{ flexShrink: 0 }}>TSh {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: '#f3f4f6', margin: '1rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Jumla Ndogo</span>
            <span style={{ fontWeight: 600 }}>TSh {cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Usafirishaji</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>Ataeleza muuzaji</span>
          </div>

          <div style={{
            background: 'linear-gradient(135deg,#f5f3ff,#fce7f3)',
            borderRadius: '14px',
            padding: '1rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#1f1f2e', fontSize: '1rem' }}>Jumla Kuu</span>
              <span style={{ fontWeight: 800, color: '#7c3aed', fontSize: '1.3rem' }}>
                TSh {cartTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#92400e', display: 'flex', gap: '0.5rem' }}>
            <span>⚠️</span>
            <span>Baada ya kutuma agizo, utawasiliana na muuzaji kwa WhatsApp kwa malipo na usafirishaji.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={handleWhatsAppOrder}
              style={{
                background: '#25D366',
                color: 'white',
                padding: '0.9rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(37,211,102,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.3)'; }}
            >
              💬 Wasiliana na Muuzaji
            </button>
            <Link
              to="/products"
              style={{
                background: 'white',
                border: '2px solid #7c3aed',
                color: '#7c3aed',
                padding: '0.75rem',
                borderRadius: '50px',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                display: 'block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#7c3aed'; }}
            >
              🛍️ Endelea Kununua
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: minmax(0,1fr) 340px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}