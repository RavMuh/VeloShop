'use client';

'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Categories />
    </div>
  );
}