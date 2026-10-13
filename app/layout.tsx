import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Dew | Skincare for Your Everyday Ritual',
  description:
    'Thoughtful botanical formulas. Everyday rituals. Skin that feels like you. Discover Dew Hydrate Serum, Daily Cream, and Glow Cleanser.',
  keywords: [
    'Dew skincare',
    'hydrating serum',
    'botanical skincare Nigeria',
    'daily moisturizer',
    'clean skincare Lagos',
    'facial mist',
    'gentle cleanser'
  ],
  openGraph: {
    title: 'Dew | Skincare for Your Everyday Ritual',
    description: 'Thoughtful botanical formulas. Everyday rituals. Skin that feels like you.',
    type: 'website',
    images: ['/images/serum.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${cormorant.variable}`}>
      <body className="min-h-screen text-[#0D1F2D] antialiased selection:bg-[#FFFFFF] selection:text-[#0E3B2F] relative">
        {/* Continuous Cloud-Framed Blue Sky fixed background from beginning to end */}
        <div className="sky-fixed-bg" aria-hidden="true" />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
