'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';
import { categories } from '@/lib/data';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

export default function ProductFilter() {
  const { state, dispatch } = useStore();
  const { filter } = state;

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filter.categories, categoryId]
      : filter.categories.filter(id => id !== categoryId);
    
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { categories: newCategories } 
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { 
        priceRange: { min: values[0], max: values[1] } 
      } 
    });
  };

  const handleInStockChange = (checked: boolean) => {
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { inStock: checked } 
    });
  };

  const clearFilters = () => {
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { 
        categories: [], 
        priceRange: { min: 0, max: 5000000 }, 
        inStock: false 
      } 
    });
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filterlar</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Tozalash
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Kategoriyalar</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filter.categories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <label 
                  htmlFor={category.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Narx oralig'i</h3>
          <div className="space-y-4">
            <Slider
              value={[filter.priceRange.min, filter.priceRange.max]}
              onValueChange={handlePriceRangeChange}
              max={5000000}
              min={0}
              step={50000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span><Price price={filter.priceRange.min} /></span>
              <span><Price price={filter.priceRange.max} /></span>
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filter.inStock}
              onCheckedChange={handleInStockChange}
            />
            <label 
              htmlFor="inStock" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Faqat mavjud mahsulotlar
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}