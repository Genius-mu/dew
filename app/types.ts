export interface Product {
  id: string;
  name: string;
  category: 'Serums' | 'Moisturizers' | 'Mists' | 'Cleansers' | 'Bundles';
  price: number; // in NGN (Nigerian Naira)
  formattedPrice: string;
  tagline: string;
  description: string;
  volume: string;
  image: string;
  angleImage?: string;
  accentColor: string; // solid hex color
  secondaryColor: string;
  rating: number;
  reviewCount: number;
  keyIngredients: string[];
  benefits: string[];
  howToUse: string;
  routineStep?: number;
  inStock: boolean;
  isHero?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  skinType: string;
  verified: boolean;
}

export interface IngredientInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  origin: string;
  image: string;
  badge: string;
  pairing: string;
}
