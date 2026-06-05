import React from "react";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import heroImage from "../assets/images/logo-banner.jpg";

interface HeroProps {
  onExplore: () => void;
  onConsult: () => void;
  onSizeCalculator: () => void;
}

export default function Hero({ onExplore, onConsult, onSizeCalculator }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100" id="hero-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text content - left aligned */}
          <div className="lg:col-span-7 z-10 space-y-6 text-left order-2 lg:order-1 animate-fade-in" id="hero-text-content">
            
            {/* Tagline / Badge */}
            <div className="inline-block" id="hero-badge">
              <span className="bg-[#D4A017] text-white px-3.5 py-1 text-[10px] tracking-[0.25em] uppercase font-bold inline-block">
                New Winter Lookbook
              </span>
            </div>

            {/* Title / Headline */}
            <div className="space-y-4">
              <h1 className="serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.1] font-bold">
                Empowering Style <br />For Every Curve
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl font-normal leading-relaxed font-sans">
                Experience the intersection of luxury and inclusivity. Our curated evening, corporate office, and smart casual collections are custom designed to celebrate and honor your beautiful silhouette.
              </p>
            </div>

            {/* Hero Buttons (Sharp-cornered sleek luxury design) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-cta-explore"
                onClick={onExplore}
                className="glam-pink hover:bg-neutral-900 text-white px-8 py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg relative"
              >
                Shop The Collection
              </button>

              <button
                id="hero-cta-stylist"
                onClick={onConsult}
                className="border-2 gold-border hover:bg-[#D4A017]/10 text-[#D4A017] px-8 py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
              >
                Consult Personal Stylist
              </button>
            </div>

            {/* Inclusivity Pillars (re-styled with Sleek theme) */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6" id="hero-pillars">
              <div>
                <h4 className="text-[10px] font-bold text-brand-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E85AA6]"></span> Unapologetic Confidence
                </h4>
                <p className="text-xs text-neutral-500 font-sans mt-1">Engineered shape-definition tailoring</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-brand-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#D4A017]"></span> Flawless Elegance
                </h4>
                <p className="text-xs text-neutral-500 font-sans mt-1">Premium fabrics sourced for fluid motion</p>
              </div>
            </div>

          </div>

          {/* Luxury Banner Image Showcase - Right Side */}
          <div className="lg:col-span-5 order-1 lg:order-2" id="hero-graphic-showcase">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Sleek Underlay with gold outline */}
              <div className="absolute -inset-1.5 border border-[#D4A017]/50 translate-x-1.5 translate-y-1.5 -z-10" />

              {/* Real Full-Width Luxury Image */}
              <div className="relative bg-white border border-gray-100 shadow-lg overflow-hidden group">
                
                <img
                  src={heroImage}
                  alt="Classy Glam Costume High-End campaign, plus size curvy beauty & confidence"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800";
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-brand-blush/10 pointer-events-none" />

                {/* Decorative bottom title cards with sharp corners */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 border border-gray-100 flex items-center justify-between">
                  <div className="text-left">
                    <h5 className="text-[10px] font-bold text-brand-black tracking-widest uppercase">Classy Glam Closet</h5>
                    <p className="text-[9px] text-[#D4A017] tracking-wider uppercase">Confident & Bold silhouette</p>
                  </div>
                  <button 
                    onClick={onSizeCalculator}
                    className="text-[10px] font-bold text-brand-pink hover:text-brand-gold transition-colors duration-150 uppercase tracking-widest cursor-pointer"
                  >
                    Size Info &rarr;
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Sleek gold-accent ribbon line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#E85AA6] via-[#D4A017] to-[#E85AA6]" />
    </section>
  );
}
