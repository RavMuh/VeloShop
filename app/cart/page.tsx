'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

export default function CartPage() {
  const { state, dispatch } = useStore();

  const total = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Savat bo'sh</h1>
          <p className="text-muted-foreground mb-8">
            Hozircha hech qanday mahsulot qo'shilmagan
          </p>
          <Link href="/products">
            <Button size="lg">
              Xarid qilishni boshlash
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Savat</h1>
          <p className="text-muted-foreground">
            {itemCount} ta mahsulot
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Davom etish
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Savatni tozalash
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Buyurtma xulosasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mahsulotlar ({itemCount} ta):</span>
                  <span><Price price={total} /></span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="text-green-600">Bepul</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Jami:</span>
                  <span className="text-primary"><Price price={total} /></span>
                </div>
              </div>

              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full">
                  Buyurtma berish
                </Button>
              </Link>

              <div className="text-center">
                <Link href="/products">
                  <Button variant="link" className="text-sm">
                    Xaridni davom ettirish
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}