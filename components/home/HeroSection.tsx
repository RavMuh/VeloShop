'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">1000+ mamnun mijozlar</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Eng yaxshi{' '}
                <span className="text-primary">velosipedlar</span>{' '}
                O'zbekistonda
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Professional va sifatli velosipedlar, aksessuarlar va xizmatlar. 
                Sizning hayotingizni yanada faol qiling!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Mahsulotlarni ko'rish
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="outline" className="group">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Savat
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Bepul yetkazib berish</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>2 yillik kafolat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>24/7 qo'llab-quvvatlash</span>
              </div>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 scale-95 blur-sm" />
            <div className="relative z-10 bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto">
              <img
                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional Mountain Bike"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                50% chegirma
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}