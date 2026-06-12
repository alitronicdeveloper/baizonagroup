import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { wholesaleShops, products } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ShopDetailPage() {
  const { id } = useParams();
  const shop = wholesaleShops.find(s => s.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get shop products (bidhaa za duka hili)
  const shopProducts = products.filter(p => {
    // Match by seller name or product name
    return p.seller?.business_name?.toLowerCase().includes(shop?.name.toLowerCase()) ||
           shop?.products?.some(sp => sp.name === p.name);
  });

  if (!shop) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>Soko Halikupatikana</h1>
        <Link to="/shops">← Rudi kwa Maduka</Link>
      </div>
    );
  }

  const handleQuantityChange = (productId, newQty) => {
    if (newQty >= 1) {
      setQuantity({ ...quantity, [productId]: newQty });
    }
  };

  const handleAddToCart = (product) => {
    const qty = quantity[product.id] || 1;
    addToCart(product, qty);
    alert(`${qty} × ${product.name} imeongezwa kwenye kikapu!`);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(shop.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Halo, ninaomba taarifa zaidi kuhusu bidhaa za ${shop.name} kutoka Baizona Group.`;
    window.open(`https://wa.me/${shop.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${shop.phone}`;
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 5rem 1rem' }}>
      
      {/* Back Button */}
      <Link to="/shops" style={{ color: '#7c3aed', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
        ← Rudi kwa Maduka
      </Link>

      {/* Shop Header */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        {shop.featured && (
          <span style={{
            display: 'inline-block',
            background: '#ec4899',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            ⭐ Maarufu
          </span>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2rem' }}>{shop.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#f59e0b' }}>{getRatingStars(shop.rating)}</span>
            <span style={{ color: '#666', fontSize: '0.8rem' }}>({shop.reviews} reviews)</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ color: '#666' }}>📍 {shop.location}</span>
          <span style={{ color: '#7c3aed' }}>🏷️ {shop.type}</span>
          <span style={{ color: '#10b981' }}>🕒 {shop.open_hours}</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>MADUKA</div>
            <div style={{ fontWeight: 'bold' }}>{shop.shops}</div>
          </div>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>WATEJA KWA SIKU</div>
            <div style={{ fontWeight: 'bold' }}>{shop.daily_customers}</div>
          </div>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>MWAKA</div>
            <div style={{ fontWeight: 'bold' }}>{shop.years}+</div>
          </div>
        </div>

        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>
          {shop.description}
        </p>

        {/* Verified Badge */}
        {shop.verified && (
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              background: '#dcfce7',
              color: '#166534',
              padding: '0.25rem 0.75rem',
              borderRadius: '50px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              ✅ Verified Market
            </span>
          </div>
        )}

        {/* Contact Section */}
        <div style={{ marginTop: '1rem' }}>
          {!showPhone ? (
            <button
              onClick={() => setShowPhone(true)}
              style={{
                background: '#7c3aed',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              📞 Onyesha Namba ya Simu
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{
                background: '#f0f0f0',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}>
                {shop.phone}
              </div>
              <button onClick={handleCall} style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>📞 Call</button>
              <button onClick={handleWhatsApp} style={{ background: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>💬 WhatsApp</button>
              <button onClick={handleCopyPhone} style={{ background: '#666', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>{copied ? '✓ Nakiliwa' : '📋 Nakili'}</button>
            </div>
          )}
        </div>
      </div>

      {/* Products Section - Bidhaa Zote za Duka */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦 Bidhaa Zinazopatikana {shop.name}</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Bidhaa mbalimbali zinazouzwa katika soko hili</p>

      {shopProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {shopProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s'
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  height: '150px',
                  background: 'linear-gradient(135deg, #f3e8ff, #e8f4e8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>
                  📦
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.name}</h3>
                  <p style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    TSh {product.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                    {product.description?.substring(0, 80)}...
                  </p>
                </div>
              </Link>
              <div style={{ padding: '0 1rem 1rem', display: 'flex', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0f0f0', borderRadius: '8px' }}>
                  <button
                    onClick={() => handleQuantityChange(product.id, (quantity[product.id] || 1) - 1)}
                    style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >-</button>
                  <span style={{ minWidth: '30px', textAlign: 'center' }}>{quantity[product.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, (quantity[product.id] || 1) + 1)}
                    style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >+</button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    flex: 1,
                    background: '#7c3aed',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  🛒 Ongeza
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '20px' }}>
          <p>Hakuna bidhaa zilizopatikana kutoka kwa soko hili kwa sasa.</p>
          <button
            onClick={() => handleWhatsApp()}
            style={{
              marginTop: '1rem',
              background: '#25D366',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            💬 Wasiliana na Muuzaji
          </button>
        </div>
      )}
    </div>
  );
}