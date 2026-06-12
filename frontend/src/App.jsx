import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellersPage from './pages/SellersPage';
import SellerDetailPage from './pages/SellerDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';
import FactoriesPage from './pages/FactoriesPage';
import ShopsPage from './pages/ShopsPage';
import JoinPage from './pages/JoinPage';
import FactoryDetailPage from './pages/FactoryDetailPage';
import ShopDetailPage from './pages/ShopDetailPage';
import MachimboPage from './pages/MachimboPage';
import QuarryDetailPage from './pages/QuarryDetailPage';


function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/sellers" element={<SellersPage />} />
              <Route path="/seller/:id" element={<SellerDetailPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/factories" element={<FactoriesPage />} />
<Route path="/shops" element={<ShopsPage />} />
<Route path="/join" element={<JoinPage />} />
<Route path="/factory/:id" element={<FactoryDetailPage />} />
<Route path="/shop/:id" element={<ShopDetailPage />} />
<Route path="/machimbo" element={<MachimboPage />} />
<Route path="/quarry/:id" element={<QuarryDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;