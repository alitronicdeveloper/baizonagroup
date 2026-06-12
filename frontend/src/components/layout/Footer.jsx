import { Link, useLocation } from 'react-router-dom';

const footerLinks = {
  kurasa: [
    { to: '/', label: 'Nyumbani' },
    { to: '/products', label: 'Bidhaa Zote' },
    { to: '/shops', label: 'Maduka ya Jumla' },
    { to: '/factories', label: 'Viwanda' },
    { to: '/join', label: 'Jiunge Nasi' },
  ],
  categories: [
    'Nguo & Vitenge',
    'Vyakula & Vinywaji',
    'Vifaa vya Ujenzi',
    'Viatu & Mifuko',
    'Vifaa vya Nyumbani',
    'Dawa & Afya',
  ],
};

export default function Footer() {
  const location = useLocation();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
      color: '#e5e7eb',
      paddingTop: '3rem',
      paddingBottom: '5rem', // space for bottom navbar
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── MAIN GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>

          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', borderRadius: '12px', padding: '0.5rem 0.75rem', fontSize: '1.1rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
                B
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Baizona Group</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '220px' }}>
              Soko la kwanza la Kitanzania kwa biashara kati ya wauzaji na wanunuzi — B2B Marketplace.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { href: 'https://wa.me/255698656019', icon: '💬', label: 'WhatsApp', color: '#25D366' },
                { href: '#', icon: '📘', label: 'Facebook', color: '#1877f2' },
                { href: '#', icon: '📸', label: 'Instagram', color: '#e1306c' },
                { href: '#', icon: '🎵', label: 'TikTok', color: '#010101' },
              ].map(({ href, icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s, transform 0.2s',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${color}30`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Kurasa */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.1rem' }}>
              Kurasa
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {footerLinks.kurasa.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      color: location.pathname === to ? '#a78bfa' : '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s',
                      fontWeight: location.pathname === to ? 600 : 400,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={(e) => e.currentTarget.style.color = location.pathname === to ? '#a78bfa' : '#9ca3af'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategoria */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.1rem' }}>
              Kategoria
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {footerLinks.categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wasiliana Nasi */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d1d5db', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.1rem' }}>
              Wasiliana Nasi
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: '📞', label: '0698 656 019', href: 'tel:+255698656019' },
                { icon: '✉️', label: 'info@baizona.co.tz', href: 'mailto:info@baizona.co.tz' },
                { icon: '📍', label: 'Dar es Salaam, Tanzania', href: null },
                { icon: '🕒', label: 'Jumatatu – Ijumaa, 8:00 – 18:00', href: null },
              ].map(({ icon, label, href }) => (
                <div key={label} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '0.05rem' }}>{icon}</span>
                  {href ? (
                    <a href={href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s', lineHeight: 1.4 }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c4b5fd'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {label}
                    </a>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4 }}>{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

        {/* ── BOTTOM BAR ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
            © 2025 Baizona Group. Haki zote zimehifadhiwa. Tanzania B2B Marketplace.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Sera ya Faragha', 'Masharti ya Matumizi'].map(link => (
              <a key={link} href="#" style={{ color: '#6b7280', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9ca3af'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}