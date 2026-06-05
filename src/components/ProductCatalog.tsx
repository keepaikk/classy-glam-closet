import React from "react";
import { Product } from "../types";
import { Star, ShoppingBag, Eye, Check, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { formatDualPrice } from "../types";

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

function StarRating({ rating, size = 3 }: { rating: number; size?: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className={`w-${size} h-${size} fill-[#D4A017] text-[#D4A017]`} />
      );
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block">
          <Star className={`w-${size} h-${size} text-gray-300`} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className={`w-${size} h-${size} fill-[#D4A017] text-[#D4A017]`} />
          </span>
        </span>
      );
    } else {
      stars.push(
        <Star key={i} className={`w-${size} h-${size} text-gray-300`} />
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function ProductCatalog({ products, onAddToCart, onOpenProductDetail }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("featured");
  
  // Track adding state per product for friendly visual feedback
  const [addingStates, setAddingStates] = React.useState<{ [key: string]: string | boolean }>({});

  const categories = [
    { id: "all", label: "All Curations" },
    { id: "evening", label: "Elegant Evening" },
    { id: "corporate", label: "Corporate Office" },
    { id: "casual", label: "Smart Casual" }
  ];

  const sizeFilters = [
    { id: "all", label: "All Sizes" },
    { id: "1X (US 14-16)", label: "1X" },
    { id: "2X (US 18-20)", label: "2X" },
    { id: "3X (US 22-24)", label: "3X" },
    { id: "4X (US 26-28)", label: "4X" }
  ];

  // Map filters & Sorts
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Size
    if (selectedSizeFilter !== "all") {
      result = result.filter(p => p.sizes.includes(selectedSizeFilter));
    }

    // Sort order
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } // 'featured' keeps original ranking

    return result;
  }, [products, selectedCategory, selectedSizeFilter, sortBy]);

  const handleQuickAdd = (product: Product) => {
    // Default to the first available size for quick adding
    const defaultSize = product.sizes[0] || "1X (US 14-16)";
    
    // Trigger action
    onAddToCart(product, defaultSize);

    // Friendly feedback
    setAddingStates(prev => ({ ...prev, [product.id]: defaultSize }));
    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section className="bg-white py-16" id="catalog-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header Title with Georgia serif and spacious tagline */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4" id="catalog-header">
          <h2 className="serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black tracking-tight">
            Curated Autumn-Winter <span className="text-brand-pink">&Eacute;legance</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4A017] mx-auto" />
          <p className="text-xs text-neutral-500 font-sans tracking-widest uppercase">
            Designed directly on plus-size fit models to celebrate your beautiful silhouette.
          </p>
        </div>

        {/* Filter Bar with Sophisticated Layout details */}
        <div className="border border-gray-100 bg-neutral-50/50 rounded-none p-5 mb-10 text-left" id="filters-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Category Pills (Sleek sharp corner design) */}
            <div className="flex flex-wrap gap-2" id="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`pill-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-brand-black text-white"
                      : "bg-white text-neutral-600 hover:text-brand-pink border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right: Size Selection & Sorting Selector */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs font-medium" id="filter-sorting-controls">
              
              {/* Size Selector */}
              <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-none px-3.5 py-2 min-w-[160px]">
                <SlidersHorizontal className="w-3 h-3 text-brand-gold shrink-0" />
                <span className="text-neutral-500 uppercase tracking-widest font-semibold text-[9px]">Size:</span>
                <select
                  id="size-filter-select"
                  value={selectedSizeFilter}
                  onChange={(e) => setSelectedSizeFilter(e.target.value)}
                  className="bg-transparent text-brand-black outline-hidden font-bold cursor-pointer w-full text-xs"
                >
                  {sizeFilters.map(sf => (
                    <option key={sf.id} value={sf.id}>{sf.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-none px-3.5 py-2 min-w-[160px]">
                <ArrowUpDown className="w-3 h-3 text-brand-gold shrink-0" />
                <span className="text-neutral-500 uppercase tracking-widest font-semibold text-[9px]">Sort:</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-brand-black outline-hidden font-bold cursor-pointer w-full text-xs"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Customer Rated</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Catalog grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-none bg-neutral-50" id="empty-catalog-state">
            <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="serif text-lg font-bold text-neutral-700">No curations match your criteria</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">Try adjusting your filters or size selection to view other classic fits!</p>
            <button 
              onClick={() => { setSelectedCategory("all"); setSelectedSizeFilter("all"); setSortBy("featured"); }}
              className="mt-4 text-xs font-bold text-brand-pink underline hover:text-brand-gold transition-colors duration-150 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8" id="product-cards-grid">
            {filteredProducts.map((product) => {
              const isAdding = addingStates[product.id];
              return (
                <div 
                  key={product.id} 
                  id={`product-card-${product.id}`}
                  className="group bg-white rounded-none border-t-2 border-brand-gold border-x border-b border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col text-left justify-between"
                >
                  {/* Image wrapper */}
                  <div className="relative overflow-hidden bg-gray-50 aspect-4/5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Collection Tag */}
                    <span className="absolute top-4 left-4 bg-white text-brand-black text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5 rounded-none shadow-xs border border-gray-100">
                      {product.category === 'evening' ? 'Evening Wear' : product.category === 'corporate' ? 'Corporate Chic' : 'Smart Casual'}
                    </span>

                    {/* Action buttons hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        onClick={() => onOpenProductDetail(product)}
                        id={`btn-view-${product.id}`}
                        className="p-3 bg-white text-brand-black hover:text-[#E85AA6] rounded-none shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                        title="View Fit Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Information block */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & count */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1">
                        <StarRating rating={product.rating} size={3} />
                        <span className="font-bold text-brand-black">{product.rating}</span>
                        <span className="text-[10px] text-neutral-400">({product.reviewsCount} reviews)</span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="serif font-bold text-base text-brand-black leading-tight group-hover:text-brand-pink transition-colors duration-250">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-brand-gold font-medium uppercase tracking-wider mt-1">
                        {product.tagline}
                      </p>
                      
                      <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Available Sizes preview */}
                      <div className="flex flex-wrap gap-1 text-[9px] text-neutral-500">
                        {product.sizes.map((s, index) => (
                          <span key={index} className="px-1.5 py-0.5 rounded-none bg-neutral-50 border border-gray-100 font-bold font-sans">
                            {s.split(" ")[0]}
                          </span>
                        ))}
                      </div>

                      {/* Price + Cart action */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-[9px] text-neutral-400 block uppercase tracking-wider">Price</span>
                          <span className="text-base font-bold text-[#E85AA6]">
                            {formatDualPrice(product.price)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleQuickAdd(product)}
                          id={`btn-add-${product.id}`}
                          className={`px-4 py-2 rounded-none text-[10px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            isAdding
                              ? "bg-brand-gold text-white"
                              : "glam-pink text-white hover:bg-neutral-900"
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Quick Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
