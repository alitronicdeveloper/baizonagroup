import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellersPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    location: '',
    phone: '',
    email: '',
    business_type: 'duka',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message
    const message = `*📝 OMBI LA KUJIUNGA BAIZONA GROUP*%0A%0A` +
      `*Jina la Duka/Kiwanda:* ${formData.business_name}%0A` +
      `*Jina la Mmiliki:* ${formData.owner_name}%0A` +
      `*Aina ya Biashara:* ${formData.business_type === 'duka' ? '🏪 Duka la Jumla' : '🏭 Kiwanda'}%0A` +
      `*Eneo:* ${formData.location}%0A` +
      `*Namba ya Simu:* ${formData.phone}%0A` +
      `*Barua Pepe:* ${formData.email || 'Hajatoa'}%0A` +
      `*Maelezo:* ${formData.description || 'Hakuna maelezo'}%0A%0A` +
      `Tarehe: ${new Date().toLocaleString()}%0A%0A` +
      `_Ombi linasubiri kukubaliwa na Admin_`;

    // Send to your WhatsApp
    const whatsappUrl = `https://wa.me/255698656019?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ marginBottom: '0.5rem' }}>Ombi Limetumwa!</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Asante kwa kujiunga na Baizona Group. Tutawasiliana nawe kwa haraka.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#999' }}>
          Utapokea ujumbe kwenye WhatsApp wako.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '2rem',
            background: '#7c3aed',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Rudi Nyumbani
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem 5rem 1rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝 Jiunge na Baizona Group</h1>
        <p style={{ color: '#666' }}>
          Jaza fomu hii kujiunga kama muuzaji. Tutakusajili baada ya kuthibitisha taarifa zako.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Jina la Duka / Kiwanda <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            required
            placeholder="Mfano: Duka la Juma Wholesale"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Jina la Mmiliki <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            required
            placeholder="Jina lako kamili"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Aina ya Biashara <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          >
            <option value="duka">🏪 Duka / Soko la Jumla</option>
            <option value="kiwanda">🏭 Kiwanda / Kampuni</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Eneo <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Mfano: Kariakoo, Dar es Salaam"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Namba ya Simu (WhatsApp) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Mfano: 0712345678"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
          <small style={{ fontSize: '0.7rem', color: '#666' }}>Tutawasiliana nawe kupitia namba hii</small>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Barua Pepe
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Maelezo ya Biashara
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Elezea kuhusu bidhaa unazouza, ni aina gani, ukubwa wa biashara n.k."
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '12px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem', background: '#fef3c7', padding: '1rem', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.85rem', color: '#92400e', margin: 0 }}>
            ⚠️ Baada ya kutuma ombi, tutawasiliana nawe kwa WhatsApp kukubali au kukataa ombi lako.
            Ukikubaliwa, tutakusajili kwenye mfumo wetu na kuongeza bidhaa zako.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: isSubmitting ? '#999' : '#7c3aed',
            color: 'white',
            padding: '1rem',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {isSubmitting ? 'Inatuma...' : '✉️ Tuma Ombi la Kujiunga'}
        </button>
      </form>
    </div>
  );
}