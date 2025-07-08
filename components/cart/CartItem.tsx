'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useStore();

  const updateQuantity = (quantity: number) => {
    dispatch({ 
      type: 'UPDATE_CART_QUANTITY', 
      payload: { productId: item.product.id, quantity } 
    });
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">{item.product.category.name}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-primary">
                <Price price={item.product.price} />
              </span>
              {item.product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  <Price price={item.product.originalPrice} />
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold">
              <Price price={item.product.price * item.quantity} />
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFromCart}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}