export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: Category;
  description: string;
  specifications: {
    brand: string;
    model: string;
    size: string;
    color: string;
    weight: string;
    material: string;
  };
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Filter {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}