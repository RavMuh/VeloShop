'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useStore();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    // Toast yoki bildirishnoma qo'shish mumkin
    console.log('Mahsulot savatga qo\'shildi:', product.name);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
        
        {!product.inStock && (
          <Badge className="absolute top-4 left-4 bg-gray-500">
            Tugagan
          </Badge>
        )}

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link href={`/products/${product.id}`}>
            <Button size="sm" className="mr-2">
              <Eye className="h-4 w-4 mr-1" />
              Ko'rish
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={addToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Savatga
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {product.inStock ? `${product.stockQuantity} ta` : 'Tugagan'}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              <Price price={product.price} />
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                <Price price={product.originalPrice} />
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" size="sm">
                Batafsil
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={addToCart}
              disabled={!product.inStock}
              className="group/btn"
            >
              <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Savatga
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}