import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: 'mountain',
    name: 'Tog\' velosipedlari',
    nameEn: 'Mountain Bikes',
    icon: '🏔️',
    description: 'Tog\' va qo\'pol yo\'llar uchun mustahkam velosipedlar'
  },
  {
    id: 'city',
    name: 'Shahar velosipedlari',
    nameEn: 'City Bikes',
    icon: '🏙️',
    description: 'Shahar bo\'ylab yurish uchun qulay velosipedlar'
  },
  {
    id: 'electric',
    name: 'Elektr velosipedlari',
    nameEn: 'Electric Bikes',
    icon: '⚡',
    description: 'Elektr motor bilan jihozlangan zamonaviy velosipedlar'
  },
  {
    id: 'kids',
    name: 'Bolalar velosipedlari',
    nameEn: 'Kids Bikes',
    icon: '🧒',
    description: 'Bolalar uchun xavfsiz va rangli velosipedlar'
  },
  {
    id: 'accessories',
    name: 'Aksessuarlar',
    nameEn: 'Accessories',
    icon: '🛠️',
    description: 'Velosiped aksessuarlari va ehtiyot qismlari'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Trek Mountain Pro 2024',
    nameEn: 'Trek Mountain Pro 2024',
    price: 1200000,
    originalPrice: 1500000,
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/191037/pexels-photo-191037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[0],
    description: 'Professional tog\' velosipedi, eng qiyin yo\'llar uchun yaratilgan. Karbonli rama va yuqori sifatli komponentlar bilan jihozlangan. Shimano XT grupset va hydraulik disk tormozlar bilan ta\'minlangan.',
    specifications: {
      brand: 'Trek',
      model: 'Mountain Pro 2024',
      size: '29"',
      color: 'Qora/Qizil',
      weight: '12.5kg',
      material: 'Karbon fiber'
    },
    inStock: true,
    stockQuantity: 15,
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Urban Comfort City',
    nameEn: 'Urban Comfort City',
    price: 800000,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[1],
    description: 'Shahar bo\'ylab yurish uchun ideal velosiped. Qulay o\'rindiq va ergonomik dizayn. Ichki viteslar va zanjir himoyasi bilan jihozlangan.',
    specifications: {
      brand: 'Urban',
      model: 'Comfort City',
      size: '26"',
      color: 'Moviy',
      weight: '14kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 23,
    featured: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'E-Bike Power Max',
    nameEn: 'E-Bike Power Max',
    price: 2500000,
    originalPrice: 2800000,
    image: 'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/341484/pexels-photo-341484.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[2],
    description: 'Kuchli elektr motorli velosiped. 80km gacha masofa bosib o\'tish imkoniyati. Litiy-ion batareya va LCD displey bilan jihozlangan.',
    specifications: {
      brand: 'PowerMax',
      model: 'E-Bike 2024',
      size: '28"',
      color: 'Oq/Qora',
      weight: '22kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 8,
    featured: true,
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'Kids Rainbow 16',
    nameEn: 'Kids Rainbow 16',
    price: 450000,
    image: 'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[3],
    description: 'Bolalar uchun rangli va xavfsiz velosiped. Qo\'shimcha g\'ildiraklari va xavfsizlik aksessuarlari bilan jihozlangan.',
    specifications: {
      brand: 'Rainbow',
      model: 'Kids 16',
      size: '16"',
      color: 'Ko\'k/Pushti',
      weight: '8kg',
      material: 'Po\'lat'
    },
    inStock: true,
    stockQuantity: 30,
    featured: false,
    createdAt: '2024-01-30'
  },
  {
    id: '5',
    name: 'Professional Helmet',
    nameEn: 'Professional Helmet',
    price: 150000,
    image: 'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[4],
    description: 'Professional xavfsizlik dub\'ulg\'asi. Engil va mustahkam. Havo oqimi tizimi va sozlanuvchi o\'lcham bilan.',
    specifications: {
      brand: 'SafeRide',
      model: 'Pro Helmet',
      size: 'M/L',
      color: 'Qora',
      weight: '0.3kg',
      material: 'Polikarbonat'
    },
    inStock: true,
    stockQuantity: 50,
    featured: false,
    createdAt: '2024-02-01'
  },
  {
    id: '6',
    name: 'Sport Racing Bike',
    nameEn: 'Sport Racing Bike',
    price: 1800000,
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[0],
    description: 'Sport va poygalar uchun professional velosiped. Yuqori tezlik va nazorat. Karbon rama va aero dizayn bilan.',
    specifications: {
      brand: 'SpeedMax',
      model: 'Racing Pro',
      size: '28"',
      color: 'Qizil',
      weight: '9kg',
      material: 'Karbon'
    },
    inStock: true,
    stockQuantity: 12,
    featured: true,
    createdAt: '2024-02-05'
  },
  {
    id: '7',
    name: 'Giant Escape 3',
    nameEn: 'Giant Escape 3',
    price: 950000,
    originalPrice: 1100000,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[1],
    description: 'Shahar va fitness uchun universal velosiped. Yengil alyuminiy rama va 21 vitesli Shimano grupset bilan jihozlangan.',
    specifications: {
      brand: 'Giant',
      model: 'Escape 3',
      size: '27.5"',
      color: 'Yashil',
      weight: '13kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 18,
    featured: true,
    createdAt: '2024-02-10'
  },
  {
    id: '8',
    name: 'Specialized Rockhopper',
    nameEn: 'Specialized Rockhopper',
    price: 1350000,
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/191037/pexels-photo-191037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[0],
    description: 'Tog\' velosipedining klassik modeli. Mustahkam po\'lat rama va front suspension. Har qanday yo\'l uchun mos.',
    specifications: {
      brand: 'Specialized',
      model: 'Rockhopper',
      size: '29"',
      color: 'Qora/Sariq',
      weight: '14.5kg',
      material: 'Po\'lat'
    },
    inStock: true,
    stockQuantity: 10,
    featured: false,
    createdAt: '2024-02-12'
  },
  {
    id: '9',
    name: 'Cannondale Quick 4',
    nameEn: 'Cannondale Quick 4',
    price: 1050000,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[1],
    description: 'Tez va samarali shahar velosipedi. Fitness va kundalik yurish uchun ideal. Yengil va mustahkam.',
    specifications: {
      brand: 'Cannondale',
      model: 'Quick 4',
      size: '28"',
      color: 'Kulrang',
      weight: '11.5kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 14,
    featured: false,
    createdAt: '2024-02-15'
  },
  {
    id: '10',
    name: 'Bosch E-Mountain',
    nameEn: 'Bosch E-Mountain',
    price: 3200000,
    originalPrice: 3600000,
    image: 'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/341484/pexels-photo-341484.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[2],
    description: 'Tog\' yo\'llari uchun elektr velosiped. Bosch Performance motor va 100km masofa. Full suspension.',
    specifications: {
      brand: 'Bosch',
      model: 'E-Mountain Pro',
      size: '29"',
      color: 'Qora/Ko\'k',
      weight: '24kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 5,
    featured: true,
    createdAt: '2024-02-18'
  },
  {
    id: '11',
    name: 'Kids BMX Stunt',
    nameEn: 'Kids BMX Stunt',
    price: 650000,
    image: 'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[3],
    description: 'Bolalar uchun BMX velosiped. Stunt va o\'yin uchun mustahkam dizayn. Xavfsizlik birinchi o\'rinda.',
    specifications: {
      brand: 'BMX Pro',
      model: 'Kids Stunt',
      size: '20"',
      color: 'Qizil/Qora',
      weight: '10kg',
      material: 'Po\'lat'
    },
    inStock: true,
    stockQuantity: 20,
    featured: false,
    createdAt: '2024-02-20'
  },
  {
    id: '12',
    name: 'LED Bike Lights Set',
    nameEn: 'LED Bike Lights Set',
    price: 85000,
    image: 'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[4],
    description: 'LED chiroqlar to\'plami. Kechki va tungi haydash uchun xavfsizlik. USB orqali zaryadlanadi.',
    specifications: {
      brand: 'BrightRide',
      model: 'LED Pro Set',
      size: 'Universal',
      color: 'Qora',
      weight: '0.2kg',
      material: 'Plastik/Alyuminiy'
    },
    inStock: true,
    stockQuantity: 75,
    featured: false,
    createdAt: '2024-02-22'
  },
  {
    id: '13',
    name: 'Scott Scale 970',
    nameEn: 'Scott Scale 970',
    price: 1650000,
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/191037/pexels-photo-191037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[0],
    description: 'Professional hardtail tog\' velosipedi. Cross-country poygalar uchun yaratilgan. Yengil va tez.',
    specifications: {
      brand: 'Scott',
      model: 'Scale 970',
      size: '29"',
      color: 'Oq/Qizil',
      weight: '11.8kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 7,
    featured: true,
    createdAt: '2024-02-25'
  },
  {
    id: '14',
    name: 'Vintage Classic Cruiser',
    nameEn: 'Vintage Classic Cruiser',
    price: 720000,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[1],
    description: 'Klassik uslubdagi shahar velosipedi. Retro dizayn va zamonaviy qulaylik. Beach cruiser uslubi.',
    specifications: {
      brand: 'Vintage',
      model: 'Classic Cruiser',
      size: '26"',
      color: 'Jigarrang',
      weight: '16kg',
      material: 'Po\'lat'
    },
    inStock: true,
    stockQuantity: 12,
    featured: false,
    createdAt: '2024-02-28'
  },
  {
    id: '15',
    name: 'Folding E-Bike Compact',
    nameEn: 'Folding E-Bike Compact',
    price: 1950000,
    originalPrice: 2200000,
    image: 'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1327373/pexels-photo-1327373.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[2],
    description: 'Buklanadigan elektr velosiped. Shahar transporti uchun ideal. Ixcham va oson saqlash.',
    specifications: {
      brand: 'FoldMax',
      model: 'Compact E-Bike',
      size: '20"',
      color: 'Qora/Sariq',
      weight: '18kg',
      material: 'Alyuminiy'
    },
    inStock: true,
    stockQuantity: 9,
    featured: true,
    createdAt: '2024-03-01'
  },
  {
    id: '16',
    name: 'Water Bottle & Cage Set',
    nameEn: 'Water Bottle & Cage Set',
    price: 45000,
    image: 'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[4],
    description: 'Suv idishi va tutgich to\'plami. BPA-free material va ergonomik dizayn. 750ml hajm.',
    specifications: {
      brand: 'HydroRide',
      model: 'Sport Bottle',
      size: '750ml',
      color: 'Ko\'k',
      weight: '0.15kg',
      material: 'Plastik'
    },
    inStock: true,
    stockQuantity: 100,
    featured: false,
    createdAt: '2024-03-03'
  },
  {
    id: '17',
    name: 'Kids Balance Bike',
    nameEn: 'Kids Balance Bike',
    price: 380000,
    image: 'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[3],
    description: 'Muvozanat velosipedi. 2-5 yosh bolalar uchun. Pedalsiz, muvozanatni o\'rganish uchun ideal.',
    specifications: {
      brand: 'BalanceKids',
      model: 'First Ride',
      size: '12"',
      color: 'Pushti/Oq',
      weight: '3.5kg',
      material: 'Yog\'och'
    },
    inStock: true,
    stockQuantity: 25,
    featured: false,
    createdAt: '2024-03-05'
  },
  {
    id: '18',
    name: 'Professional Bike Lock',
    nameEn: 'Professional Bike Lock',
    price: 120000,
    image: 'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7792/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: categories[4],
    description: 'Yuqori xavfsizlikli velosiped qulfi. U-lock dizayn va hardened steel material. 2 ta kalit.',
    specifications: {
      brand: 'SecureRide',
      model: 'Pro Lock',
      size: 'Medium',
      color: 'Qora',
      weight: '1.2kg',
      material: 'Po\'lat'
    },
    inStock: true,
    stockQuantity: 40,
    featured: false,
    createdAt: '2024-03-07'
  }
];

export const sortOptions = [
  { value: 'name', label: 'Nom bo\'yicha' },
  { value: 'price-asc', label: 'Narx: Arzondan qimmmatga' },
  { value: 'price-desc', label: 'Narx: Qimmatdan arzonga' },
  { value: 'newest', label: 'Eng yangilari' },
  { value: 'featured', label: 'Tavsiya etilgan' }
];