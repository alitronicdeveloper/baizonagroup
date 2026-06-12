import { useEffect } from 'react';

export default function Toast({ message, product, onClose, onUndo }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '320px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#10b981',
          padding: '0.75rem 1rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>✅</span>
          <span style={{ fontWeight: 'bold' }}>Imeongezwa Kwenye Kikapu!</span>
        </div>
        
        {/* Content */}
        <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#f3e8ff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            📦
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{product?.name}</h4>
            <p style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 'bold' }}>
              TSh {product?.price?.toLocaleString()}
            </p>
            <p style={{ fontSize: '0.7rem', color: '#666' }}>Kiasi: {product?.quantity || 1}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <button
            onClick={onUndo}
            style={{
              background: '#ef4444',
              color: 'white',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            ↩️ Ondoa
          </button>
          <button
            onClick={onClose}
            style={{
              background: '#7c3aed',
              color: 'white',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            🛒 Enda Kikapu
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}