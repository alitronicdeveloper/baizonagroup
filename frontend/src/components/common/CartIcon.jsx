import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="cart-icon">
      <span className="cart-icon-emoji">🛒</span>
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </Link>
  );
}