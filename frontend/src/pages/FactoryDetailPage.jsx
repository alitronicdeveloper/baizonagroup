import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { factoriesData, products } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function FactoryDetailPage() {
  const { id } = useParams();
  const factory = factoriesData.find(f => f.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get factory products (bidhaa za kiwanda hiki)
  const factoryProducts = products.filter(p => p.seller_id === factory?.id);

  if (!factory) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>Kiwanda Hakikupatikana</h1>
        <Link to="/factories">← Rudi kwa Viwanda</Link>
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
    navigator.clipboard.writeText(factory.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Halo, ninaomba taarifa zaidi kuhusu bidhaa za ${factory.name} kutoka Baizona Group.`;
    window.open(`https://wa.me/${factory.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${factory.phone}`;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 5rem 1rem' }}>
      
      {/* Back Button */}
      <Link to="/factories" style={{ color: '#7c3aed', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
        ← Rudi kwa Viwanda
      </Link>

      {/* Factory Header */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        {factory.featured && (
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
            ⭐ Featured Kiwanda
          </span>
        )}
        
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{factory.name}</h1>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ color: '#666' }}>📍 {factory.location}</span>
          <span style={{ color: '#7c3aed' }}>🏷️ {factory.sector}</span>
          <span style={{ color: '#10b981' }}>📅 Founded {factory.founded}</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>UZALISHAJI</div>
            <div style={{ fontWeight: 'bold' }}>{factory.production}</div>
          </div>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>WAFANYAKAZI</div>
            <div style={{ fontWeight: 'bold' }}>{factory.employees}</div>
          </div>
          <div style={{ background: '#f3e8ff', padding: '0.75rem 1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>BIDHAA</div>
            <div style={{ fontWeight: 'bold' }}>{factoryProducts.length}</div>
          </div>
        </div>

        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>
          {factory.description}
        </p>

        {/* Certifications */}
        {factory.certifications && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {factory.certifications.map((cert, idx) => (
              <span key={idx} style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.25rem 0.75rem',
                borderRadius: '50px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                ✅ {cert}
              </span>
            ))}
            {factory.exports && (
              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '0.25rem 0.75rem',
                borderRadius: '50px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                📦 Export: {factory.exports.join(', ')}
              </span>
            )}
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
                {factory.phone}
              </div>
              <button onClick={handleCall} style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>📞 Call</button>
              <button onClick={handleWhatsApp} style={{ background: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>💬 WhatsApp</button>
              <button onClick={handleCopyPhone} style={{ background: '#666', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>{copied ? '✓ Nakiliwa' : '📋 Nakili'}</button>
            </div>
          )}
        </div>
      </div>

      {/* Products Section - Bidhaa Zote za Kiwanda */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📦 Bidhaa Zote za {factory.name}</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Bidhaa zote zinazozalishwa na kiwanda hiki</p>

      {factoryProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {factoryProducts.map((product) => (
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
          <p>Hakuna bidhaa zilizopatikana kutoka kwa kiwanda hiki kwa sasa.</p>
        </div>
      )}
    </div>
  );
}