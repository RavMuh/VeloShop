'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import ProductSort from '@/components/products/ProductSort';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  const { state } = useStore();
  const products = state.products;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let filtered = products;

    // Apply search query
    if (state.searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (state.filter.categories.length > 0) {
      filtered = filtered.filter(product => 
        state.filter.categories.includes(product.category.id)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= state.filter.priceRange.min && 
      product.price <= state.filter.priceRange.max
    );

    // Apply in stock filter
    if (state.filter.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply URL category filter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      filtered = filtered.filter(product => product.category.id === categoryParam);
    }

    // Apply sorting
    switch (state.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [state.searchQuery, state.filter, state.sortBy, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mahsulotlar</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} ta mahsulot topildi
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <ProductSort />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filterlar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <ProductFilter />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Hech qanday mahsulot topilmadi
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Filterlarni o'zgartirib ko'ring
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}