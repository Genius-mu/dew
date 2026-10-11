import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductStory } from './components/ProductStory';
import { IngredientStory } from './components/IngredientStory';
import { TheRitual } from './components/TheRitual';
import { Community } from './components/Community';
import { FinalCollection } from './components/FinalCollection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastNotification } from './components/ToastNotification';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FFFFFF] selection:bg-[#FDE89D] selection:text-[#0E3B2F]">
      {/* Polished Editorial Navigation (Inspired by Supaste) */}
      <Navbar />

      {/* SECTION 1 — Hero: “Your Skin, In Its Element” (Supplied Sky Background) */}
      <Hero />

      {/* SECTION 2 — Featured Products: “Meet Your Daily Dew” */}
      <FeaturedProducts />

      {/* SECTION 3 — Product Story: “A Little More Hydration” (3D GSAP Scrubbed Scene) */}
      <ProductStory />

      {/* SECTION 4 — Ingredient Story: “Good Things, Thoughtfully Chosen” */}
      <IngredientStory />

      {/* SECTION 5 — The Ritual: “Three Steps. Your Own Rhythm.” */}
      <TheRitual />

      {/* SECTION 6 — Community & Social Proof: “Your Skin. Your Story.” */}
      <Community />

      {/* SECTION 7 — Final Collection & Conversion: “Find Your Daily Dew” (Sky Callback) */}
      <FinalCollection />

      {/* Solid Dark Forest-Green Brand Footer */}
      <Footer />

      {/* Interactive E-commerce Slide Drawer & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastNotification />
    </main>
  );
}
