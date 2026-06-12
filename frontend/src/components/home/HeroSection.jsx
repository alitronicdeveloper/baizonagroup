import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Soko la Kwanza la Kitanzania</h1>
        <p>Unganisha biashara yako na wateja kutoka kote Tanzania. Nunua na uza kwa urahisi.</p>
        <p className="hero-subtitle">🇹🇿 Maduka ya Kariakoo • Viwanda vya Tanzania 🇹🇿</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">Nunua Bidhaa</Link>
          <Link to="/sellers" className="btn btn-secondary">Wauzaji Wetu</Link>
        </div>
      </div>
    </section>
  );
}