'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Order } from '@/lib/types';
import Price from '@/components/ui/Price';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseClient';
import { addDoc, collection } from 'firebase/firestore';

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    deliveryMethod: 'delivery' as 'pickup' | 'delivery',
    paymentMethod: 'cash' as 'cash' | 'card' | 'transfer'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const total = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!user) {
      setError('Buyurtma berish uchun avval tizimga kiring!');
      setIsSubmitting(false);
      return;
    }

    const order: Order = {
      id: Date.now().toString(),
      ...formData,
      items: state.cart,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email,
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      dispatch({ type: 'ADD_ORDER', payload: order });
      dispatch({ type: 'CLEAR_CART' });
      setIsSubmitting(false);
      router.push('/checkout/success');
    } catch (e: any) {
      setError('Buyurtma saqlashda xatolik: ' + e.message);
      setIsSubmitting(false);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Savat bo'sh</h1>
          <p className="text-muted-foreground mb-8">
            Buyurtma berish uchun mahsulot qo'shing
          </p>
          <Button onClick={() => router.push('/products')}>
            Mahsulotlarga o'tish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Orqaga
      </Button>

      <h1 className="text-3xl font-bold mb-8">Buyurtma berish</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">To'liq ism *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Telefon raqam *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress">Manzil *</Label>
                  <Textarea
                    id="customerAddress"
                    placeholder="To'liq manzil kiriting"
                    value={formData.customerAddress}
                    onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yetkazib berish</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.deliveryMethod} 
                  onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Yetkazib berish (Bepul)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Do'kondan olib ketish</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>To'lov usuli</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Naqd pul</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Plastik karta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">Bank o'tkazmasi</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Buyurtma xulosasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} x <Price price={item.product.price} /></p>
                        </div>
                      </div>
                      <span className="font-medium"><Price price={item.product.price * item.quantity} /></span>
                    </div>
                  ))}
                </div>

                <Separator />

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

                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Buyurtma berilmoqda...' : 'Buyurtma berish'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}