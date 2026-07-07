import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'dining-sheesham',
    name: 'Royal Sheesham 8-Seater Dining Set',
    category: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1000',
    description: 'Bespoke hand-polished dining table crafted from high-density seasoned Sheesham wood. Built with traditional mortise-and-tenon joints, accompanied by eight ergonomically contoured wooden chairs with premium linen cushions.',
    woodType: 'Seasoned Sheesham (Indian Rosewood)',
    dimensions: '96" L x 42" W x 30" H',
    finish: 'Natural Honey Lacquer / Silk Matte finish',
    priceEstimate: 'Custom Pricing on Inquiry',
    features: [
      '100% solid wood construction (no MDF or veneer)',
      'Rich natural grain pattern highlighting deep wood tones',
      'Heat-resistant and water-resistant protective sealant'
    ]
  },
  {
    id: 'wardrobe-teak',
    name: 'Bespoke Royal Teakwood Wardrobe',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
    description: 'An elegant 3-door solid teakwood closet featuring traditional brass fittings, soft-closing hand-carved drawer runners, and dedicated internal organizational chambers.',
    woodType: 'Premium Burma Teak',
    dimensions: '72" W x 24" D x 84" H',
    finish: 'Warm Walnut Polished Stain',
    priceEstimate: 'Bespoke Order',
    features: [
      'Naturally termite-proof and moisture-resistant teak wood',
      'Handmade brass handles with antique finish',
      'Integrated hidden jewelry locker and modular shelving'
    ]
  },
  {
    id: 'bed-imperial',
    name: 'Imperial Rosewood King Size Bed',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000',
    description: 'A masterpiece bed characterized by a solid, thick-plank hand-carved headboard showing seamless grain matching. Built for lifetime durability with a heavy-duty frame structure and hidden hydraulic storage.',
    woodType: 'Solid North Indian Rosewood',
    dimensions: '82" W x 86" L x 54" Headboard H',
    finish: 'Rich Espresso Matte Shellac',
    priceEstimate: 'Custom Sizing Available',
    features: [
      'Zero-creak architectural joint interlocking',
      'Reinforced solid hardwood platform mattress support',
      'Spacious under-bed storage accessible via German gas springs'
    ]
  },
  {
    id: 'table-liveedge',
    name: 'Artisanal Live-Edge Walnut Coffee Table',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000',
    description: 'Each piece is entirely unique, made from a single thick slab of kiln-dried wild walnut with its natural live edge kept intact. Suspended on structural powder-coated raw steel trapezoid legs.',
    woodType: 'Kiln-Dried European Walnut',
    dimensions: '48" L x 28-32" W (Variable) x 18" H',
    finish: 'Odum German Natural Oil finish',
    priceEstimate: 'Unique Slab Pricing',
    features: [
      'Completely unique natural edge contours and grain details',
      'Stabilized with structural butterfly joints for character and strength',
      'Ultra-durable, food-safe, non-toxic matte protective oils'
    ]
  },
  {
    id: 'sofa-chesterfield',
    name: 'Mahogany Chesterfield Leather Sofa Set',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
    description: 'A classic 3-seater tufted sofa featuring a sturdy internal frame of hand-hewn mahogany wood. Accented with custom hand-carved mahogany scrollwork feet and detailed vintage brass studding.',
    woodType: 'Bespoke Solid Mahogany',
    dimensions: '88" W x 36" D x 31" H',
    finish: 'Vintage Antique Mahogany Gloss',
    priceEstimate: 'Made to Order',
    features: [
      'Structural frame made from seasoned high-strength mahogany',
      'Plush top-grain buffalo leather upholstery with deep hand-tufting',
      'Reinforced high-density luxury foam seating cores'
    ]
  },
  {
    id: 'credenza-classic',
    name: 'Classic Handcrafted Oak Credenza',
    category: 'Living Room / Dining',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1000',
    description: 'A versatile mid-century inspired sideboard dresser constructed entirely of solid white oak. Includes 4 smooth-sliding hand-fit drawers and double-door storage cabinets with modern integrated groove-pulls.',
    woodType: 'Seasoned White Oak',
    dimensions: '68" W x 18" D x 32" H',
    finish: 'Smoked Oak / Clear Polyurethane coat',
    priceEstimate: 'Available in Custom Woods',
    features: [
      'English dovetail jointed solid oak drawer construction',
      'Fully concealed soft-close adjustable drawer slides',
      'Generous storage capacity with height-adjustable shelving'
    ]
  }
];
