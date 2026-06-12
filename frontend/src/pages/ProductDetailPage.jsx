import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, reviews as allReviews } from '../data/mockData';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [localReviews, setLocalReviews] = useState([]);
  const { addToCart } = useCart();

  // Recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (product) {
      const saved = localStorage.getItem('baizona_recently_viewed');
      let recent = saved ? JSON.parse(saved) : [];
      recent = [product, ...recent.filter(p => p.id !== product.id)].slice(0, 4);
      localStorage.setItem('baizona_recently_viewed', JSON.stringify(recent));
      setRecentlyViewed(recent);
    }

    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setLocalReviews(JSON.parse(savedReviews));
    }
  }, [id, product]);

  if (!product) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h1>Bidhaa Haikupatikana</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>Bidhaa unayoitafuta haipo au imefutwa</p>
        <Link to="/products" style={{ background: '#7c3aed', color: 'white', padding: '0.75rem 2rem', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
          ← Rudi kwenye Bidhaa
        </Link>
      </div>
    );
  }

  const productReviews = [...allReviews.filter(r => r.product_id === product.id), ...localReviews];
  
  const totalRatings = productReviews.length;
  const avgRating = totalRatings > 0 
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
    : 0;
  
  const ratingDistribution = [5,4,3,2,1].map(stars => {
    const count = productReviews.filter(r => r.rating === stars).length;
    return { stars, count, percentage: totalRatings > 0 ? (count / totalRatings) * 100 : 0 };
  });

  // Use actual product images — fallback to a placeholder if none exist
  const productImages = (product.images && product.images.length > 0)
    ? product.images.map((url, i) => ({ url, type: i === 0 ? 'main' : `picha-${i + 1}` }))
    : [
        { url: 'https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400', type: 'main' },
      ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(product.seller.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Halo, ninaomba kununua ${product.name} x${quantity} kwa TSh ${(product.price * quantity).toLocaleString()} kutoka Baizona Group. Tafadhali niwasiliane kwa usafiri.`;
    window.open(`https://wa.me/${product.seller.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${product.seller.phone}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Alert imeondolewa - Toast inaonekana automatically kutoka CartContext
  };

  const handleQuantityChange = (newQty) => {
    if (newQty >= 1 && newQty <= (product.stock || 999)) {
      setQuantity(newQty);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      product_id: product.id,
      buyer_name: newReview.name || "Mwamuzi",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };
    const updated = [...localReviews, review];
    setLocalReviews(updated);
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updated));
    setNewReview({ rating: 5, comment: '', name: '' });
    setShowReviewForm(false);
    alert('Asante kwa maoni yako!');
  };

  const getStockStatus = () => {
    const stock = product.stock || 50;
    if (stock <= 0) return { text: "Imekwisha Stock", color: "#ef4444", icon: "❌" };
    if (stock <= 5) return { text: `Zimebakia ${stock} tu!`, color: "#f59e0b", icon: "⚠️" };
    return { text: "Ipo Stock", color: "#10b981", icon: "✅" };
  };

  const stockStatus = getStockStatus();

  const priceTiers = [
    { qty: 1, price: product.price, discount: 0 },
    { qty: 5, price: Math.floor(product.price * 0.95), discount: 5 },
    { qty: 10, price: Math.floor(product.price * 0.9), discount: 10 },
    { qty: 20, price: Math.floor(product.price * 0.85), discount: 15 },
  ];

  const currentTier = priceTiers.reduce((prev, curr) => 
    quantity >= curr.qty ? curr : prev
  );

  const totalPrice = currentTier.price * quantity;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1rem 5rem 1rem' }}>
      
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#7c3aed'
        }}
      >
        ← Rudi Nyuma
      </button>

      <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Nyumbani</Link> / 
        <Link to="/products" style={{ color: '#666', textDecoration: 'none', marginLeft: '0.25rem' }}> Bidhaa</Link> / 
        <Link to={`/products?category=${product.category}`} style={{ color: '#666', textDecoration: 'none', marginLeft: '0.25rem' }}> {product.category}</Link> / 
        <span style={{ marginLeft: '0.25rem', color: '#333' }}> {product.name}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        
        <div>
          <div style={{
            background: '#f8f9fa',
            borderRadius: '16px',
            height: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src={productImages[activeImage]?.url} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            {stockStatus.text.includes('bakia') && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: stockStatus.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {stockStatus.icon} {stockStatus.text}
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{
                  width: '70px',
                  height: '70px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImage === idx ? '2px solid #7c3aed' : '1px solid #ddd',
                  opacity: activeImage === idx ? 1 : 0.6
                }}
              >
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>{'⭐'.repeat(Math.round(avgRating))}{'☆'.repeat(5-Math.round(avgRating))}</span>
              <span style={{ marginLeft: '0.25rem', color: '#666' }}>({totalRatings} reviews)</span>
            </div>
            {product.seller.is_verified && (
              <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem' }}>
                ✓ Verified Seller
              </span>
            )}
            <span style={{ color: '#666', fontSize: '0.85rem' }}>👁️ {product.views || 124} views</span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>
              TSh {currentTier.price.toLocaleString()}
            </span>
            {currentTier.discount > 0 && (
              <>
                <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '0.5rem', fontSize: '1rem' }}>
                  TSh {product.price.toLocaleString()}
                </span>
                <span style={{ background: '#ec4899', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '50px', fontSize: '0.7rem', marginLeft: '0.5rem' }}>
                  -{currentTier.discount}%
                </span>
              </>
            )}
          </div>

          <div style={{ background: '#f3e8ff', padding: '0.75rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>📊 Bei kwa Wingi:</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {priceTiers.map(tier => (
                <div key={tier.qty} style={{
                  background: quantity >= tier.qty ? '#7c3aed' : 'white',
                  color: quantity >= tier.qty ? 'white' : '#333',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  border: '1px solid #ddd'
                }}
                onClick={() => setQuantity(tier.qty)}>
                  {tier.qty}+ pcs: -{tier.discount}%
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold' }}>Kiasi:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
              >-</button>
              <span style={{ width: '50px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
              >+</button>
            </div>
            <span style={{ color: '#666', fontSize: '0.85rem' }}>(stock: {product.stock || 50})</span>
          </div>

          <div style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold' }}>Jumla: </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
              TSh {totalPrice.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleAddToCart}
              style={{
                flex: 2,
                background: '#7c3aed',
                color: 'white',
                padding: '1rem',
                borderRadius: '50px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🛒 Ongeza Kwenye Kikapu
            </button>
            <button 
              onClick={handleWhatsApp}
              style={{
                flex: 1,
                background: '#25D366',
                color: 'white',
                padding: '1rem',
                borderRadius: '50px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💬 WhatsApp
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link imenakiliwa!');
              }}
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
            >
              🔗 Share
            </button>
            <button 
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
              onClick={() => alert('Feature inakuja hivi karibuni!')}
            >
              🔖 Save for Later
            </button>
          </div>

          <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span>🚚</span>
              <span>Usafiri unachukua siku 1-3 baada ya malipo</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>↩️</span>
              <span>Returns accepted within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Information */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🏪 Muuzaji</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>{product.seller.business_name}</h3>
            <p style={{ color: '#666', marginBottom: '0.25rem' }}>📍 {product.seller.location}</p>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>📅 Member since: 2024</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{product.seller.description}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {!showPhone ? (
              <button 
                onClick={() => setShowPhone(true)}
                style={{ background: '#7c3aed', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
              >
                📞 Onyesha Namba
              </button>
            ) : (
              <>
                <button onClick={handleCall} style={{ background: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>
                  📞 Call
                </button>
                <button onClick={handleWhatsApp} style={{ background: '#25D366', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>
                  💬 WhatsApp
                </button>
                <button onClick={handleCopyPhone} style={{ background: '#666', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>
                  {copied ? '✓ Ime nakiliwa' : '📋 Nakili'}
                </button>
              </>
            )}
          </div>
        </div>
        <Link to={`/seller/${product.seller.id}`} style={{ display: 'inline-block', marginTop: '1rem', color: '#7c3aed', textDecoration: 'none' }}>
          Tazama Bidhaa Zote za Muuzaji Huyu →
        </Link>
      </div>

      {/* Product Description */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📋 Maelezo ya Bidhaa</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{product.description}</p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 0', fontWeight: 'bold', width: '150px' }}>Jina la Bidhaa</td>
              <td style={{ padding: '0.75rem 0' }}>{product.name}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Kategoria</td>
              <td style={{ padding: '0.75rem 0' }}>{product.category}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Asili</td>
              <td style={{ padding: '0.75rem 0' }}>Tanzania</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Reviews Section */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>⭐ Reviews ({totalRatings})</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#7c3aed' }}>{avgRating.toFixed(1)}</div>
            <div style={{ color: '#f59e0b', fontSize: '1.2rem' }}>{'⭐'.repeat(Math.round(avgRating))}</div>
            <div style={{ color: '#666', fontSize: '0.85rem' }}>Based on {totalRatings} reviews</div>
          </div>
          <div>
            {ratingDistribution.map(dist => (
              <div key={dist.stars} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ width: '30px', fontSize: '0.85rem' }}>{dist.stars} ⭐</span>
                <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${dist.percentage}%`, background: '#f59e0b', height: '100%' }}></div>
                </div>
                <span style={{ width: '40px', fontSize: '0.75rem', color: '#666' }}>{dist.count}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{
            background: '#7c3aed',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            width: '100%'
          }}
        >
          ✍️ Andika Review Yako
        </button>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Jina lako"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }}
              required
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ - Bora sana</option>
              <option value={4}>⭐⭐⭐⭐ - Nzuri</option>
              <option value={3}>⭐⭐⭐ - Inakubalika</option>
              <option value={2}>⭐⭐ - Si nzuri</option>
              <option value={1}>⭐ - Mbaya</option>
            </select>
            <textarea
              placeholder="Maoni yako kuhusu bidhaa..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px' }}
              required
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={{ background: '#7c3aed', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1 }}>Tuma Review</button>
              <button type="button" onClick={() => setShowReviewForm(false)} style={{ background: '#666', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1 }}>Ghairi</button>
            </div>
          </form>
        )}

        <div>
          {productReviews.length > 0 ? (
            productReviews.map(review => (
              <div key={review.id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{review.buyer_name}</span>
                    {review.verified && <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', marginLeft: '0.5rem', padding: '0.2rem 0.5rem', borderRadius: '50px' }}>✓ Verified Purchase</span>}
                  </div>
                  <div style={{ color: '#f59e0b' }}>{'⭐'.repeat(review.rating)}</div>
                </div>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>{review.comment}</p>
                <div style={{ fontSize: '0.7rem', color: '#999' }}>{review.date}</div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>Hakuna reviews bado. Kuwa wa kwanza kutoa maoni!</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>📦 Bidhaa Zinazofanana</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {relatedProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}>
                <div style={{ height: '120px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>📦</div>
                <div style={{ padding: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.85rem', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h3>
                  <p style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '0.8rem' }}>TSh {p.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>👀 Uliotazama Hivi Karibuni</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            {recentlyViewed.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ height: '100px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📦</div>
                  <div style={{ padding: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h3>
                    <p style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '0.7rem' }}>TSh {p.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          [style*="height: 350px"] {
            height: 250px !important;
          }
          [style*="font-size: 1.8rem"] {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </div>
  );
}