// ========== SELLERS (WAUZAJI) ==========
export const sellers = [
  {
    id: 1,
    business_name: "Duka la Juma Wholesale",
    location: "Kariakoo, Dar es Salaam",
    phone: "0712345678",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=200",
    cover_image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800",
    description: "Duka kubwa la nguo za vitenge, khanga na viatu kwa bei ya jumla. Tunauza kwa marundo Tanzania nzima."
  },
  {
    id: 2,
    business_name: "Bakhresa Grain Millers",
    location: "Ubungo, Dar es Salaam",
    phone: "0722123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200",
    cover_image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800",
    description: "Wazalishaji wakubwa wa unga, mchele, pasta na bidhaa nyingine za chakula Tanzania nzima."
  },
  {
    id: 3,
    business_name: "Kiwanda cha Mabati Tanzania",
    location: "Chang'ombe, Temeke, Dar es Salaam",
    phone: "0732123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
    cover_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    description: "Mabati ya kuezekea, bati za kuta, mabati ya gauge 28-32 na vifaa vya ujenzi."
  },
  {
    id: 4,
    business_name: "Duka la Halima Wholesale",
    location: "Arusha, Tanzania",
    phone: "0743123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=200",
    cover_image: "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=800",
    description: "Viatu vya wanawake na wanaume kwa jumla, mivuko, mikoba na vifaa vya urembo."
  },
  {
    id: 5,
    business_name: "Tanzania Breweries Ltd",
    location: "Kipawa, Dar es Salaam",
    phone: "0754123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=200",
    cover_image: "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=800",
    description: "Wazalishaji wakubwa wa bia, vinywaji baridi na maji ya kunywa Tanzania."
  },
  {
    id: 6,
    business_name: "Mwanza Wholesale Market",
    location: "Mwanza, Tanzania",
    phone: "0765123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=200",
    cover_image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800",
    description: "Soko kuu la jumla la nguo, viatu na bidhaa za nyumbani kwa wauzaji wa Mwanza na kanda ya ziwa."
  },
  {
    id: 7,
    business_name: "Dodoma General Suppliers",
    location: "Dodoma, Tanzania",
    phone: "0776123456",
    is_verified: false,
    logo_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
    cover_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    description: "Wauzaji wa jumla wa vifaa vya ofisi, vyakula na bidhaa mbalimbali kwa wateja wa Dodoma."
  },
  {
    id: 8,
    business_name: "Mbeya Industrial Products",
    location: "Mbeya, Tanzania",
    phone: "0787123456",
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200",
    cover_image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800",
    description: "Viwanda vya usindikaji wa mazao, mkaa na bidhaa za chakula kwa kusini mwa Tanzania."
  }
];

