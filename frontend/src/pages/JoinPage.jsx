import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const benefits = [
  { icon: '🌍', title: 'Wateja Zaidi', desc: 'Fikia wateja kutoka Tanzania nzima bila kikwazo cha eneo' },
  { icon: '📱', title: 'Uuzaji wa Kidijitali', desc: 'Bidhaa zako zitaonekana kwenye simu na kompyuta moja kwa moja' },
  { icon: '🔒', title: 'Usalama wa Biashara', desc: 'Mfumo wetu umehakikisha usalama wa taarifa zako zote' },
  { icon: '📊', title: 'Takwimu za Biashara', desc: 'Angalia maoni, mauzo na takwimu za biashara yako' },
  { icon: '💬', title: 'Msaada wa Haraka', desc: 'Timu yetu iko tayari kukusaidia masaa 24 kwa siku 7' },
  { icon: '🎯', title: 'Uuzaji wa Bure', desc: 'Anza bure kabisa - hakuna ada za usajili au ada za kila mwezi' },
];

const steps = [
  { num: '01', title: 'Jaza Fomu', desc: 'Toa taarifa za msingi za biashara yako' },
  { num: '02', title: 'Tuma Ombi', desc: 'Ombi lako litumwe kwa WhatsApp moja kwa moja' },
  { num: '03', title: 'Thibitisho', desc: 'Timu yetu itakupigia simu ndani ya saa 24' },
  { num: '04', title: 'Anza Kuuza!', desc: 'Bidhaa zako zinaonekana kwenye mfumo wetu' },
];

