import { Product, Review, IngredientInfo } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'dew-hydrate-serum',
    name: 'Dew Hydrate Serum',
    category: 'Serums',
    price: 12500,
    formattedPrice: '₦12,500',
    tagline: 'Deep cellular hydration with weightless botanical essence',
    description:
      'Our signature multi-depth hydration serum infuses skin with moisture that stays locked in all day. Crafted with botanical aloe, plant squalane, and bio-fermented humectants for an instantly plump, bouncy finish.',
    volume: '30ml / 1.0 fl oz',
    image: '/images/serum.jpg',
    angleImage: '/images/serum-angle.jpg',
    accentColor: '#E3F2F7', // pale aqua
    secondaryColor: '#0E3B2F', // deep forest green
    rating: 4.9,
    reviewCount: 342,
    keyIngredients: ['Pure Aloe Juice', 'Botanical Squalane', 'Hyaluronic Complex', 'Green Tea Extract'],
    benefits: [
      'Delivers all-day hydration without heaviness',
      'Visibly plumps fine dehydration lines',
      'Strengthens the moisture barrier in tropical humidity',
      'Prepares skin for optimal cream absorption'
    ],
    howToUse:
      'Dispense 3–4 drops onto freshly cleansed fingertips. Gently press and smooth over face, neck, and décolletage every morning and evening.',
    routineStep: 2,
    inStock: true,
    isHero: true,
  },
  {
    id: 'dew-daily-cream',
    name: 'Dew Daily Cream',
    category: 'Moisturizers',
    price: 10000,
    formattedPrice: '₦10,000',
    tagline: 'Cloud-soft nourishing barrier protection',
    description:
      'A cushiony, whipped daily moisturizer that seals in lasting moisture without clogging pores. Infused with soothing colloidal oats and ceramides to calm stressed skin and leave a velvety radiant glow.',
    volume: '50ml / 1.7 fl oz',
    image: '/images/cream.jpg',
    accentColor: '#FDF1C8', // soft butter yellow
    secondaryColor: '#0E3B2F',
    rating: 4.8,
    reviewCount: 218,
    keyIngredients: ['Colloidal Oat Flour', 'Ceramide NP', 'Niacinamide (3%)', 'Shea Butter Esters'],
    benefits: [
      'Locks in moisture for over 24 hours',
      'Soothes dryness and wind/sun sensitivity',
      'Silky non-greasy finish ideal under SPF and makeup',
      'Nourishes the natural lipid barrier'
    ],
    howToUse:
      'Warm a coin-sized amount between clean palms. Press gently onto face and neck following your serum. Use morning and night.',
    routineStep: 3,
    inStock: true,
  },
  {
    id: 'dew-cloud-mist',
    name: 'Dew Cloud Mist',
    category: 'Mists',
    price: 8500,
    formattedPrice: '₦8,500',
    tagline: 'Micro-fine botanical hydration whenever you need a lift',
    description:
      'An ultra-fine revitalizing facial mist that deposits microscopic moisture droplets onto skin. Infused with cucumber distillate and green tea antioxidants to reset and awaken tired skin instantly.',
    volume: '100ml / 3.4 fl oz',
    image: '/images/mist.jpg',
    accentColor: '#E3F2F7',
    secondaryColor: '#0E3B2F',
    rating: 4.9,
    reviewCount: 189,
    keyIngredients: ['Cucumber Hydrosol', 'Camellia Sinensis Extract', 'Glycerin', 'Aloe Vera Leaf Water'],
    benefits: [
      'Micro-fine diffuser spray that never disrupts makeup',
      'Instantly relieves mid-day tightness and heat',
      'Enhances absorption of serums and creams',
      'Leaves a refreshed, dewy veil on contact'
    ],
    howToUse:
      'Hold 8–10 inches from face with eyes closed. Mist generously across the face after cleansing, or throughout the day as an instant hydration reset.',
    inStock: true,
  },
  {
    id: 'dew-glow-cleanser',
    name: 'Dew Glow Cleanser',
    category: 'Cleansers',
    price: 9500,
    formattedPrice: '₦9,500',
    tagline: 'Gentle pH-balanced gel that purifies without stripping',
    description:
      'A low-foaming, non-drying gel cleanser designed to wash away impurities, SPF, and excess oils while keeping your skin barrier supple and hydrated. Never leaves your face feeling tight.',
    volume: '200ml / 6.7 fl oz',
    image: '/images/cleanser.jpg',
    accentColor: '#FA7E70', // coral pink
    secondaryColor: '#0E3B2F',
    rating: 4.7,
    reviewCount: 164,
    keyIngredients: ['Gentle Amino Acid Surfactants', 'Green Tea Extract', 'Allantoin', 'Glycerin'],
    benefits: [
      'Effectively lifts daily pollution, excess sebum, and SPF',
      'Maintains ideal natural skin pH (5.5)',
      'Soothes redness and maintains natural bounce',
      'Free from sulfates, artificial fragrances, and drying alcohols'
    ],
    howToUse:
      'Pump 1–2 times into damp hands and lather into a silky foam. Massage onto face in circular motions for 60 seconds, then rinse with lukewarm water.',
    routineStep: 1,
    inStock: true,
  },
  {
    id: 'dew-3-step-bundle',
    name: 'The Daily Dew Ritual (3-Step Set)',
    category: 'Bundles',
    price: 27000,
    formattedPrice: '₦27,000',
    tagline: 'Cleanse, Hydrate, & Protect — Save ₦5,000',
    description:
      'The complete everyday ritual. Includes the Dew Glow Cleanser, Dew Hydrate Serum, and Dew Daily Cream. The essential foundation for balanced, resilient, glowing skin.',
    volume: 'Complete Set (3 full sizes)',
    image: '/images/serum.jpg',
    accentColor: '#FA7E70',
    secondaryColor: '#0E3B2F',
    rating: 5.0,
    reviewCount: 97,
    keyIngredients: ['Cleanse, Hydrate & Nourish Complex'],
    benefits: [
      'Complete 3-step daily skincare regimen',
      'Saves ₦5,000 compared to individual purchases',
      'Free nationwide priority delivery included',
      'Comes with Dew canvas ritual pouch'
    ],
    howToUse:
      'Follow in numerical order: Step 1 Cleanse, Step 2 Hydrate with Serum, Step 3 Lock in with Daily Cream.',
    inStock: true,
  }
];

