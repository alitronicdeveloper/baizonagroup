import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // ========== MACHIMBO DATA ==========
  const [quarries, setQuarries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  
  // ========== HERO SLIDES DATA ==========
  const [heroSlides, setHeroSlides] = useState([]);
  const [heroForm, setHeroForm] = useState({ title: '', subtitle: '', button1: '', button2: '', button1Link: '', button2Link: '' });
  const [heroImages, setHeroImages] = useState([]);
  const [heroImagePreviews, setHeroImagePreviews] = useState([]);
  const [editingHeroSlide, setEditingHeroSlide] = useState(null);
  const [showHeroForm, setShowHeroForm] = useState(false);
  
  // ========== QUARRY FORM STATES ==========
  const [quarryForm, setQuarryForm] = useState({
    name: '', location: '', region: '', phone: '', email: '', website: '',
    description: '', type: 'jumla', delivery: '', payment: '', openHours: '',
    established: '', employees: '', featured: false,
    lat: '', lng: ''
  });
  const [quarryImages, setQuarryImages] = useState([]);
  const [quarryImagePreviews, setQuarryImagePreviews] = useState([]);
  const [quarryVideo, setQuarryVideo] = useState(null);
  const [quarryVideoPreview, setQuarryVideoPreview] = useState('');
  const [editingQuarry, setEditingQuarry] = useState(null);
  const [showQuarryForm, setShowQuarryForm] = useState(false);
  
  // ========== PRODUCT FORM STATES ==========
  const [productForm, setProductForm] = useState({ quarryId: '', name: '', price: '', unit: '' });
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedQuarryId, setSelectedQuarryId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchProductTerm, setSearchProductTerm] = useState('');
  const [filterProductQuarry, setFilterProductQuarry] = useState('');
  
  // ========== PENDING SELLERS ==========
  const [pendingSellers, setPendingSellers] = useState([]);
  
  // ========== ACTIVITIES ==========
  const [activities, setActivities] = useState([]);
  
  // ========== SETTINGS ==========
  const [settings, setSettings] = useState({
    siteName: 'Baizona Group',
    siteEmail: 'info@baizona.co.tz',
    sitePhone: '0712 345 678',
    vatPercentage: 18,
    deliveryFeeDar: 5000,
    deliveryFeeOther: 10000
  });

  // ========== LOAD DATA FROM SUPABASE ==========
  const loadQuarries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quarries')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Error loading quarries:', error);
    } else {
      setQuarries(data || []);
    }
    setLoading(false);
  };

  const loadHeroSlides = async () => {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error loading hero slides:', error);
    } else {
      setHeroSlides(data || []);
    }
  };

  const loadPendingSellers = async () => {
    const { data, error } = await supabase
      .from('pending_sellers')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading pending sellers:', error);
    } else {
      setPendingSellers(data || []);
    }
  };

  const loadActivities = async () => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error('Error loading activities:', error);
    } else {
      setActivities(data || []);
    }
  };

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error loading settings:', error);
    } else if (data && data[0]) {
      setSettings({
        siteName: data[0].site_name,
        siteEmail: data[0].site_email,
        sitePhone: data[0].site_phone,
        vatPercentage: data[0].vat_percentage,
        deliveryFeeDar: data[0].delivery_fee_dar,
        deliveryFeeOther: data[0].delivery_fee_other
      });
    }
  };

  // ========== INITIAL LOAD ==========
  useEffect(() => {
    loadQuarries();
    loadHeroSlides();
    loadPendingSellers();
    loadActivities();
    loadSettings();

    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') setIsLoggedIn(true);
  }, []);

  // ========== ADD ACTIVITY ==========
  const addActivity = async (action) => {
    await supabase
      .from('activities')
      .insert([{ action, admin_email: 'admin@baizona.com' }]);
    loadActivities();
  };

  // ========== HERO SLIDES CRUD ==========
  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImages([reader.result]);
        setHeroImagePreviews([reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addHeroSlide = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newSlide = {
      image: heroImages[0] || '',
      title: heroForm.title,
      subtitle: heroForm.subtitle,
      button1: heroForm.button1,
      button2: heroForm.button2,
      button1_link: heroForm.button1Link,
      button2_link: heroForm.button2Link,
      order: heroSlides.length + 1
    };

    if (editingHeroSlide) {
      const { error } = await supabase
        .from('hero_slides')
        .update(newSlide)
        .eq('id', editingHeroSlide.id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Hero slide updated: ${newSlide.title}`);
        alert('Hero slide imesasishwa!');
        loadHeroSlides();
      }
    } else {
      const { error } = await supabase
        .from('hero_slides')
        .insert([newSlide]);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`New hero slide added: ${newSlide.title}`);
        alert('Hero slide imeongezwa!');
        loadHeroSlides();
      }
    }
    
    resetHeroForm();
    setLoading(false);
  };

  const deleteHeroSlide = async (id) => {
    if (window.confirm('Futa slide hii?')) {
      setLoading(true);
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Hero slide deleted`);
        alert('Hero slide imefutwa!');
        loadHeroSlides();
      }
      setLoading(false);
    }
  };

  const editHeroSlide = (slide) => {
    setEditingHeroSlide(slide);
    setHeroForm({
      title: slide.title,
      subtitle: slide.subtitle,
      button1: slide.button1,
      button2: slide.button2,
      button1Link: slide.button1_link || '/machimbo',
      button2Link: slide.button2_link || '/products'
    });
    setHeroImages(slide.image ? [slide.image] : []);
    setHeroImagePreviews(slide.image ? [slide.image] : []);
    setShowHeroForm(true);
  };

  const resetHeroForm = () => {
    setEditingHeroSlide(null);
    setHeroForm({ title: '', subtitle: '', button1: '', button2: '', button1Link: '', button2Link: '' });
    setHeroImages([]);
    setHeroImagePreviews([]);
    setShowHeroForm(false);
  };

  // ========== QUARRY CRUD ==========
  const handleQuarryImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...quarryImages];
    const newPreviews = [...quarryImagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        newPreviews.push(reader.result);
        setQuarryImages(newImages);
        setQuarryImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeQuarryImage = (index) => {
    setQuarryImages(quarryImages.filter((_, i) => i !== index));
    setQuarryImagePreviews(quarryImagePreviews.filter((_, i) => i !== index));
  };

  const handleQuarryVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuarryVideo(reader.result);
        setQuarryVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addQuarry = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newQuarry = {
      name: quarryForm.name,
      location: quarryForm.location,
      region: quarryForm.region,
      phone: quarryForm.phone,
      email: quarryForm.email,
      website: quarryForm.website,
      description: quarryForm.description,
      type: quarryForm.type,
      delivery: quarryForm.delivery,
      payment: quarryForm.payment,
      open_hours: quarryForm.openHours,
      established: quarryForm.established,
      employees: quarryForm.employees,
      featured: quarryForm.featured,
      lat: parseFloat(quarryForm.lat) || null,
      lng: parseFloat(quarryForm.lng) || null,
      images: quarryImages,
      video: quarryVideo || '',
      rating: 4.0,
      reviews: 0
    };

    if (editingQuarry) {
      const { error } = await supabase
        .from('quarries')
        .update(newQuarry)
        .eq('id', editingQuarry.id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Quarry updated: ${newQuarry.name}`);
        alert('Machimbo yamesasishwa!');
        loadQuarries();
      }
    } else {
      const { error } = await supabase
        .from('quarries')
        .insert([newQuarry]);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`New quarry added: ${newQuarry.name}`);
        alert('Machimbo yameongezwa!');
        loadQuarries();
      }
    }
    
    resetQuarryForm();
    setLoading(false);
  };

  const deleteQuarry = async (id) => {
    if (window.confirm('Futa machimbo haya? Bidhaa zake zote zitafutwa.')) {
      setLoading(true);
      const { error } = await supabase
        .from('quarries')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Quarry deleted: ID ${id}`);
        alert('Machimbo yamefutwa!');
        loadQuarries();
      }
      setLoading(false);
    }
  };

  const editQuarry = (quarry) => {
    setEditingQuarry(quarry);
    setQuarryForm({
      name: quarry.name,
      location: quarry.location,
      region: quarry.region,
      phone: quarry.phone,
      email: quarry.email || '',
      website: quarry.website || '',
      description: quarry.description,
      type: quarry.type,
      delivery: quarry.delivery,
      payment: quarry.payment,
      openHours: quarry.open_hours,
      established: quarry.established,
      employees: quarry.employees,
      featured: quarry.featured,
      lat: quarry.lat || '',
      lng: quarry.lng || ''
    });
    setQuarryImages(quarry.images || []);
    setQuarryImagePreviews(quarry.images || []);
    setQuarryVideo(quarry.video || null);
    setQuarryVideoPreview(quarry.video || '');
    setShowQuarryForm(true);
  };

  const resetQuarryForm = () => {
    setEditingQuarry(null);
    setQuarryForm({
      name: '', location: '', region: '', phone: '', email: '', website: '',
      description: '', type: 'jumla', delivery: '', payment: '', openHours: '',
      established: '', employees: '', featured: false,
      lat: '', lng: ''
    });
    setQuarryImages([]);
    setQuarryImagePreviews([]);
    setQuarryVideo(null);
    setQuarryVideoPreview('');
    setShowQuarryForm(false);
  };

  // ========== PRODUCT CRUD ==========
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update({
          name: productForm.name,
          price: productForm.price,
          unit: productForm.unit
        })
        .eq('id', editingProduct.id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Product updated: ${productForm.name}`);
        alert('Bidhaa imesasishwa!');
        loadQuarries();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([{
          quarry_id: selectedQuarryId,
          name: productForm.name,
          price: productForm.price,
          unit: productForm.unit
        }]);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Product added: ${productForm.name}`);
        alert('Bidhaa imeongezwa!');
        loadQuarries();
      }
    }
    
    setProductForm({ quarryId: '', name: '', price: '', unit: '' });
    setEditingProduct(null);
    setShowProductForm(false);
    setLoading(false);
  };

  const editProduct = (quarryId, product) => {
    setSelectedQuarryId(quarryId);
    setEditingProduct(product);
    setProductForm({
      quarryId: quarryId,
      name: product.name,
      price: product.price,
      unit: product.unit
    });
    setShowProductForm(true);
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Futa bidhaa hii?')) {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        await addActivity(`Product deleted`);
        alert('Bidhaa imefutwa!');
        loadQuarries();
      }
      setLoading(false);
    }
  };

  // ========== PENDING SELLERS ==========
  const approveSeller = async (sellerId) => {
    setLoading(true);
    const seller = pendingSellers.find(s => s.id === sellerId);
    
    if (seller) {
      // Add to quarries
      const newQuarry = {
        name: seller.business_name,
        location: seller.location,
        region: seller.location.split(',')[0] || 'Unknown',
        phone: seller.phone,
        email: seller.email || '',
        website: '',
        description: seller.description || 'Hakuna maelezo',
        type: seller.business_type === 'duka' ? 'rejareja' : 'jumla',
        delivery: 'Mtaongea na muuzaji',
        payment: 'Mtaongea na muuzaji',
        open_hours: 'Mtaongea na muuzaji',
        established: new Date().getFullYear().toString(),
        employees: 'Mtaongea na muuzaji',
        featured: false,
        rating: 0,
        reviews: 0,
        images: [],
        video: ''
      };
      
      const { error: quarryError } = await supabase
        .from('quarries')
        .insert([newQuarry]);
      
      if (quarryError) {
        alert('Error: ' + quarryError.message);
      } else {
        // Delete from pending
        await supabase
          .from('pending_sellers')
          .delete()
          .eq('id', sellerId);
        
        await addActivity(`Seller approved: ${seller.business_name}`);
        alert('Muuzaji amekubaliwa!');
        loadQuarries();
        loadPendingSellers();
      }
    }
    setLoading(false);
  };

  const rejectSeller = async (sellerId) => {
    setLoading(true);
    const seller = pendingSellers.find(s => s.id === sellerId);
    
    const { error } = await supabase
      .from('pending_sellers')
      .delete()
      .eq('id', sellerId);
    
    if (error) {
      alert('Error: ' + error.message);
    } else {
      await addActivity(`Seller rejected: ${seller?.business_name}`);
      alert('Muuzaji amekataliwa!');
      loadPendingSellers();
    }
    setLoading(false);
  };

  // ========== UPDATE SETTINGS ==========
  const updateSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('settings')
      .update({
        site_name: settings.siteName,
        site_email: settings.siteEmail,
        site_phone: settings.sitePhone,
        vat_percentage: settings.vatPercentage,
        delivery_fee_dar: settings.deliveryFeeDar,
        delivery_fee_other: settings.deliveryFeeOther
      })
      .eq('id', 1);
    
    if (error) {
      alert('Error: ' + error.message);
    } else {
      await addActivity('Settings updated');
      alert('Mipangilio imehifadhiwa!');
      loadSettings();
    }
    setLoading(false);
  };

  // ========== FILTERS ==========
  const allProducts = [];
  quarries.forEach(quarry => {
    if (quarry.products) {
      quarry.products.forEach(product => {
        allProducts.push({
          ...product,
          quarryName: quarry.name,
          quarryId: quarry.id,
          quarryType: quarry.type
        });
      });
    }
  });

  const filteredQuarries = quarries.filter(q => {
    const matchesSearch = q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || q.type === filterType;
    return matchesSearch && matchesType;
  });

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchProductTerm.toLowerCase());
    const matchesQuarry = filterProductQuarry === '' || p.quarryId === parseInt(filterProductQuarry);
    return matchesSearch && matchesQuarry;
  });

  // ========== STATS ==========
  const stats = [
    { number: quarries.length, label: "Machimbo", icon: "🏗️", color: "#7c3aed" },
    { number: quarries.filter(q => q.type === 'jumla').length, label: "Jumla", icon: "🏭", color: "#ec4899" },
    { number: quarries.filter(q => q.type === 'rejareja').length, label: "Rejareja", icon: "🏪", color: "#10b981" },
    { number: allProducts.length, label: "Bidhaa", icon: "📦", color: "#f59e0b" },
    { number: heroSlides.length, label: "Hero Slides", icon: "🎬", color: "#3b82f6" },
    { number: pendingSellers.length, label: "Pending", icon: "⏳", color: "#ef4444" }
  ];

  // ========== LOGIN ==========
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@baizona.com' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminAuth', 'true');
      setLoginError('');
      addActivity('Admin logged in');
    } else {
      setLoginError('Email au password si sahihi');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminAuth');
    addActivity('Admin logged out');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '400px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>👑</div>
            <h1>Admin Login</h1>
            <p style={{ color: '#666' }}>Ingia kwenye dashboard ya Baizona</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '12px' }} required />
            <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '12px' }} required />
            {loginError && <p style={{ color: 'red', marginBottom: '1rem' }}>{loginError}</p>}
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', padding: '0.75rem', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Ingia</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.7rem', color: '#999' }}>admin@baizona.com / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div><h1>👑 Baizona Admin</h1></div>
          <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '0.25rem', padding: '0 1rem', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'hero', label: '🎬 Hero Slides' },
            { id: 'quarries', label: '🏗️ Machimbo' },
            { id: 'products', label: '📦 Bidhaa Zote' },
            { id: 'pending', label: '⏳ Pending' },
            { id: 'settings', label: '⚙️ Settings' },
            { id: 'activities', label: '📋 Activities' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowQuarryForm(false); setShowHeroForm(false); setShowProductForm(false); }} style={{ padding: '0.75rem 1.25rem', background: activeTab === tab.id ? '#7c3aed' : 'transparent', color: activeTab === tab.id ? 'white' : '#333', border: 'none', borderRadius: '12px 12px 0 0', cursor: 'pointer', fontWeight: 'bold' }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1rem', borderTop: `4px solid ${stat.color}` }}>
                  <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.number}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
              <h2>📋 Shughuli za Hivi Karibuni</h2>
              {activities.slice(0, 10).map(activity => (
                <div key={activity.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{activity.action}</span>
                  <span style={{ fontSize: '0.7rem', color: '#999' }}>{new Date(activity.created_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* HERO SLIDES */}
        {activeTab === 'hero' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2>🎬 Picha Zinazobadilika (Hero Slides)</h2>
              <button onClick={() => { resetHeroForm(); setShowHeroForm(!showHeroForm); }} style={{ background: '#7c3aed', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>➕ Ongeza Slide</button>
            </div>

            {showHeroForm && (
              <form onSubmit={addHeroSlide} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <h3>{editingHeroSlide ? '✏️ Hariri Slide' : '➕ Slide Mpya'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <input type="text" placeholder="Title" value={heroForm.title} onChange={(e) => setHeroForm({...heroForm, title: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Subtitle" value={heroForm.subtitle} onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Button 1 Text" value={heroForm.button1} onChange={(e) => setHeroForm({...heroForm, button1: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Button 1 Link" value={heroForm.button1Link} onChange={(e) => setHeroForm({...heroForm, button1Link: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <input type="text" placeholder="Button 2 Text" value={heroForm.button2} onChange={(e) => setHeroForm({...heroForm, button2: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Button 2 Link" value={heroForm.button2Link} onChange={(e) => setHeroForm({...heroForm, button2Link: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <div style={{ gridColumn: '1/-1' }}>
                    <label>🖼️ Picha ya Slide</label>
                    <input type="file" accept="image/*" onChange={handleHeroImageUpload} />
                    {heroImagePreviews[0] && <img src={heroImagePreviews[0]} alt="Preview" style={{ width: '200px', marginTop: '0.5rem', borderRadius: '8px' }} />}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" disabled={loading} style={{ background: '#7c3aed', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>{loading ? 'Inahifadhi...' : 'Hifadhi'}</button>
                  <button type="button" onClick={resetHeroForm} style={{ background: '#666', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Ghairi</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8f9fa' }}><th style={{ padding: '0.75rem' }}>ID</th><th style={{ padding: '0.75rem' }}>Picha</th><th style={{ padding: '0.75rem' }}>Title</th><th style={{ padding: '0.75rem' }}>Action</th></tr></thead>
                <tbody>
                  {heroSlides.map(slide => (
                    <tr key={slide.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}>{slide.id}</td>
                      <td style={{ padding: '0.75rem' }}><img src={slide.image} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                      <td style={{ padding: '0.75rem' }}>{slide.title?.substring(0, 40)}...</td>
                      <td><button onClick={() => editHeroSlide(slide)} style={{ background: '#f59e0b', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>✏️</button><button onClick={() => deleteHeroSlide(slide.id)} style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MACHIMBO */}
        {activeTab === 'quarries' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2>🏗️ Machimbo ({filteredQuarries.length})</h2>
              <button onClick={() => { resetQuarryForm(); setShowQuarryForm(!showQuarryForm); }} style={{ background: '#7c3aed', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>➕ Ongeza Machimbo</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="🔍 Tafuta..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '12px' }} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '12px' }}><option value="">Aina Zote</option><option value="jumla">🏭 Jumla</option><option value="rejareja">🏪 Rejareja</option></select>
            </div>

            {showQuarryForm && (
              <form onSubmit={addQuarry} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <h3>{editingQuarry ? '✏️ Hariri Machimbo' : '➕ Ongeza Machimbo'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <input type="text" placeholder="Jina *" value={quarryForm.name} onChange={(e) => setQuarryForm({...quarryForm, name: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Eneo (Mkoa) *" value={quarryForm.region} onChange={(e) => setQuarryForm({...quarryForm, region: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="text" placeholder="Location Kamili *" value={quarryForm.location} onChange={(e) => setQuarryForm({...quarryForm, location: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="tel" placeholder="Namba ya Simu *" value={quarryForm.phone} onChange={(e) => setQuarryForm({...quarryForm, phone: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                  <input type="email" placeholder="Barua Pepe" value={quarryForm.email} onChange={(e) => setQuarryForm({...quarryForm, email: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <select value={quarryForm.type} onChange={(e) => setQuarryForm({...quarryForm, type: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }}><option value="jumla">🏭 Machimbo ya Jumla</option><option value="rejareja">🏪 Machimbo ya Rejareja</option></select>
                  <input type="text" placeholder="Usafiri" value={quarryForm.delivery} onChange={(e) => setQuarryForm({...quarryForm, delivery: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <input type="text" placeholder="Saa za Kufungua" value={quarryForm.openHours} onChange={(e) => setQuarryForm({...quarryForm, openHours: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <textarea placeholder="Maelezo" value={quarryForm.description} onChange={(e) => setQuarryForm({...quarryForm, description: e.target.value})} style={{ gridColumn: '1/-1', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} rows="3" />
                  
                  <label style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={quarryForm.featured} onChange={(e) => setQuarryForm({...quarryForm, featured: e.target.checked})} />
                    <span>⭐ Featured Machimbo</span>
                  </label>

                  <div style={{ gridColumn: '1/-1' }}>
                    <label>📍 Location ya Google Maps</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input type="text" placeholder="Latitude (mfano: -6.7924)" value={quarryForm.lat} onChange={(e) => setQuarryForm({...quarryForm, lat: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                      <input type="text" placeholder="Longitude (mfano: 39.2083)" value={quarryForm.lng} onChange={(e) => setQuarryForm({...quarryForm, lng: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <small>💡 Pata coordinates kutoka Google Maps - Bonyeza kulia kwenye eneo → "What's here?"</small>
                  </div>

                  <div style={{ gridColumn: '1/-1' }}>
                    <label>🖼️ Picha za Machimbo</label>
                    <input type="file" accept="image/*" multiple onChange={handleQuarryImageUpload} />
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {quarryImagePreviews.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '80px', height: '80px' }}>
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                          <button type="button" onClick={() => removeQuarryImage(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer' }}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ gridColumn: '1/-1' }}>
                    <label>🎬 Video ya Machimbo</label>
                    <input type="file" accept="video/*" onChange={handleQuarryVideoUpload} />
                    {quarryVideoPreview && <video src={quarryVideoPreview} controls style={{ width: '200px', marginTop: '0.5rem', borderRadius: '8px' }} />}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" disabled={loading} style={{ background: '#7c3aed', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>{loading ? 'Inahifadhi...' : (editingQuarry ? 'Sasisha' : 'Hifadhi')}</button>
                  <button type="button" onClick={resetQuarryForm} style={{ background: '#666', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Ghairi</button>
                </div>
              </form>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8f9fa' }}><th style={{ padding: '0.75rem' }}>ID</th><th style={{ padding: '0.75rem' }}>Picha</th><th style={{ padding: '0.75rem' }}>Jina</th><th style={{ padding: '0.75rem' }}>Eneo</th><th style={{ padding: '0.75rem' }}>Aina</th><th style={{ padding: '0.75rem' }}>Bidhaa</th><th style={{ padding: '0.75rem' }}>Action</th></tr></thead>
                <tbody>
                  {filteredQuarries.map(quarry => (
                    <tr key={quarry.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}>{quarry.id}</td>
                      <td style={{ padding: '0.75rem' }}><img src={quarry.images?.[0] || ''} alt="" style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                      <td style={{ padding: '0.75rem' }}><strong>{quarry.name}</strong></td>
                      <td style={{ padding: '0.75rem' }}>{quarry.location}</td>
                      <td style={{ padding: '0.75rem' }}>{quarry.type === 'jumla' ? '🏭 Jumla' : '🏪 Rejareja'}</td>
                      <td style={{ padding: '0.75rem' }}>{quarry.products?.length || 0}</td>
                      <td><button onClick={() => { setSelectedQuarryId(quarry.id); setProductForm({ quarryId: quarry.id, name: '', price: '', unit: '' }); setEditingProduct(null); setShowProductForm(true); }} style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '0.25rem' }}>➕</button><button onClick={() => editQuarry(quarry)} style={{ background: '#f59e0b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '0.25rem' }}>✏️</button><button onClick={() => deleteQuarry(quarry.id)} style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BIDHAA ZOTE */}
        {activeTab === 'products' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2>📦 Bidhaa Zote ({allProducts.length})</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select value={filterProductQuarry} onChange={(e) => setFilterProductQuarry(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '8px' }}><option value="">Machimbo Yote</option>{quarries.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}</select>
                <input type="text" placeholder="🔍 Tafuta bidhaa..." value={searchProductTerm} onChange={(e) => setSearchProductTerm(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8f9fa' }}><th style={{ padding: '0.75rem' }}>ID</th><th style={{ padding: '0.75rem' }}>Jina la Bidhaa</th><th style={{ padding: '0.75rem' }}>Bei</th><th style={{ padding: '0.75rem' }}>Kipimo</th><th style={{ padding: '0.75rem' }}>Machimbo</th><th style={{ padding: '0.75rem' }}>Action</th></tr></thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}>{product.id}</td>
                      <td style={{ padding: '0.75rem' }}><strong>{product.name}</strong></td>
                      <td style={{ padding: '0.75rem', color: '#7c3aed', fontWeight: 'bold' }}>{product.price}</td>
                      <td style={{ padding: '0.75rem' }}>{product.unit}</td>
                      <td style={{ padding: '0.75rem' }}>{product.quarryName}</td>
                      <td><button onClick={() => editProduct(product.quarryId, product)} style={{ background: '#f59e0b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '0.25rem' }}>✏️</button><button onClick={() => deleteProduct(product.id)} style={{ background: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCT MODAL */}
        {showProductForm && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '500px', width: '90%' }}>
              <h3>{editingProduct ? '✏️ Hariri Bidhaa' : '➕ Ongeza Bidhaa'}</h3>
              <form onSubmit={addProduct}>
                <select value={selectedQuarryId} onChange={(e) => setSelectedQuarryId(parseInt(e.target.value))} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px' }} required disabled={editingProduct}>
                  <option value="">Chagua Machimbo</option>
                  {quarries.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
                </select>
                <input type="text" placeholder="Jina la bidhaa" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                <input type="text" placeholder="Bei (TSh)" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                <input type="text" placeholder="Kipimo (tone, gunia, n.k)" value={productForm.unit} onChange={(e) => setProductForm({...productForm, unit: e.target.value})} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px' }} required />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" disabled={loading} style={{ flex: 1, background: '#7c3aed', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>{loading ? 'Inahifadhi...' : (editingProduct ? 'Sasisha' : 'Hifadhi')}</button>
                  <button type="button" onClick={() => { setShowProductForm(false); setEditingProduct(null); setProductForm({ quarryId: '', name: '', price: '', unit: '' }); }} style={{ flex: 1, background: '#666', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Ghairi</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PENDING SELLERS */}
        {activeTab === 'pending' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <h2>⏳ Wauzaji Wanaosubiri ({pendingSellers.length})</h2>
            {pendingSellers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}><div style={{ fontSize: '3rem' }}>✅</div><p>Hakuna wauzaji wanaosubiri</p></div>
            ) : (
              pendingSellers.map(seller => (
                <div key={seller.id} style={{ background: '#f8f9fa', borderRadius: '16px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div><div><strong>{seller.business_name}</strong></div><div style={{ fontSize: '0.8rem', color: '#666' }}>📍 {seller.location} | 📞 {seller.phone}</div><div style={{ fontSize: '0.75rem', color: '#999' }}>👤 {seller.owner_name}</div></div>
                  <div><button onClick={() => approveSeller(seller.id)} style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>✓ Approve</button><button onClick={() => rejectSeller(seller.id)} style={{ background: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>✕ Reject</button></div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <h2>⚙️ Mipangilio</h2>
            <form onSubmit={updateSettings}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div><label>Jina la Tovuti</label><input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
                <div><label>Barua Pepe</label><input type="email" value={settings.siteEmail} onChange={(e) => setSettings({...settings, siteEmail: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
                <div><label>Namba ya Simu</label><input type="text" value={settings.sitePhone} onChange={(e) => setSettings({...settings, sitePhone: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
                <div><label>VAT (%)</label><input type="number" value={settings.vatPercentage} onChange={(e) => setSettings({...settings, vatPercentage: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
              </div>
              <button type="submit" disabled={loading} style={{ marginTop: '1rem', background: '#7c3aed', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>{loading ? 'Inahifadhi...' : 'Hifadhi'}</button>
            </form>
          </div>
        )}

        {/* ACTIVITIES */}
        {activeTab === 'activities' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem' }}>
            <h2>📋 Historia ya Shughuli</h2>
            {activities.map(activity => (
              <div key={activity.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{activity.action}</span>
                <span style={{ fontSize: '0.7rem', color: '#999' }}>{new Date(activity.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}