export default function JoinPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    location: '',
    phone: '',
    email: '',
    business_type: 'duka',
    categories: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const message =
      `*📝 OMBI LA KUJIUNGA BAIZONA GROUP*%0A%0A` +
      `*Jina la Biashara:* ${formData.business_name}%0A` +
      `*Jina la Mmiliki:* ${formData.owner_name}%0A` +
      `*Aina:* ${formData.business_type === 'duka' ? '🏪 Duka' : '🏭 Kiwanda'}%0A` +
      `*Eneo:* ${formData.location}%0A` +
      `*Simu (WA):* ${formData.phone}%0A` +
      `*Barua Pepe:* ${formData.email || 'Hajatoa'}%0A` +
      `*Kategoria:* ${formData.categories || 'Hajataja'}%0A` +
      `*Maelezo:* ${formData.description || 'Hakuna'}%0A%0A` +
      `Tarehe: ${new Date().toLocaleString()}%0A` +
      `_Ombi linasubiri kukubaliwa na Admin_`;
    window.open(`https://wa.me/255698656019?text=${message}`, '_blank');
    setIsSubmitting(false);
    setStep('success');
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '0.85rem 1rem',
    border: `2px solid ${focusedField === name ? '#7c3aed' : '#e5e7eb'}`,
    borderRadius: '12px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focusedField === name ? '0 0 0 4px rgba(124,58,237,0.1)' : 'none',
    background: 'white',
  });

  /* ── SUCCESS STATE ── */
  if (step === 'success') {
    return (
      <div style={{ maxWidth: '540px', margin: '0 auto', padding: '4rem 1.5rem 6rem', textAlign: 'center' }}>
        <div className="animate-fade-in-up">
          <div style={{ fontSize: '6rem', marginBottom: '1.5rem', lineHeight: 1 }}>🎉</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1f1f2e' }}>Ombi Limetumwa!</h1>
          <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Asante kwa kujiunga na Baizona Group.<br />Tutawasiliana nawe kwa WhatsApp ndani ya <strong>saa 24</strong>.
          </p>
          <div style={{ background: 'linear-gradient(135deg,#f5f3ff,#fce7f3)', borderRadius: '16px', padding: '1.25rem', margin: '2rem 0' }}>
            <p style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem' }}>
              📱 Angalia WhatsApp yako kwa ujumbe wa uthibitisho
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: 'white', padding: '0.85rem 2rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 700, boxShadow: '0 8px 20px rgba(124,58,237,0.3)' }}
            >
              🏠 Rudi Nyumbani
            </button>
            <Link to="/products" style={{ background: 'white', border: '2px solid #7c3aed', color: '#7c3aed', padding: '0.85rem 2rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
              🛍️ Tazama Bidhaa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>

      {/* ── HERO ── */}
      <div
        className="animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.8, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Jiunge Sasa — Bure Kabisa</p>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            📝 Jiunge na Baizona Group
          </h1>
          <p style={{ opacity: 0.85, fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Fikia wateja zaidi ya <strong>10,000+</strong> kupitia mfumo wetu wa kidijitali — bila ada yoyote
          </p>
          <div style={{ display: 'inline-flex', gap: '1.5rem', background: 'rgba(255,255,255,0.15)', borderRadius: '50px', padding: '0.6rem 1.5rem', backdropFilter: 'blur(8px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>✅ Usajili Bure</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>⚡ Haraka Saa 24</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>📱 WhatsApp Direct</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>

        {/* ── FORM ── */}
        <div className="animate-fade-in-up delay-100">
          <form
            onSubmit={handleSubmit}
            style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 24px rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.06)' }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f1f2e', marginBottom: '1.5rem' }}>
              📋 Taarifa za Biashara Yako
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Jina la Biashara <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} required placeholder="Mf: Duka la Juma Wholesale" style={inputStyle('business_name')} onFocus={() => setFocusedField('business_name')} onBlur={() => setFocusedField('')} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Jina la Mmiliki <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} required placeholder="Jina lako kamili" style={inputStyle('owner_name')} onFocus={() => setFocusedField('owner_name')} onBlur={() => setFocusedField('')} />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                Aina ya Biashara <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { value: 'duka', label: '🏪 Duka / Soko la Jumla' },
                  { value: 'kiwanda', label: '🏭 Kiwanda / Kampuni' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, business_type: value })}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: `2px solid ${formData.business_type === value ? '#7c3aed' : '#e5e7eb'}`,
                      background: formData.business_type === value ? '#f5f3ff' : 'white',
                      color: formData.business_type === value ? '#7c3aed' : '#6b7280',
                      fontWeight: formData.business_type === value ? 700 : 400,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Eneo <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Mf: Kariakoo, Dar es Salaam" style={inputStyle('location')} onFocus={() => setFocusedField('location')} onBlur={() => setFocusedField('')} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Simu (WhatsApp) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="0712345678" style={inputStyle('phone')} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Barua Pepe (Hiari)
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                  Aina ya Bidhaa (Hiari)
                </label>
                <input type="text" name="categories" value={formData.categories} onChange={handleChange} placeholder="Mf: Nguo, Vyakula, Viatu" style={inputStyle('categories')} onFocus={() => setFocusedField('categories')} onBlur={() => setFocusedField('')} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#374151', marginBottom: '0.4rem' }}>
                Maelezo ya Biashara (Hiari)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Elezea bidhaa unazouza, ukubwa wa biashara, na nini kinakufanya tofauti..."
                rows="4"
                style={{ ...inputStyle('description'), resize: 'vertical', fontFamily: 'inherit' }}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField('')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color: 'white',
                padding: '1rem',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: isSubmitting ? 'none' : '0 8px 25px rgba(124,58,237,0.3)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isSubmitting ? '⏳ Inatuma...' : '🚀 Tuma Ombi la Kujiunga'}
            </button>
          </form>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="animate-fade-in-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Steps */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#1f1f2e', marginBottom: '1.25rem' }}>🗺️ Hatua za Kujiunga</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {steps.map((s, i) => (
                <div key={s.num} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: 'white', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800 }}>
                    {s.num}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1f1f2e', marginBottom: '0.1rem' }}>{s.title}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.4 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ background: 'linear-gradient(135deg,#f5f3ff,#fce7f3)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(124,58,237,0.1)' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#1f1f2e', marginBottom: '1rem' }}>✨ Faida za Kujiunga</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {benefits.slice(0, 4).map(b => (
                <div key={b.title} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1f1f2e' }}>{b.title}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.4 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 400px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}