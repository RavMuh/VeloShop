import Link from 'next/link';
import { Bike, Phone, Mail, MapPin, Instagram, Facebook, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Bike className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">VeloShop</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              O'zbekistondagi eng yaxshi velosipedlar do'koni. 
              Sifatli mahsulotlar va professional xizmat.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Send className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tezkor havolalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Mahsulotlar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kategoriyalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=mountain" className="text-muted-foreground hover:text-primary transition-colors">
                  Tog' velosipedlari
                </Link>
              </li>
              <li>
                <Link href="/products?category=city" className="text-muted-foreground hover:text-primary transition-colors">
                  Shahar velosipedlari
                </Link>
              </li>
              <li>
                <Link href="/products?category=electric" className="text-muted-foreground hover:text-primary transition-colors">
                  Elektr velosipedlari
                </Link>
              </li>
              <li>
                <Link href="/products?category=kids" className="text-muted-foreground hover:text-primary transition-colors">
                  Bolalar velosipedlari
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bog'lanish</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@veloshop.uz</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Toshkent, Yunusobod tumani</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 VeloShop. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}