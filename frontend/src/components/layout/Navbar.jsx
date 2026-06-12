import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      background: isScrolled ? '#1f1f2e' : '#1f1f2e',
      padding: '1rem 2rem',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link to="/" style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none'
        }}>
          Baizona Group
        </Link>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{
            color: location.pathname === '/' ? '#ec4899' : 'white',
            textDecoration: 'none'
          }}>
            Nyumbani
          </Link>
          <Link to="/products" style={{
            color: location.pathname === '/products' ? '#ec4899' : 'white',
            textDecoration: 'none'
          }}>
            Bidhaa
          </Link>
          <Link to="/machimbo" style={{
            color: location.pathname === '/machimbo' ? '#ec4899' : 'white',
            textDecoration: 'none'
          }}>
            🏗️ Machimbo
          </Link>
          <Link to="/cart" style={{
            color: location.pathname === '/cart' ? '#ec4899' : 'white',
            textDecoration: 'none',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            🛒 Kikapu
            {cartCount > 0 && (
              <span style={{
                background: '#ec4899',
                borderRadius: '50%',
                padding: '0.1rem 0.4rem',
                fontSize: '0.7rem',
                marginLeft: '0.2rem'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}