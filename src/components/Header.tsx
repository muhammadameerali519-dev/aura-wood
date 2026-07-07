import { Phone } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export default function Header({ onScrollToSection, onOpenAdmin, isAdminOpen }: HeaderProps) {
  return (
    <header 
      id="main-app-header" 
      className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-brand-border/60 transition-all duration-300"
    >
      <div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          id="header-brand-logo" 
          onClick={() => {
            onScrollToSection('hero-section');
            if (isAdminOpen) onOpenAdmin(); // Close admin panel if returning to homepage
          }}
          className="flex items-center cursor-pointer group"
        >
          <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white font-serif text-xl mr-3 font-semibold shadow-sm transition-transform group-hover:scale-105">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-brand-accent transition-colors">
              AURA WOOD
            </span>
            <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-brand-accent/80 uppercase -mt-1">
              Furniture Artistry
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav id="header-nav-menu" className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-stone-600">
          <button 
            id="nav-home-btn"
            onClick={() => {
              onScrollToSection('hero-section');
              if (isAdminOpen) onOpenAdmin();
            }}
            className="hover:text-brand-accent transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            id="nav-catalog-btn"
            onClick={() => {
              onScrollToSection('catalog');
              if (isAdminOpen) onOpenAdmin();
            }}
            className="hover:text-brand-accent transition-colors cursor-pointer"
          >
            Collection
          </button>
          <button 
            id="nav-quote-btn"
            onClick={() => {
              onScrollToSection('quote-form');
              if (isAdminOpen) onOpenAdmin();
            }}
            className="hover:text-brand-accent transition-colors cursor-pointer"
          >
            Request Quote
          </button>
          <button 
            id="nav-admin-btn"
            onClick={onOpenAdmin}
            className={`font-bold transition-colors cursor-pointer ${
              isAdminOpen ? 'text-brand-accent underline underline-offset-4' : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            Inquiry Log
          </button>
        </nav>

        {/* Action Button: Call Now */}
        <div id="header-actions" className="flex items-center gap-3">
          {/* Admin toggle for mobile */}
          <button 
            id="nav-admin-mobile"
            onClick={onOpenAdmin}
            className={`md:hidden text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded transition-all ${
              isAdminOpen ? 'bg-amber-100 text-amber-900' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {isAdminOpen ? 'Storefront' : 'Logs'}
          </button>

          <a
            id="header-call-btn"
            href="tel:+923234208816"
            className="flex items-center gap-2 bg-brand-accent hover:opacity-95 text-stone-50 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow transition-all duration-300 cursor-pointer active:scale-95"
          >
            <Phone id="header-phone-icon" className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline font-mono">Call: +92 323 4208816</span>
            <span className="sm:hidden font-sans">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