// ========== PRODUCTS (BIDHAA) ==========
export const products = [
  {
    id: 1,
    seller_id: 1,
    name: "Khanga 6 za Rangi Nyekundu",
    description: "Khanga za kiwango cha juu, rangi ya kudumu, ukubwa 6. Zinafaa kwa matumizi ya nyumbani au kuuza kwa jumla.",
    price: 45000,
    category: "Nguo",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400"
    ],
    stock: 50,
    views: 120,
    seller: sellers[0]
  },
  {
    id: 2,
    seller_id: 1,
    name: "Vitenge V12 Vipya 2025",
    description: "Vitenge vya kisasa, michoro maridadi ya Kiafrika. Bei ni kwa kumi na mbili (12).",
    price: 120000,
    category: "Nguo",
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400",
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400"
    ],
    stock: 30,
    views: 85,
    seller: sellers[0]
  },
  {
    id: 3,
    seller_id: 1,
    name: "Nguo za Watoto Marundo",
    description: "Nguo za watoto wa miaka 0-5, marundo ya vipande 50. Bei ya jumla kwa wauzaji.",
    price: 150000,
    category: "Nguo",
    images: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400"
    ],
    stock: 20,
    views: 45,
    seller: sellers[0]
  },
  {
    id: 4,
    seller_id: 2,
    name: "Unga wa Sembe 50kg",
    description: "Unga wa sembe wa ubora wa juu, unafaa kwa kiwanda cha mkate au matumizi ya kaya kubwa.",
    price: 75000,
    category: "Chakula",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400"
    ],
    stock: 500,
    views: 200,
    seller: sellers[1]
  },
  {
    id: 5,
    seller_id: 2,
    name: "Mchele Super 25kg",
    description: "Mchele mweupe, ubora wa kwanza, kupikika vizuri, hakuna mawe.",
    price: 45000,
    category: "Chakula",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400"
    ],
    stock: 300,
    views: 150,
    seller: sellers[1]
  },
  {
    id: 6,
    seller_id: 2,
    name: "Pasta Spaghetti Karton",
    description: "Spaghetti 500g, karton moja ina paket 20. Bei ya jumla kwa wauzaji.",
    price: 35000,
    category: "Chakula",
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400"
    ],
    stock: 200,
    views: 75,
    seller: sellers[1]
  },
  {
    id: 7,
    seller_id: 3,
    name: "Mabati Gauge 30",
    description: "Mabati ya kuezekea, urefu 2.5m, gauge 30. Unywaji wa kutosha, rangi ya bluu.",
    price: 25000,
    category: "Vifaa vya Ujenzi",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
    ],
    stock: 1000,
    views: 45,
    seller: sellers[2]
  },
  {
    id: 8,
    seller_id: 3,
    name: "Mabati Gauge 28 Nyeusi",
    description: "Mabati nyeusi gauge 28, urefu 2.5m. Nzito na imara zaidi.",
    price: 35000,
    category: "Vifaa vya Ujenzi",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
    ],
    stock: 800,
    views: 60,
    seller: sellers[2]
  },
  {
    id: 9,
    seller_id: 4,
    name: "Viatu vya Wanawake Marundo",
    description: "Viatu vya wanawake aina mbalimbali, ukubwa 36-40. Marundo ya jozi 50.",
    price: 250000,
    category: "Viatu",
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400"
    ],
    stock: 15,
    views: 90,
    seller: sellers[3]
  },
  {
    id: 10,
    seller_id: 4,
    name: "Mikoba ya Kienyeji Marundo",
    description: "Mikoba ya kienyeji iliyoshonwa kwa mkono. Inauzwa kwa marundo ya vipande 20.",
    price: 180000,
    category: "Vifaa vya Nyumbani",
    images: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400"
    ],
    stock: 25,
    views: 55,
    seller: sellers[3]
  },
  {
    id: 11,
    seller_id: 5,
    name: "Bia Serengeti Karton 24",
    description: "Bia Serengeti, karton moja ina makopo 24. Bei ya jumla kwa wauzaji.",
    price: 45000,
    category: "Vinywaji",
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=400"
    ],
    stock: 500,
    views: 180,
    seller: sellers[4]
  },
  {
    id: 12,
    seller_id: 5,
    name: "Maji Kilimanjaro Karton",
    description: "Maji ya kunywa Kilimanjaro, 1.5L. Karton moja ina chupa 12.",
    price: 15000,
    category: "Vinywaji",
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400"
    ],
    stock: 1000,
    views: 120,
    seller: sellers[4]
  }
];

// ========== CATEGORIES (KATEGORIA) ==========
export const categories = [
  { id: 1, name: "Nguo", icon: "👕", count: 156 },
  { id: 2, name: "Chakula", icon: "🍚", count: 98 },
  { id: 3, name: "Vifaa vya Ujenzi", icon: "🏗️", count: 67 },
  { id: 4, name: "Viatu", icon: "👟", count: 89 },
  { id: 5, name: "Vifaa vya Nyumbani", icon: "🛋️", count: 112 },
  { id: 6, name: "Vinywaji", icon: "🍺", count: 54 },
  { id: 7, name: "Vifaa vya Umeme", icon: "💡", count: 43 },
  { id: 8, name: "Kemikali", icon: "🧪", count: 32 }
];

