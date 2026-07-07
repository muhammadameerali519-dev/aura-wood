import { Phone, FileText, Sparkles, Shield } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section 
      id="hero-section" 
      className="relative bg-brand-bg/40 py-16 lg:py-24 overflow-hidden border-b border-brand-border"
    >
      {/* Decorative Warm Backlighting */}
      <div id="hero-ambient-lighting-1" className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div id="hero-ambient-lighting-2" className="absolute bottom-0 right-10 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div id="hero-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="hero-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div id="hero-text-block" className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div id="hero-badge" className="inline-flex items-center gap-2 px-3 py-1 bg-white/85 border border-brand-border text-brand-accent rounded-full text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              100% Solid Seasoned Premium Woodwork
            </div>
            
            <h1 id="hero-headline" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 leading-tight tracking-tight">
              Timeless Designs, <br />
              <span className="text-brand-accent italic font-normal">Handcrafted</span> for <br />
              Generations.
            </h1>

            <p id="hero-subheadline" className="text-stone-650 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              At <strong className="text-stone-850 font-semibold">AURA WOOD FURNITURE</strong>, we turn premium Burma Teak, Royal Sheesham, and Oak into timeless masterpieces. Custom sized, hand-polished, and built to survive lifetimes.
            </p>

            {/* Quick trust metrics */}
            <div id="hero-metrics" className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 py-2">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-3xl font-bold text-brand-accent">100%</span>
                <span className="text-[9px] text-stone-500 font-bold tracking-widest uppercase mt-1">Genuine Timber</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-brand-border pl-4">
                <span className="font-serif text-3xl font-bold text-brand-accent">25+</span>
                <span className="text-[9px] text-stone-500 font-bold tracking-widest uppercase mt-1">Years Warranty</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-brand-border pl-4">
                <span className="font-serif text-3xl font-bold text-brand-accent">Bespoke</span>
                <span className="text-[9px] text-stone-500 font-bold tracking-widest uppercase mt-1">Made-to-Order</span>
              </div>
            </div>

            {/* CTA Action Bar */}
            <div id="hero-actions-bar" className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                id="hero-call-now-btn"
                href="tel:+923234208816"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-accent hover:opacity-90 text-stone-50 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call: +92 323 4208816</span>
              </a>
              
              <button
                id="hero-quote-btn"
                onClick={() => onScrollToSection('quote-form')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-850 text-stone-50 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-400" />
                <span>Get a Quote</span>
              </button>
            </div>
          </div>

          {/* Hero Media Right: Dynamic double rotated frames from design guidelines */}
          <div id="hero-media-block" className="lg:col-span-6 relative pt-8 lg:pt-0">
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              
              {/* Card 1: Rotated left */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl rotate-[-3deg] aspect-[4/5] bg-cover bg-center border-[6px] sm:border-[8px] border-white transition-transform hover:rotate-0 duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" 
                  alt="Aura Wood Classic Sofa Collection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow-sm">
                  Royal Living Room
                </div>
              </div>

              {/* Card 2: Rotated right + offset top */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl rotate-[3deg] aspect-[4/5] bg-cover bg-center border-[6px] sm:border-[8px] border-white mt-10 sm:mt-12 transition-transform hover:rotate-0 duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80" 
                  alt="Aura Wood Bespoke Slabs" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow-sm">
                  Bespoke Walnut
                </div>
              </div>

            </div>

            {/* subtle floating testimonial card */}
            <div id="hero-floating-card" className="absolute -bottom-8 left-1/4 transform -translate-x-1/2 bg-white border border-brand-border/60 p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[250px] hidden sm:flex">
              <div className="p-2.5 bg-brand-bg text-brand-accent rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-stone-900">Termite Proof Slabs</h4>
                <p className="text-[10px] text-stone-500 font-sans">Naturally treated seasoned hardwood.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
