import { products } from '../data/products';
import { Product } from '../types';
import { Tag, Ruler, Sparkles, Send } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProductForQuote: (productName: string) => void;
}

export default function ProductCatalog({ onSelectProductForQuote }: ProductCatalogProps) {
  return (
    <section id="catalog" className="py-20 bg-brand-bg border-b border-brand-border">
      <div id="catalog-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div id="catalog-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-brand-accent uppercase">
            Artisanal Masterpieces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            Our Handcrafted Wood Collection
          </h2>
          <div className="w-16 h-0.5 bg-brand-accent mx-auto mt-4" />
          <p className="text-stone-650 text-sm leading-relaxed font-sans">
            Every creation is bespoke, custom-measured, and hand-carved using finest seasoned timber. Select a model below to request a tailored quote.
          </p>
        </div>

        {/* Product Grid */}
        <div id="catalog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <div 
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-border/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Image Wrapper */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img 
                  id={`product-img-${product.id}`}
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-brand-accent/90 backdrop-blur-md text-stone-50 text-[9px] font-bold tracking-widest uppercase py-1 px-3 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Details Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-1">
                  <h3 id={`product-title-${product.id}`} className="font-serif text-xl font-semibold text-stone-900 group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <span className="text-brand-accent">✦</span>
                    <span>{product.woodType}</span>
                  </div>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Technical Specifications */}
                <div className="bg-brand-bg/60 rounded-2xl p-4 space-y-2 text-[11px] sm:text-xs text-stone-700 font-sans">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-2">
                    <span className="flex items-center gap-1.5 font-medium text-stone-500">
                      <Ruler className="w-3.5 h-3.5 text-brand-accent" /> Dimensions:
                    </span>
                    <span className="font-mono text-stone-850 font-medium">{product.dimensions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium text-stone-500">
                      <Tag className="w-3.5 h-3.5 text-brand-accent" /> Polish & Finish:
                    </span>
                    <span className="text-stone-850 font-medium">{product.finish}</span>
                  </div>
                </div>

                {/* Key Bullet Features */}
                <ul className="space-y-1.5 flex-grow">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <Sparkles className="w-3 h-3 text-brand-accent mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Card CTA Footer */}
                <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-bold tracking-wider text-brand-accent/80">
                    BESPOKE DESIGN
                  </span>
                  <button
                    id={`product-inquire-btn-${product.id}`}
                    onClick={() => onSelectProductForQuote(product.name)}
                    className="flex items-center gap-2 bg-brand-accent hover:opacity-90 text-stone-50 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-amber-300" />
                    <span>Request Quote</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
