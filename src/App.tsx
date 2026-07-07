import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import InquiryForm from './components/InquiryForm';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';
import { Hammer, Sparkles, Trophy, CheckSquare } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleSelectProductForQuote = (productName: string) => {
    setSelectedProduct(productName);
    // Smooth scroll straight to the quote form section
    setTimeout(() => {
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleScrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-brand-bg flex flex-col font-sans selection:bg-brand-accent/20 selection:text-brand-accent">
      
      {/* Universal Floating WhatsApp Button with subtle pulse */}
      <WhatsAppButton />

      {/* Header with Call Now action */}
      <Header 
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
      />

      {isAdminOpen ? (
        // Secure Inquiries / Administrative Database Portal
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      ) : (
        // Main Woodshop Storefront
        <main className="flex-grow">
          
          {/* Beautiful Timber Hero Section */}
          <Hero onScrollToSection={handleScrollToSection} />

          {/* Core Values / Craftsmanship Section */}
          <section id="craftsmanship-details" className="py-16 bg-stone-200/40 border-b border-brand-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Value Item 1 */}
                <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-brand-border/60 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="p-3 bg-brand-bg text-brand-accent rounded-xl shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-semibold text-stone-900">Seasoned Slabs</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      We source premium raw timbers seasoned for months to eradicate internal moisture, ensuring zero wrapping, warping, or cracking.
                    </p>
                  </div>
                </div>

                {/* Value Item 2 */}
                <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-brand-border/60 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="p-3 bg-brand-bg text-brand-accent rounded-xl shrink-0">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-semibold text-stone-900">Master Artistry</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Hand-sanded, custom chiseled, and double interlocking joints engineered by master woodcarvers with over 20+ years in furniture crafting.
                    </p>
                  </div>
                </div>

                {/* Value Item 3 */}
                <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-brand-border/60 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="p-3 bg-brand-bg text-brand-accent rounded-xl shrink-0">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-semibold text-stone-900">Bespoke Customizer</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Adjust dimensions to match your dining room, select your desired finish, or configure specific compartments for wardrobes.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Product Catalog Showcase */}
          <ProductCatalog onSelectProductForQuote={handleSelectProductForQuote} />

          {/* Handcrafted Quote Request Form */}
          <InquiryForm 
            selectedProductName={selectedProduct}
            onClearSelectedProduct={() => setSelectedProduct('')}
          />

        </main>
      )}

      {/* Footer Section */}
      <footer id="website-footer" className="bg-[#1C1C14] text-stone-300 py-16 border-t border-brand-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="font-serif text-xl font-semibold tracking-wider text-stone-50 block">
              AURA WOOD FURNITURE
            </span>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              We engineer custom, handcrafted solid wood furniture for residential properties, executive offices, and luxury environments. True wood artistry meant for lifetimes.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-brand-bg font-bold bg-brand-accent/80 px-3 py-1.5 rounded-full border border-brand-border/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Bespoke Carpenters
            </div>
          </div>

          {/* Direct Contact details */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-stone-100 uppercase tracking-widest">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-sans">
              <p>For custom dimensions, pricing inquiries, or timber details, call or chat directly with our design specialists.</p>
              <div className="space-y-1 font-mono text-stone-300">
                <p className="flex items-center gap-2">
                  <span className="text-brand-accent font-semibold">Phone:</span>
                  <a href="tel:+923234208816" className="hover:text-amber-400 transition-colors underline">+92 323 4208816</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500 font-semibold">WhatsApp:</span>
                  <a href="https://wa.me/923234208816" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors underline">+92 323 4208816</a>
                </p>
              </div>
            </div>
          </div>

          {/* Admin gate link & quick navigation links */}
          <div className="space-y-4 flex flex-col md:items-end justify-between">
            <div className="space-y-2 text-left md:text-right">
              <h4 className="font-serif text-sm font-semibold text-stone-100 uppercase tracking-widest">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                <li>
                  <button 
                    onClick={() => {
                      handleScrollToSection('hero-section');
                      if (isAdminOpen) setIsAdminOpen(false);
                    }}
                    className="hover:text-brand-accent transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleScrollToSection('catalog');
                      if (isAdminOpen) setIsAdminOpen(false);
                    }}
                    className="hover:text-brand-accent transition-colors cursor-pointer"
                  >
                    Timber Collection
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleScrollToSection('quote-form');
                      if (isAdminOpen) setIsAdminOpen(false);
                    }}
                    className="hover:text-brand-accent transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </li>
              </ul>
            </div>

            {/* Backoffice Log gate link */}
            <div className="pt-4 md:pt-0">
              <button
                id="owner-portal-toggle-btn"
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="text-[9px] font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer border border-stone-800 hover:border-brand-accent bg-[#0F0F0B] px-4 py-2 rounded-full"
              >
                {isAdminOpen ? '← Return to storefront' : '🔒 Owner Backoffice'}
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-850 text-center text-[10px] text-stone-500 font-sans">
          <p>© {new Date().getFullYear()} AURA WOOD FURNITURE. All rights reserved. Handcrafted Solid Timber Masterpieces.</p>
          <p className="mt-1">Designed with genuine seasoned local woodworking slabs. Secure database connection. No email tracking is utilized.</p>
        </div>
      </footer>

    </div>
  );
}
