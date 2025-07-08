'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  Bike,
  User,
  Home,
  Package
} from 'lucide-react';
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

export default function Header() {
  const { state, dispatch } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(state.searchQuery);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchInput });
    // Agar mahsulotlar sahifasida bo'lmasak, mahsulotlar sahifasiga o'tamiz
    if (window.location.pathname !== '/products') {
      window.location.href = '/products';
    }
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  // Admin email (change as needed)
  const isAdmin = user?.email === 'admin@example.com';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bike className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">VeloShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>Bosh sahifa</span>
            </Link>
            <Link href="/products" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <Package className="h-4 w-4" />
              <span>Mahsulotlar</span>
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <Link href="/admin" passHref legacyBehavior><a className="btn">Admin panel</a></Link>
                ) : (
                  <Link href="/profile" passHref legacyBehavior><a className="btn">Profil</a></Link>
                )}
                <button onClick={handleLogout} className="btn">Chiqish</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin" passHref legacyBehavior><a className="btn">Kirish</a></Link>
                <Link href="/auth/register" passHref legacyBehavior><a className="btn">Ro'yxatdan o‘tish</a></Link>
              </div>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="text"
                placeholder="Qidirish..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" variant="outline" className="rounded-l-none border-l-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hidden md:flex"
            >
              {state.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="py-4 space-y-4">
              <form onSubmit={handleSearch} className="flex px-4">
                <Input
                  type="text"
                  placeholder="Qidirish..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="rounded-r-none"
                />
                <Button type="submit" variant="outline" className="rounded-l-none border-l-0">
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <nav className="flex flex-col space-y-2 px-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-4 w-4" />
                  <span>Bosh sahifa</span>
                </Link>
                <Link
                  href="/products"
                  className="flex items-center space-x-2 py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Mahsulotlar</span>
                </Link>
                {user ? (
                  <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <Link href="/admin" passHref legacyBehavior><a className="btn">Admin panel</a></Link>
                    ) : (
                      <Link href="/profile" passHref legacyBehavior><a className="btn">Profil</a></Link>
                    )}
                    <button onClick={handleLogout} className="btn">Chiqish</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/auth/signin" passHref legacyBehavior><a className="btn">Kirish</a></Link>
                    <Link href="/auth/register" passHref legacyBehavior><a className="btn">Ro'yxatdan o‘tish</a></Link>
                  </div>
                )}
                <button
                  onClick={() => {
                    toggleDarkMode();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {state.darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{state.darkMode ? 'Yorug\' rejim' : 'Qorong\'i rejim'}</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}