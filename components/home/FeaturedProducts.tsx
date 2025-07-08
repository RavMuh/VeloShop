'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

export default function FeaturedProducts() {
  const { state, dispatch } = useStore();
  const products = state.products;
  const featuredProducts = products.filter(product => product.featured);

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    // Toast yoki bildirishnoma qo'shish mumkin
    console.log('Mahsulot savatga qo\'shildi:', product.name);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tavsiya etilgan mahsulotlar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Eng sifatli va mashhur velosipedlarimiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
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
                      onClick={() => addToCart(product)}
                      className="group/btn"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Savatga
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Barcha mahsulotlar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}