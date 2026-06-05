export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: 'evening' | 'corporate' | 'casual';
  image: string;
  description: string;
  details: string[];
  color: string;
  colorName: string;
  sizes: string[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface SizeCalculationResult {
  recommendedSize: string;
  recommendedUsSize: string;
  bustCm: number;
  waistCm: number;
  hipsCm: number;
  bodyShape: 'Hourglass' | 'Pear' | 'Apple' | 'Rectangle';
  styleAdvice: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod-1",
    name: "Aurelia Gold-Draped Midnight Gown",
    tagline: "Dramatic asymmetric lines tailored for statuesque confidence",
    price: 249,
    category: "evening",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    description: "An absolute head-turner. Features fluid asymmetric shoulder draping, a custom gold metallic micro-buckle accent, and premium comfort-stretch jersey designed to sculpt and accentuate your natural waist.",
    details: [
      "Asymmetric shoulder draping with dual luxury gold-finish buckles",
      "Built-in subtle compression waist lining for a polished custom fit",
      "Premium comfort-stretch fabric (92% Poly, 8% Elastane)",
      "Elegant lateral side slit for effortless movement"
    ],
    color: "#111111",
    colorName: "Elegant Midnight Black & Luxury Gold",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)", "4X (US 26-28)"],
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Empress Glam Wrap Dress",
    tagline: "The iconic wrap style, re-imagined in bold Glam Pink",
    price: 189,
    category: "evening",
    image: "https://images.unsplash.com/photo-1539008885759-24f5351de1f6?auto=format&fit=crop&q=80&w=600",
    description: "A breathtaking statement gown designed to celebrate true hourglass definitions. The plunging surplice V-neckline elongates the silhouette, and the broad sash defines your curves elegantly.",
    details: [
      "Broad structured adjustable sash tie",
      "Draped deep V-neckline that sits beautifully",
      "Exquisite satin-back crepe fabric for luxurious drape",
      "Finished with hand-rolled silk hems"
    ],
    color: "#E85AA6",
    colorName: "Primary Glam Pink",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)", "4X (US 26-28)"],
    rating: 4.8,
    reviewsCount: 94,
    featured: true,
    inStock: true
  },
  {
    id: "prod-3",
    name: "Executive Silhouette Blazer & Trouser Set",
    tagline: "Power dressing with precise curved sculpting",
    price: 299,
    category: "corporate",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=600",
    description: "Redefine corporate elegance. This set includes a single-button sculpted-waist blazer with clean peak lapels, paired with high-waist straight-leg trousers crafted to flex comfortably throughout your busy day.",
    details: [
      "Blazer: single gold button closure, engineered back princess seams",
      "Trousers: comfort-stretch high waist with interior smooth-elastic support",
      "Wrinkle-resistant luxury twill",
      "Functional lined deep pockets"
    ],
    color: "#111111",
    colorName: "Executive Black & Gold Button",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)", "4X (US 26-28)"],
    rating: 4.7,
    reviewsCount: 78,
    featured: true,
    inStock: true
  },
  {
    id: "prod-4",
    name: "Soft Blush Cashmere Trench Duster",
    tagline: "Fluid, cascading layers for a soft, premium presentation",
    price: 320,
    category: "corporate",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
    description: "An ultra-premium layering duster tailored in rich soft cash-wool. Designed to float effortlessly over pants or dresses, framing the shoulders with modern confidence and providing a flattering, elongating line.",
    details: [
      "Ultra-soft cloud-cashmere blend",
      "Open-front relaxed cardigan-style lapel",
      "Elegant storm flap detail and gold bar buckle sash tie",
      "Sartorial satin-lined sleeves for easy layering"
    ],
    color: "#F9EEF4",
    colorName: "Soft Blush Pink",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)"],
    rating: 5.0,
    reviewsCount: 36,
    featured: false,
    inStock: true
  },
  {
    id: "prod-5",
    name: "Regal Gold Satin Bodysuit",
    tagline: "Luxury base styling that contours beautifully",
    price: 110,
    category: "casual",
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600",
    description: "Elevate your smart casual wardrobe. Features high-stretch shape retention mapping around the midsection coupled with a gorgeous cowl-neck satin drape top that looks breathtaking under outer blazers or high-waist denim.",
    details: [
      "Lustrous heavy-weight satin cowl front",
      "Secure double-snap gusset closure",
      "Sculpting seamless knit mesh lower lining",
      "Elegant thin adjustable gold chain straps"
    ],
    color: "#D4A017",
    colorName: "Luxury Gold Accent",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)", "4X (US 26-28)"],
    rating: 4.6,
    reviewsCount: 88,
    featured: false,
    inStock: true
  },
  {
    id: "prod-6",
    name: "Versatile Glam Utility Blazer",
    tagline: "Day-to-night versatile styling in signature pink",
    price: 210,
    category: "casual",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    description: "Make weekend wardrobes pop. An unstructured comfort-wear blazer in rich Glam Pink. Slightly relaxed shoulder line paired with structural golden button sleeves, establishing smart femininity.",
    details: [
      "Wrinkle-resistant double knit ponte",
      "Gold double-breasted button highlights",
      "Feminine soft curve back hemline",
      "Deep side slits for comfortable seat and pocket access"
    ],
    color: "#E85AA6",
    colorName: "Primary Glam Pink with Gold Accents",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)"],
    rating: 4.8,
    reviewsCount: 52,
    featured: false,
    inStock: true
  },
  {
    id: "prod-7",
    name: "Classic Curves Sculpting Wrap Jumpsuit",
    tagline: "Sleek monochromatic corporate-to-cocktail look",
    price: 220,
    category: "corporate",
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=600",
    description: "A masterpiece of structure. Wide-leg elegant knit jumpsuit featuring an integrated luxury sash waist cincher. Designed to streamline and support without pinching, bringing corporate flair to new dimensions.",
    details: [
      "Full wide-leg trouser shape with elegant movement",
      "Interiors engineered with soft stretch side support",
      "Zip closure back with keyhole loop",
      "Breathable and dynamic luxury matte jersey"
    ],
    color: "#111111",
    colorName: "Elegant Black Silhouette",
    sizes: ["1X (US 14-16)", "2X (US 18-20)", "3X (US 22-24)", "4X (US 26-28)"],
    rating: 4.9,
    reviewsCount: 119,
    featured: true,
    inStock: true
  }
];
