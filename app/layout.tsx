import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientRoot from './ClientRoot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "VeloShop - Eng yaxshi velosipedlar O'zbekistonda",
  description: 'Professional velosipedlar, aksessuarlar va xizmatlar. Sifatli mahsulotlar va qulay narxlar.',
  keywords: 'velosiped, bicycle, mountain bike, city bike, electric bike, Uzbekistan',
  authors: [{ name: 'VeloShop' }],
  creator: 'VeloShop',
  publisher: 'VeloShop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://veloshop.uz',
    siteName: 'VeloShop',
    title: "VeloShop - Eng yaxshi velosipedlar O'zbekistonda",
    description: 'Professional velosipedlar, aksessuarlar va xizmatlar. Sifatli mahsulotlar va qulay narxlar.',
    images: [
      {
        url: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'VeloShop - Professional velosipedlar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VeloShop - Eng yaxshi velosipedlar O'zbekistonda",
    description: 'Professional velosipedlar, aksessuarlar va xizmatlar. Sifatli mahsulotlar va qulay narxlar.',
    images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}