'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order, Filter } from './types';
import { db } from './firebaseClient';
import { collection, onSnapshot } from 'firebase/firestore';

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  products: Product[];
  darkMode: boolean;
  searchQuery: string;
  filter: Filter;
  sortBy: string;
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<Filter> }
  | { type: 'SET_SORT_BY'; payload: string };

import { products as initialProducts } from './data';

// localStorage dan ma'lumotlarni yuklash
const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
};

// localStorage ga ma'lumotlarni saqlash
const saveToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }
};

const initialState: StoreState = {
  cart: [],
  orders: [],
  products: initialProducts, // Bu keyinroq localStorage dan yuklanadi
  darkMode: false,
  searchQuery: '',
  filter: {
    categories: [],
    priceRange: { min: 0, max: 5000000 },
    inStock: false
  },
  sortBy: 'featured'
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };

    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };

    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };

    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload
      };

    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Firestore-dan mahsulotlarni real-time yuklash
  useEffect(() => {
    // const savedProducts = loadFromStorage('veloshop_products', null); // endi kerak emas
    let savedCart = loadFromStorage('veloshop_cart', []);
    // const savedOrders = loadFromStorage('veloshop_orders', []); // endi kerak emas
    let savedDarkMode = loadFromStorage('veloshop_darkMode', false);

    // cart validatsiyasi
    if (!Array.isArray(savedCart)) {
      savedCart = [];
    }
    // darkMode validatsiyasi
    if (typeof savedDarkMode !== 'boolean') {
      savedDarkMode = false;
    }

    if (savedCart.length > 0) {
      dispatch({ type: 'SET_CART', payload: savedCart });
    }
    if (savedDarkMode) {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, []);

  // Firestore snapshot bo'sh bo'lsa, initialProducts ni saqlash
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));
      if (products.length > 0) {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } else {
        dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore-dan buyurtmalarni real-time yuklash
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        ...(doc.data() as Order),
        id: doc.id,
      }));
      dispatch({ type: 'SET_ORDERS', payload: orders });
    });
    return () => unsubscribe();
  }, []);

  // Boshqa ma'lumotlarni localStorage dan yuklash
  useEffect(() => {
    // const savedProducts = loadFromStorage('veloshop_products', null); // endi kerak emas
    // const savedCart = loadFromStorage('veloshop_cart', []);
    // const savedOrders = loadFromStorage('veloshop_orders', []); // endi kerak emas
    // const savedDarkMode = loadFromStorage('veloshop_darkMode', false);

    // Boshqa ma'lumotlarni yuklash
    // if (savedCart.length > 0) {
    //   dispatch({ type: 'SET_CART', payload: savedCart });
    // }
    // if (savedDarkMode) {
    //   dispatch({ type: 'TOGGLE_DARK_MODE' });
    // }
  }, []);

  // State o'zgarganda localStorage ga saqlash
  useEffect(() => {
    // saveToStorage('veloshop_products', state.products); // endi kerak emas
    // saveToStorage('veloshop_orders', state.orders); // endi kerak emas
  }, [state.products, state.orders]);

  useEffect(() => {
    saveToStorage('veloshop_cart', state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToStorage('veloshop_darkMode', state.darkMode);
  }, [state.darkMode]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}