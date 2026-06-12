import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

export default function CategoriesSection() {
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Kategoria za Bidhaa</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
              <div className="category-count">{cat.count} bidhaa</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}