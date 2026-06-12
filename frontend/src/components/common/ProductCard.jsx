import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop navigation to product detail
    addToCart(product, 1);
  };

  return (
    <div className="product-card-modern">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-box">
          {product.images && product.images[0] ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <span style={{ fontSize: '3rem' }}>📦</span>
          )}
          {product.seller?.is_verified && (
            <span className="product-card-badge-verified">
              ✓ Verified
            </span>
          )}
        </div>
        
        <div className="product-card-body">
          <span className="product-card-cat">{product.category}</span>
          <h3 className="product-card-title-modern">
            {product.name}
          </h3>
          
          <div className="product-card-price-row">
            <span className="product-card-price-value">
              TSh {product.price.toLocaleString()}
            </span>
          </div>
          
          <div className="product-card-stats">
            <span>📍 {product.seller?.location?.split(',')[0]}</span>
            <span>👁️ {product.views || 0} views</span>
          </div>
        </div>
      </Link>
      
      <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
        <button 
          onClick={handleAddToCart}
          className="product-card-action-btn-modern"
        >
          🛒 Weka Kikapuni
        </button>
      </div>
    </div>
  );
}