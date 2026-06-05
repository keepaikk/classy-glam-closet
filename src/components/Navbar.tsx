import React from "react";
import { ShoppingBag, Sparkles, Ruler, Search, Menu, X } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, openCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Collections link to catalog */}
          <div className="hidden md:flex space-x-6 items-center">
            <button
              id="nav-catalog"
              onClick={() => setActiveTab("catalog")}
              className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 relative py-1 cursor-pointer ${
                activeTab === "catalog" 
                  ? "text-brand-pink" 
                  : "text-neutral-500 hover:text-brand-pink"
              }`}
            >
              Collections
              {activeTab === "catalog" && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E85AA6] animate-fade-in" />
              )}
            </button>

            <button
              id="nav-size-guide"
              onClick={() => setActiveTab("size-guide")}
              className={`flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 relative py-1 cursor-pointer ${
                activeTab === "size-guide" 
                  ? "text-brand-pink" 
                  : "text-neutral-500 hover:text-brand-pink"
              }`}
            >
              Fit Calculator
              {activeTab === "size-guide" && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E85AA6]" />
              )}
            </button>
          </div>

          {/* Logo Section Center */}
          <div
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
            className="flex flex-col cursor-pointer select-none py-1 group text-center items-center"
            id="nav-logo-container"
          >
            <img
              src={logoImg}
              alt="Classy Glam Closet"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Section Desktop */}
          <div className="flex items-center space-x-6">
            <button
              id="nav-stylist"
              onClick={() => setActiveTab("stylist")}
              className={`hidden md:flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 border border-gray-200 px-3.5 py-2 cursor-pointer ${
                activeTab === "stylist" 
                  ? "bg-brand-black text-white border-brand-black" 
                  : "text-neutral-700 hover:border-brand-pink hover:text-brand-pink"
              }`}
            >
              <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold/10" />
              AI Stylist
            </button>

            <button 
              id="search-btn-nav"
              className="p-1 px-1.5 text-neutral-500 hover:text-[#E85AA6] transition-colors duration-150 cursor-pointer"
              aria-label="Search items"
            >
              <Search className="w-4 h-4" />
            </button>
            
            <button
              id="open-cart-btn"
              onClick={openCart}
              className="p-1 px-1.5 text-neutral-500 hover:text-[#E85AA6] relative transition-transform active:scale-95 duration-100 cursor-pointer text-[10px] tracking-[0.25em] uppercase font-bold flex items-center gap-1.5"
              aria-label="Open shopping bag"
            >
              <span>Cart</span>
              <span className="text-[10px] text-[#E85AA6]">{cartCount > 0 ? `(${cartCount})` : "(0)"}</span>
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-500 hover:text-brand-pink"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute left-0 right-0 shadow-md px-4 py-4 space-y-2.5 z-40 animate-fade-in" id="mobile-nav-panel">
          <button
            id="mobile-nav-catalog"
            onClick={() => { setActiveTab("catalog"); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-4 text-xs font-bold uppercase tracking-wider ${
              activeTab === "catalog" ? "text-[#E85AA6] bg-neutral-50" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Collections
          </button>
          <button
            id="mobile-nav-size"
            onClick={() => { setActiveTab("size-guide"); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-4 text-xs font-bold uppercase tracking-wider ${
              activeTab === "size-guide" ? "text-[#E85AA6] bg-neutral-50" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Curves Calculator
          </button>
          <button
            id="mobile-nav-stylist"
            onClick={() => { setActiveTab("stylist"); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 px-4 text-xs font-bold uppercase tracking-wider ${
              activeTab === "stylist" ? "text-white bg-brand-black" : "text-[#E85AA6] border border-brand-blush"
            }`}
          >
            Glam AI Stylist
          </button>
        </div>
      )}
    </header>
  );
}