export const INGREDIENTS: IngredientInfo[] = [
  {
    id: 'aloe-botanical',
    title: 'Aloe-Inspired Hydration',
    subtitle: 'Cold-Pressed Botanical Succulent',
    description:
      'Harvested at peak maturity, our pure aloe vera juice replaces plain water as our primary hydrating base. Rich in polysaccharides and skin-friendly minerals that replenish moisture reservoirs at a cellular level.',
    origin: 'Responsibly cultivated botanical harvests',
    image: '/images/aloe.jpg',
    badge: 'Soothing Core',
    pairing: 'Paired with botanical squalane in Dew Hydrate Serum'
  },
  {
    id: 'oat-comfort',
    title: 'Oat-Inspired Skin Comfort',
    subtitle: 'Micro-Milled Colloidal Oats',
    description:
      'Finely ground colloidal oats deliver beta-glucans and avenanthramides that quiet sensitivity, reduce redness, and fortify the delicate cutaneous lipid matrix against urban stress and harsh weather.',
    origin: 'Whole-grain sustainable milling',
    image: '/images/oats.jpg',
    badge: 'Barrier Fortifier',
    pairing: 'Blended with ceramides in Dew Daily Cream'
  },
  {
    id: 'botanical-extracts',
    title: 'Botanical Extracts',
    subtitle: 'Green Tea & Camellia Leaf',
    description:
      'Packed with polyphenol antioxidants and natural bio-actives, fresh camellia and green tea leaf distillates protect skin against oxidative environmental stress while imparting a tranquil, refreshed sensation.',
    origin: 'Gentle low-temperature water extraction',
    image: '/images/botanicals.jpg',
    badge: 'Antioxidant Shield',
    pairing: 'Infused throughout the entire Dew collection'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Amaka O.',
    location: 'Lekki, Lagos',
    rating: 5,
    date: '3 days ago',
    title: 'My skin has never felt this supple in the Lagos heat',
    comment:
      'Living in Lagos, most hydrating serums either feel like grease or evaporate immediately. Dew Hydrate Serum sinks right in and keeps my skin bouncy and dewy throughout 10-hour workdays. Absolutely in love with the texture.',
    productName: 'Dew Hydrate Serum',
    skinType: 'Combination / Sensitive',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Zainab T.',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '1 week ago',
    title: 'The Daily Cream cured my dry patches within four days',
    comment:
      'The texture of the Daily Cream is unreal—rich enough to calm dry sensitivity from air conditioning, yet completely weightless. It sits perfectly under sunscreen without pilling.',
    productName: 'Dew Daily Cream',
    skinType: 'Dry / Dehydrated',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Tunde B.',
    location: 'Ikeja, Lagos',
    rating: 5,
    date: '2 weeks ago',
    title: 'Finally a cleanser that does not leave my face tight',
    comment:
      'I was skeptical about gentle cleansers removing daily grime, but the Glow Cleanser cleans thoroughly without any tightness whatsoever. Simple packaging and excellent pump design too.',
    productName: 'Dew Glow Cleanser',
    skinType: 'Oily / Blemish-prone',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Chloe M.',
    location: 'London, UK',
    rating: 5,
    date: '2 weeks ago',
    title: 'Editorial elegance meets genuine results',
    comment:
      'The entire 3-step ritual transformed my routine. My complexion feels calm, rested, and visibly luminous. The packaging looks sculptural on my vanity, and the formulation quality is world-class.',
    productName: 'The Daily Dew Ritual',
    skinType: 'Normal / Sensitive',
    verified: true,
  }
];
