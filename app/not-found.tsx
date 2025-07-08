'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Sahifa topilmadi</h2>
          <p className="text-muted-foreground">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <Link href="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Bosh sahifa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}