// ========== REVIEWS (MAONI) ==========
export const reviews = [
  {
    id: 1,
    product_id: 1,
    buyer_name: "Asha M.",
    rating: 5,
    comment: "Khanga nzuri sana, rangi imeshikilia baada ya kufulia. Muuzaji alituma haraka.",
    date: "2025-01-15"
  },
  {
    id: 2,
    product_id: 1,
    buyer_name: "John K.",
    rating: 4,
    comment: "Bidhaa nzuri, ilichelewa kidogo kufika.",
    date: "2025-01-10"
  },
  {
    id: 3,
    product_id: 4,
    buyer_name: "Salma H.",
    rating: 5,
    comment: "Unga mzuri, mkate unatoka vizuri. Nitaendelea kununua.",
    date: "2025-01-20"
  },
  {
    id: 4,
    product_id: 11,
    buyer_name: "Ramadhan J.",
    rating: 5,
    comment: "Bia safi, wateja wangu wanapenda. Muuzaji anawasiliana vizuri.",
    date: "2025-01-18"
  }
];

// ========== FACTORIES (VIWANDA) - KWA FACTORIES PAGE ==========
export const factoriesData = [
  {
    id: 1,
    name: "Bakhresa Grain Millers",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    sector: "Chakula",
    type: "Unga, Mchele, Pasta",
    production: "Tani 500,000+ / mwaka",
    employees: "5,000+",
    founded: 1985,
    phone: "+255 22 286 1600",
    email: "info@bakhresa.com",
    website: "www.bakhresa.com",
    certifications: ["TBS", "ISO 9001", "Halal", "HACCP"],
    exports: ["Kenya", "Uganda", "DRC", "Rwanda", "Burundi"],
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600"
    ],
    description: "Kiwanda kikubwa zaidi cha kusaga nafaka Afrika Mashariki. Wazalishaji wakuu wa unga, mchele, pasta na bidhaa nyingine za chakula.",
    products: [
      { name: "Unga wa Sembe 50kg", price: "75,000", link: "/product/4" },
      { name: "Mchele Super 25kg", price: "45,000", link: "/product/5" },
      { name: "Pasta Spaghetti", price: "35,000", link: "/product/6" }
    ]
  },
  {
    id: 2,
    name: "Tanzania Breweries Ltd (TBL)",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    sector: "Vinywaji",
    type: "Bia, Maji, Vinywaji Baridi",
    production: "Mabilioni ya lita / mwaka",
    employees: "3,500+",
    founded: 1933,
    phone: "+255 22 241 0800",
    email: "info@tbl.co.tz",
    website: "www.tbl.co.tz",
    certifications: ["TBS", "ISO 14001", "ISO 22000"],
    exports: ["Kenya", "Uganda", "DRC", "Rwanda", "South Sudan"],
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=600",
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=600"
    ],
    description: "Kiwanda kikubwa cha bia na vinywaji Tanzania, wazalishaji wa Serengeti, Kilimanjaro, Safari na maji ya kunywa.",
    products: [
      { name: "Bia Serengeti", price: "45,000", link: "/product/11" },
      { name: "Maji Kilimanjaro", price: "15,000", link: "/product/12" }
    ]
  },
  {
    id: 3,
    name: "Tanga Cement Company (Simba Cement)",
    location: "Tanga",
    region: "Tanga",
    sector: "Ujenzi",
    type: "Saruji, Cement",
    production: "Tani 2,500,000+ / mwaka",
    employees: "1,200+",
    founded: 1970,
    phone: "+255 27 264 4200",
    email: "info@tangacement.co.tz",
    website: "www.tangacement.co.tz",
    certifications: ["TBS", "ISO 9001", "CE Marking"],
    exports: ["Kenya", "Uganda", "DRC", "Rwanda", "Burundi"],
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
    ],
    description: "Kiwanda kikubwa cha saruji Tanzania, inayozalisha Simba Cement ubora wa juu kwa miradi ya ujenzi nchini na kanda.",
    products: [
      { name: "Simba Cement 50kg", price: "18,000", link: "/product/7" },
      { name: "Simba Cement 25kg", price: "9,500", link: "/product/8" }
    ]
  },
  {
    id: 4,
    name: "Kilombero Sugar Company",
    location: "Morogoro",
    region: "Morogoro",
    sector: "Chakula",
    type: "Sukari, Molasi",
    production: "Tani 150,000+ / mwaka",
    employees: "2,500+",
    founded: 1960,
    phone: "+255 23 262 0000",
    email: "info@kilomberosugar.co.tz",
    website: "www.kilomberosugar.co.tz",
    certifications: ["TBS", "ISO 22000", "Fair Trade"],
    exports: ["Kenya", "Uganda", "DRC", "Rwanda"],
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600"
    ],
    description: "Kiwanda kikubwa cha kusaga miwa na kuzalisha sukari Tanzania, kinachotoa ajira kwa maelfu ya wananchi.",
    products: [
      { name: "Sukari ya Meza 50kg", price: "120,000", link: "/product/13" },
      { name: "Sukari ya Viwandani", price: "Tanzu", link: "#" }
    ]
  }
];

