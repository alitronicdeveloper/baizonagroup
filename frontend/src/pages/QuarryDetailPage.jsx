import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimatedGallery from '../components/common/AnimatedGallery';

// Google Maps Component - Inaonekana moja kwa moja
const GoogleMap = ({ lat, lng, name }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC6j5o-cI5D8hMlUfLQmJkQG8QFGjxEwGk&q=${lat},${lng}&zoom=15`;
  
  if (!lat || !lng) {
    return (
      <div style={{
        background: '#f0f0f0',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        color: '#666'
      }}>
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <p>Location haijabainishwa kwa ramani</p>
        <small>Wasiliana na muuzaji kwa maelezo zaidi</small>
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <iframe
        title={`Map - ${name}`}
        src={mapUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div style={{
        padding: '0.5rem',
        background: '#f8f9fa',
        fontSize: '0.7rem',
        textAlign: 'center',
        color: '#666'
      }}>
        📍 {name} - {lat}, {lng} | 
        <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer" style={{ color: '#7c3aed', marginLeft: '0.3rem' }}>
          Fungua Ramani Kubwa →
        </a>
      </div>
    </div>
  );
};

export default function QuarryDetailPage() {
  const { id } = useParams();
  const [quarry, setQuarry] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedQuarries = localStorage.getItem('baizona_quarries');
    if (savedQuarries) {
      const quarries = JSON.parse(savedQuarries);
      const found = quarries.find(q => q.id === parseInt(id));
      setQuarry(found);
    }
  }, [id]);

  if (!quarry) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>🚧 Machimbo Haikupatikana</h1>
        <Link to="/machimbo">← Rudi kwa Machimbo</Link>
      </div>
    );
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(quarry.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Halo, nimekupata kupitia Baizona Group. Ninaomba taarifa zaidi kuhusu bidhaa za ${quarry.name}.`;
    window.open(`https://wa.me/${quarry.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${quarry.phone}`;
  };

  const handleMap = () => {
    if (quarry.lat && quarry.lng) {
      window.open(`https://www.google.com/maps?q=${quarry.lat},${quarry.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps?q=${encodeURIComponent(quarry.location)}`, '_blank');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 5rem 1rem' }}>
      
      {/* Back Button */}
      <Link to="/machimbo" style={{ color: '#7c3aed', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
        ← Rudi kwa Machimbo
      </Link>

      {/* Hero Section */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        {/* Image Gallery */}
        <div style={{ height: '400px' }}>
          <AnimatedGallery images={quarry.images} name={quarry.name} />
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{quarry.name}</h1>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>📍 {quarry.location}</span>
                <span style={{ color: '#f59e0b' }}>
                  {'⭐'.repeat(Math.floor(quarry.rating))} {quarry.rating} ({quarry.reviews} reviews)
                </span>
              </div>
            </div>
            {quarry.featured && (
              <span style={{ background: '#ec4899', color: 'white', padding: '0.25rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                ⭐ Maarufu
              </span>
            )}
          </div>
          
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {quarry.description}
          </p>
          
          {/* Stats Cards */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f3e8ff', padding: '0.5rem 1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>📅 ILIANZISHWA</div>
              <div style={{ fontWeight: 'bold' }}>{quarry.established}</div>
            </div>
            <div style={{ background: '#f3e8ff', padding: '0.5rem 1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>👥 WAFANYAKAZI</div>
              <div style={{ fontWeight: 'bold' }}>{quarry.employees}</div>
            </div>
            <div style={{ background: '#f3e8ff', padding: '0.5rem 1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>🕒 SAA ZA KAZI</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{quarry.openHours}</div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION MAP - Inaonekana moja kwa moja kwenye ukurasa */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🗺️</span> Eneo la {quarry.name}
        </h3>
        <GoogleMap lat={quarry.lat} lng={quarry.lng} name={quarry.name} />
      </div>

      {/* Tabs (Products, Contact, Info) */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <button onClick={() => setActiveTab('products')} style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', color: activeTab === 'products' ? '#7c3aed' : '#666', fontWeight: activeTab === 'products' ? 'bold' : 'normal', borderBottom: activeTab === 'products' ? '2px solid #7c3aed' : 'none', cursor: 'pointer' }}>📦 Bidhaa Zetu</button>
        <button onClick={() => setActiveTab('contact')} style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', color: activeTab === 'contact' ? '#7c3aed' : '#666', fontWeight: activeTab === 'contact' ? 'bold' : 'normal', borderBottom: activeTab === 'contact' ? '2px solid #7c3aed' : 'none', cursor: 'pointer' }}>📞 Wasiliana</button>
        <button onClick={() => setActiveTab('info')} style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', color: activeTab === 'info' ? '#7c3aed' : '#666', fontWeight: activeTab === 'info' ? 'bold' : 'normal', borderBottom: activeTab === 'info' ? '2px solid #7c3aed' : 'none', cursor: 'pointer' }}>ℹ️ Maelezo</button>
      </div>

      {/* Tab Content */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>📦 Bidhaa Zinazopatikana</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {quarry.products.map((product, idx) => (
                <div key={idx} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1rem', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{product.name}</div>
                  <div style={{ color: '#7c3aed', fontWeight: 'bold' }}>{product.price}</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>Kwa {product.unit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>📞 Wasiliana Nasi</h3>
            
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
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                📞 Onyesha Namba ya Simu
              </button>
            ) : (
              <div>
                <div style={{
                  background: '#f0f0f0',
                  padding: '1rem',
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  {quarry.phone}
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={handleCall} style={{ background: '#10b981', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>📞 Piga Simu</button>
                  <button onClick={handleWhatsApp} style={{ background: '#25D366', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>💬 WhatsApp</button>
                  <button onClick={handleCopyPhone} style={{ background: '#666', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>{copied ? '✓ Nakiliwa' : '📋 Nakili'}</button>
                </div>
              </div>
            )}
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef3c7', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.8rem', color: '#92400e' }}>
                💡 Kidokezo: Baada ya kuwasiliana, kaa mwema na mmiliki wa machimbo kwa maelezo zaidi kuhusu bei na usafiri.
              </p>
            </div>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>ℹ️ Maelezo ya Ziada</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div><strong>📍 Eneo kamili:</strong> {quarry.location}</div>
              <div><strong>📧 Barua Pepe:</strong> {quarry.email || 'Hajatoa'}</div>
              <div><strong>🌐 Tovuti:</strong> {quarry.website || 'Hajatoa'}</div>
              <div><strong>🚚 Usafiri:</strong> {quarry.delivery}</div>
              <div><strong>💳 Njia za Malipo:</strong> {quarry.payment}</div>
              <div><strong>🕒 Saa za Kufungua:</strong> {quarry.openHours}</div>
              <div><strong>📅 Mwaka wa Kuanzishwa:</strong> {quarry.established}</div>
              <div><strong>👥 Idadi ya Wafanyakazi:</strong> {quarry.employees}</div>
              <div><strong>🗺️ Coordinates:</strong> {quarry.lat ? `${quarry.lat}, ${quarry.lng}` : 'Hazijabainishwa'}</div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Je, Wewe Ni Mmiliki wa Machimbo?</h3>
        <p style={{ marginBottom: '1rem', opacity: 0.9 }}>Jiunge nasi bure na uwafikie wateja wapya kutoka kote Tanzania.</p>
        <Link to="/join" style={{ background: 'white', color: '#7c3aed', padding: '0.75rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
          Jiunge Sasa Bure →
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
          iframe {
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
}