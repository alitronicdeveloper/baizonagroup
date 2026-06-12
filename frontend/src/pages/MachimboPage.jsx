import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AnimatedGallery from '../components/common/AnimatedGallery';

// DATA YA MACHIMBO (HII ITATOKA SUPABASE BADAYE)
const quarriesData = [
  {
    id: 1,
    name: "Machimbo ya Jumla Dar",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    phone: "0712345678",
    email: "info@machimbojumla.co.tz",
    description: "Kiwanda kikubwa cha kuchimba mawe na changarawe kwa ajili ya ujenzi mkubwa. Tunatoa huduma bora kwa wakandarasi.",
    type: "jumla",
    products: ["Mawe ya ujenzi", "Changarawe (3/4, 1/2)", "Mchanga wa ujenzi", "Kokoto", "Vibunji vya mawe"],
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600"
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // sample video
    featured: true,
    rating: 4.8,
    delivery: "Lori kubwa (10-20 tani)",
    payment: "Malipo ya mbele au baada ya kufika"
  },
  {
    id: 2,
    name: "Machimbo ya Rejareja Temeke",
    location: "Temeke, Dar es Salaam",
    region: "Dar es Salaam",
    phone: "0722345678",
    email: "info@rejarejateme.com",
    description: "Machimbo ya rejareja karibu na Temeke. Tunauza kiasi chochote kuanzia gunia moja.",
    type: "rejareja",
    products: ["Mawe madogo (1-2 inch)", "Changarawe", "Mchanga wa mto", "Udongo wa kujengea", "Majive"],
    images: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600"
    ],
    video: "",
    featured: true,
    rating: 4.5,
    delivery: "Pikipiki, Tuktuk, Lori ndogo (1-5 tani)",
    payment: "Malipo baada ya kukubaliana"
  },
  {
    id: 3,
    name: "Machimbo ya Jumla Pwani",
    location: "Pwani, Kibaha",
    region: "Pwani",
    phone: "0732345678",
    email: "info@pwaniquarry.com",
    description: "Machimbo makubwa ya Pwani. Sifa zetu ni ubora wa mawe na usafiri wa haraka.",
    type: "jumla",
    products: ["Mawe ya daraja", "Changarawe nzuri", "Mchanga mzuri", "Vibunji", "Rock fill"],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
    ],
    video: "",
    featured: false,
    rating: 4.3,
    delivery: "Lori kubwa",
    payment: "Malipo ya mbele"
  },
  {
    id: 4,
    name: "Machimbo ya Rejareja Kinondoni",
    location: "Kinondoni, Dar es Salaam",
    region: "Dar es Salaam",
    phone: "0742345678",
    email: "info@kinondoniquarry.com",
    description: "Machimbo ya karibu na Kinondoni. Ununuzi wa gunia moja, pikipiki, au lori ndogo.",
    type: "rejareja",
    products: ["Mawe ya kujengea", "Changarawe ndogo", "Mchanga mzuri", "Udongo mweusi", "Majive ya mapambo"],
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600"
    ],
    video: "",
    featured: false,
    rating: 4.2,
    delivery: "Pikipiki, Lori ndogo",
    payment: "Malipo baada ya kukubaliana"
  }
];

export default function MachimboPage() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const [activeTab, setActiveTab] = useState(typeParam === 'rejareja' ? 'rejareja' : 'jumla');

  const filteredQuarries = quarriesData.filter(q => q.type === activeTab);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 5rem 1rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏗️ Machimbo Tanzania</h1>
        <p style={{ color: '#666' }}>Bofya kwenye machimbo yoyote kuona picha, video, bidhaa zao, na kuwasiliana nao moja kwa moja</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/machimbo?type=jumla" onClick={() => setActiveTab('jumla')}>
          <button
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'jumla' ? '#7c3aed' : '#f0f0f0',
              color: activeTab === 'jumla' ? 'white' : '#333',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🏭 Machimbo ya Jumla
          </button>
        </Link>
        <Link to="/machimbo?type=rejareja" onClick={() => setActiveTab('rejareja')}>
          <button
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'rejareja' ? '#7c3aed' : '#f0f0f0',
              color: activeTab === 'rejareja' ? 'white' : '#333',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🏪 Machimbo ya Rejareja
          </button>
        </Link>
      </div>

      {/* Info Box */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: '20px',
        padding: '1.5rem',
        color: 'white',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉 BURE KABISA!</div>
        <p style={{ marginBottom: '0.5rem', opacity: 0.95 }}>
          Hatutoi ada yoyote kwa kukusaidia kupata machimbo. Bofya kwenye machimbo upate maelezo yote.
        </p>
        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
          Picha, Video, Bidhaa, Contact - Yote kwenye kidole gumba!
        </p>
      </div>

      {/* Machimbo List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredQuarries.map((quarry) => (
          <Link
            key={quarry.id}
            to={`/quarry/${quarry.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                border: quarry.featured ? '2px solid #ec4899' : '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {quarry.featured && (
                <div style={{
                  position: 'absolute',
                  background: '#ec4899',
                  color: 'white',
                  padding: '0.25rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 1,
                  marginTop: '1rem',
                  marginLeft: '1rem'
                }}>
                  ⭐ Maarufu
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1rem' }}>
                {/* Image Gallery */}
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <AnimatedGallery 
                    images={quarry.images} 
                    name={quarry.name}
                  />
                </div>
                
                {/* Info */}
                <div style={{ padding: '1rem 1rem 1rem 0' }}>
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#1f1f2e' }}>
                    {quarry.name}
                  </h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>📍 {quarry.location}</span>
                    <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>
                      {'⭐'.repeat(Math.floor(quarry.rating))} {quarry.rating}
                    </span>
                  </div>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    {quarry.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {quarry.products.slice(0, 3).map((product, idx) => (
                      <span key={idx} style={{
                        background: '#f0f0f0',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        color: '#666'
                      }}>
                        ✓ {product}
                      </span>
                    ))}
                    {quarry.products.length > 3 && (
                      <span style={{ fontSize: '0.7rem', color: '#7c3aed' }}>
                        +{quarry.products.length - 3} zaidi
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#999' }}>
                    <span>🚚 {quarry.delivery}</span>
                    <span>💳 {quarry.payment}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}