// ========== WHOLESALE SHOPS (MADUKA YA JUMLA) ==========
export const wholesaleShops = [
  {
    id: 1,
    name: "Kariakoo Market",
    location: "Dar es Salaam",
    region: "Dar es Salaam",
    address: "Kariakoo, Ilala District",
    type: "Nguo, Viatu, Vyakula, Electronics, Vifaa vya Nyumbani",
    years: 50,
    shops: "10,000+",
    daily_customers: "50,000+",
    phone: "+255 22 218 0000",
    email: "info@kariakoomarket.com",
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 1520,
    images: [
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600"
    ],
    description: "Soko kubwa zaidi la jumla na rejareja Afrika Mashariki. Kituo kikuu cha biashara Tanzania.",
    open_hours: "6:00 AM - 8:00 PM",
    products: [
      { name: "Vitenge V12", price: "120,000", link: "/product/2" },
      { name: "Khanga 6", price: "45,000", link: "/product/1" }
    ]
  },
  {
    id: 2,
    name: "Mwanza Wholesale Market",
    location: "Mwanza",
    region: "Mwanza",
    address: "Kirumba, Mwanza City",
    type: "Nguo, Viatu, Samaki, Mazao",
    years: 35,
    shops: "3,000+",
    daily_customers: "15,000+",
    phone: "+255 28 254 3000",
    email: "info@mwanzamarket.com",
    verified: true,
    featured: true,
    rating: 4.5,
    reviews: 890,
    images: [
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=600",
      "https://images.unsplash.com/photo-1567446537708-ac4aa8c25e6a?w=600"
    ],
    description: "Soko kuu la jumla la Mwanza na kanda ya Ziwa Victoria. Soko la samaki kubwa Tanzania.",
    open_hours: "7:00 AM - 7:00 PM",
    products: [
      { name: "Nguo za Wanaume", price: "200,000", link: "/product/13" }
    ]
  },
  {
    id: 3,
    name: "Arusha Wholesale Market",
    location: "Arusha",
    region: "Arusha",
    address: "Sokoine Road, Arusha City",
    type: "Vyakula, Vifaa vya Utalii, Nguo, Mazao",
    years: 40,
    shops: "2,500+",
    daily_customers: "12,000+",
    phone: "+255 27 254 4000",
    email: "info@arushamarket.com",
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 650,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
    ],
    description: "Soko la jumla la Arusha linalohudumia watalii na wakazi wa kanda ya kaskazini.",
    open_hours: "8:00 AM - 6:00 PM",
    products: []
  },
  {
    id: 4,
    name: "Zanzibar Stone Town Market",
    location: "Zanzibar",
    region: "Zanzibar",
    address: "Stone Town, Zanzibar City",
    type: "Kanga, Vitenge, Viungo, Utalii",
    years: 100,
    shops: "1,500+",
    daily_customers: "20,000+",
    phone: "+255 24 223 0000",
    email: "info@zanzibarmarket.com",
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 2100,
    images: [
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600"
    ],
    description: "Soko la kihistoria la Zanzibar, maarufu kwa kanga, vitenge, viungo na vifaa vya utalii.",
    open_hours: "7:00 AM - 8:00 PM",
    products: [
      { name: "Kanga za Zanzibar", price: "45,000", link: "/product/1" }
    ]
  }
];
