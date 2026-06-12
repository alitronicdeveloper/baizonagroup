import { Link } from 'react-router-dom';

export default function SellerCard({ seller }) {
  return (
    <Link to={`/seller/${seller.id}`} className="seller-card">
      <div className="seller-header">
        <div className="seller-avatar">
          🏪
        </div>
        {seller.is_verified && (
          <span className="verified-badge">✓ Verified</span>
        )}
      </div>
      
      <h3 className="seller-business-name">{seller.business_name}</h3>
      <p className="seller-location">📍 {seller.location}</p>
      <p className="seller-description">{seller.description}</p>
      
      <div className="seller-link">Tazama Bidhaa →</div>
    </Link>
  );
}