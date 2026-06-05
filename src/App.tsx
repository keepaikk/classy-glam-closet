import React from "react";
import { PRODUCTS_DATA, Product, CartItem } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalog from "./components/ProductCatalog";
import SizeCalculator from "./components/SizeCalculator";
import AIStylist from "./components/AIStylist";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import { ShoppingBag, Star, Ruler, Sparkles, X, ChevronRight, Check } from "lucide-react";
import { formatDualPrice } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>("home");
  const [cartCount, setCartCount] = React.useState(0);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  
  // High confidence calculated parameters
  const [userProfileSize, setUserProfileSize] = React.useState<string>("");

  // Product detail modal state
  const [detailedProduct, setDetailedProduct] = React.useState<Product | null>(null);
  const [selectedDetailSize, setSelectedDetailSize] = React.useState<string>("");

  // Checkout meta values
  const [checkoutDiscount, setCheckoutDiscount] = React.useState(0);
  const [checkoutTotal, setCheckoutTotal] = React.useState(0);
  const [checkoutCoupon, setCheckoutCoupon] = React.useState("");

  // Refresh cartCount when items updates
  React.useEffect(() => {
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, [cartItems]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { product, selectedSize: size, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.product.id === productId && item.selectedSize === size);
      if (idx > -1) {
        const copy = [...prev];
        const newQty = copy[idx].quantity + delta;
        if (newQty <= 0) {
          copy.splice(idx, 1);
        } else {
          copy[idx].quantity = newQty;
        }
        return copy;
      }
      return prev;
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const handleLaunchCheckout = (discount: number, finalTotal: number, couponCode: string) => {
    setCheckoutDiscount(discount);
    setCheckoutTotal(finalTotal);
    setCheckoutCoupon(couponCode);
    setCartOpen(false);
    setActiveTab("checkout");
  };

  const handleApplyCalculatedSize = (size: string) => {
    setUserProfileSize(size);
    // Auto populate modal sizing selection is sweet detail
    setSelectedDetailSize(size);
  };

  const openProductDetailModal = (product: Product) => {
    setDetailedProduct(product);
    // Default detail size select is profile size if it fits, else first size
    const profileMatch = product.sizes.find(s => s === userProfileSize);
    setSelectedDetailSize(profileMatch || product.sizes[0] || "1X (US 14-16)");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-brand-black" id="app-root">
      
      {/* 1. Global Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
        openCart={() => setCartOpen(true)} 
      />

      {/* 2. Main content switch */}
      <main className="flex-1">
        {activeTab === "home" && (
          <div className="animate-fade-in" id="home-screen-view">
            {/* Hero Banner Component */}
            <Hero 
              onExplore={() => setActiveTab("catalog")}
              onConsult={() => setActiveTab("stylist")}
              onSizeCalculator={() => setActiveTab("size-guide")}
            />

            {/* Inclusivity banner / Curated Highlights */}
            <section className="py-16 bg-brand-blush/25 border-y border-brand-blush" id="featured-editorial-banner">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                
                <div className="max-w-3xl mx-auto text-center space-y-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4A017] uppercase block">High-Fashion Inclusivity</span>
                  <h3 className="heading-serif text-2xl sm:text-3xl font-extrabold text-brand-black">Featured Autumn-Winter Masterpieces</h3>
                  <p className="text-neutral-500 font-sans text-xs sm:text-sm max-w-lg mx-auto">Selected by lead creative stylists to stand as flawless anchors in your curves wardrobe.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4" id="curated-highlight-cards">
                  {PRODUCTS_DATA.filter(p => p.featured).slice(0, 3).map((prod) => (
                    <div 
                      key={prod.id} 
                      onClick={() => openProductDetailModal(prod)}
                      className="cursor-pointer bg-white border border-brand-blush rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-brand-pink/30 group transition-all duration-300 flex flex-col text-left"
                    >
                      <div className="relative aspect-4/5 overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                        <span className="absolute bottom-4 left-4 text-white text-xs font-bold bg-[#111111]/80 px-2.5 py-1 rounded-sm uppercase tracking-wider font-sans">
                          {formatDualPrice(prod.price)}
                        </span>
                      </div>
                      <div className="p-4.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="heading-serif font-bold text-sm text-brand-black group-hover:text-brand-pink transition-colors leading-snug">{prod.name}</h4>
                          <p className="text-[10px] text-brand-gold font-medium uppercase tracking-wider">{prod.tagline}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] pt-1.5 text-neutral-400">
                          <span className="text-brand-pink hover:underline uppercase font-bold tracking-widest text-[9px]">Examine Fit details &rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promotional banner */}
                <div className="mt-12 bg-white border border-brand-blush p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left" id="promotional-coupon-banner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full pointer-events-none blur-xl" />
                  <div className="space-y-1.5 z-10 max-w-lg">
                    <span className="text-[9px] font-black tracking-widest uppercase text-brand-pink bg-brand-blush px-2 py-0.5 rounded-sm">CURVES EXCLUSIVE TOKEN</span>
                    <h4 className="heading-serif font-bold text-lg text-brand-black">Unlock 20% Off Your Glam Wardrobe</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans">Apply coupon code <strong className="text-brand-pink font-semibold">CURVEELEGANCE</strong> in your shopping bag to release standard premium order reductions directly.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("catalog")}
                    className="px-6 py-3 bg-[#111111] hover:bg-neutral-800 text-white rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap active:scale-95 duration-100 shrink-0"
                  >
                    Redeem Code Inside
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === "catalog" && (
          <ProductCatalog 
            products={PRODUCTS_DATA} 
            onAddToCart={handleAddToCart}
            onOpenProductDetail={openProductDetailModal}
          />
        )}

        {activeTab === "size-guide" && (
          <SizeCalculator 
            onApplySize={handleApplyCalculatedSize}
            onExploreMatching={(cat) => {
              // Direct navigation to matching category helper
              setActiveTab("catalog");
            }}
          />
        )}

        {activeTab === "stylist" && (
          <AIStylist userSizePreference={userProfileSize} />
        )}

        {activeTab === "checkout" && (
          <Checkout 
            cartItems={cartItems}
            discountAmount={checkoutDiscount}
            finalTotal={checkoutTotal}
            couponCode={checkoutCoupon}
            onBack={() => setActiveTab("catalog")}
            onClearCart={() => setCartItems([])}
          />
        )}
      </main>

      {/* 3. Global Shopping Cart Side-drawer panel */}
      <Cart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleLaunchCheckout}
      />

      {/* 4. Luxury Product Detail Modal Screen */}
      {detailedProduct && (
        <div className="fixed inset-0 z-55 overflow-y-auto flex items-center justify-center p-4" id="detail-modal-backdrop">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setDetailedProduct(null)} />
          
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden border border-brand-blush shadow-2xl relative z-10 animate-fade-in" id="detail-modal-block">
            {/* Close button line */}
            <button 
              onClick={() => setDetailedProduct(null)}
              id="close-product-modal-btn"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-xs text-brand-black hover:text-brand-pink transition-colors cursor-pointer z-10"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image representation */}
              <div className="relative bg-brand-blush/25 min-h-[300px] md:h-full">
                <img 
                  src={detailedProduct.image} 
                  alt={detailedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Right Column: Information content and action */}
              <div className="p-8 space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-brand-pink uppercase tracking-widest bg-brand-blush px-2.5 py-1 rounded-sm">
                    {detailedProduct.category === 'evening' ? "Elegant Evening" : detailedProduct.category === 'corporate' ? "Corporate Office Elegance" : "Casual Luxe"}
                  </span>
                  
                  <h3 className="heading-serif text-2xl font-bold text-brand-black leading-tight pt-1">
                    {detailedProduct.name}
                  </h3>
                  
                  <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider">
                    {detailedProduct.tagline}
                  </p>
                </div>

                <div className="heading-serif text-3xl font-extrabold text-brand-black">
                  {formatDualPrice(detailedProduct.price)}
                </div>

                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  {detailedProduct.description}
                </p>

                {/* Tailoring details list */}
                <div className="space-y-2 border-t border-brand-blush/40 pt-4">
                  <h5 className="font-bold text-[10px] text-brand-black uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold/15" /> Curvy Tailoring Architecture:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-neutral-500 font-sans">
                    {detailedProduct.details.map((det, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-brand-pink font-bold mt-0.5 shrink-0">&bull;</span>
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size selections */}
                <div className="space-y-3.5 border-t border-brand-blush/40 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-brand-black uppercase tracking-widest">Select Fit Size:</span>
                    <button 
                      onClick={() => { setDetailedProduct(null); setActiveTab("size-guide"); }}
                      className="text-[10px] font-semibold text-brand-pink hover:text-brand-gold tracking-wide uppercase hover:underline"
                    >
                      Curves Guide Calculator &rarr;
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2" id="detail-modal-size-grid">
                    {detailedProduct.sizes.map((sz, idx) => {
                      const isSelected = selectedDetailSize === sz;
                      return (
                        <button
                          key={idx}
                          id={`modal-size-${sz.split(" ")[0]}`}
                          onClick={() => setSelectedDetailSize(sz)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            isSelected
                              ? "bg-brand-pink text-white border border-brand-pink shadow-xs"
                              : "bg-white text-neutral-600 border border-neutral-200 hover:border-brand-pink/30 hover:text-brand-pink"
                          }`}
                        >
                          {sz.split(" ")[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Launch button */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleAddToCart(detailedProduct, selectedDetailSize);
                      setDetailedProduct(null);
                      setCartOpen(true);
                    }}
                    id="modal-add-to-cart-btn"
                    className="flex-1 py-4 bg-brand-pink hover:bg-brand-pink/95 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 duration-100 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Secure Booking For Size {selectedDetailSize.split(" ")[0]}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Custom footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating WhatsApp Support Button */}
      <a
        href="https://wa.me/message/RJWNMTN3VDGMG1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-3 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
        id="whatsapp-fab"
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest">Support</span>
      </a>

    </div>
  );
}
