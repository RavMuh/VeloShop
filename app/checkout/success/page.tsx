'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Package } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">
              Buyurtma muvaffaqiyatli qabul qilindi!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg">
                Rahmat! Sizning buyurtmangiz qabul qilindi.
              </p>
              <p className="text-muted-foreground">
                Tez orada siz bilan bog'lanamiz va yetkazib berish vaqtini kelishamiz.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Keyingi qadamlar:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Buyurtma tasdiqlanishi uchun 10-15 daqiqa kuting</li>
                <li>• Bizning mutaxassis siz bilan bog'lanadi</li>
                <li>• Yetkazib berish 1-3 kun ichida amalga oshiriladi</li>
                <li>• To'lov yetkazib berish vaqtida amalga oshiriladi</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Bosh sahifa
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full sm:w-auto">
                  <Package className="h-4 w-4 mr-2" />
                  Xaridni davom ettirish
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}