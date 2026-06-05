import React from "react";
import { Sparkles, ShoppingBag, Ruler, Bot, Heart, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-[#111111] border-t border-neutral-800 text-neutral-400 font-sans" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info (md:col-span-4) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex flex-col select-none py-1 group cursor-pointer" onClick={() => setActiveTab("home")}>
              <h3 className="serif text-xl sm:text-2xl tracking-widest font-bold text-white group-hover:text-brand-pink transition-colors">
                CLASSY GLAM <span className="text-brand-pink transition-colors">CLOSET</span>
              </h3>
              <p className="text-[9px] tracking-[0.25em] font-medium text-brand-gold uppercase -mt-0.5">
                Fashion That Celebrates Every Curve
              </p>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm text-neutral-400 font-normal">
              We design luxury fashion explicitly calibrated for curvy, statuesque, and plus-size women. We believe true confidence stems from designs that respect, honor, and gracefully embellish every unique curve.
            </p>

            <div className="flex space-x-3.5 pt-2">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Join curves dialogue &bull;</span>
              <a href="#" className="text-xs text-brand-pink hover:text-brand-gold uppercase font-bold tracking-wider hover:underline">Instagram</a>
              <a href="#" className="text-xs text-brand-pink hover:text-brand-gold uppercase font-bold tracking-wider hover:underline">Pinterest</a>
            </div>
          </div>

          {/* Column 2: Quick navigation (md:col-span-3) */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">The Collection Deck</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-neutral-400">
              <li>
                <button onClick={() => setActiveTab("catalog")} className="hover:text-brand-pink transition-colors cursor-pointer">
                  Shop Autumn-Winter 2026
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("size-guide")} className="hover:text-brand-pink transition-colors flex items-center gap-1.5 cursor-pointer">
                  Curves Fit Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("stylist")} className="hover:text-brand-pink transition-colors flex items-center gap-1.5 cursor-pointer">
                  Glam AI Stylist Panel
                </button>
              </li>
              <li>
                <span className="text-[9px] tracking-widest uppercase font-bold bg-[#E85AA6]/20 text-[#E85AA6] px-2.5 py-1.5 rounded-none border border-[#E85AA6]/40 inline-block font-sans">New Winter Collection live</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact/Support (md:col-span-4) */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">Fulfillment Concerns</h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-medium font-sans">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>concierge@classyglamcloset.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+1 (800) CURV-CONCIERGE (287-8266)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>84 Luxury Boulevard, Beverly Hills, CA 90210</span>
              </li>
            </ul>
              
            {/* Newsletter input card */}
            <div className="bg-neutral-900 p-4 rounded-none border border-neutral-800 space-y-2 max-w-sm">
              <h5 className="font-bold text-[10px] text-white uppercase tracking-wider">Unlock Curves Newsletter</h5>
              <p className="text-[10px] text-neutral-500">Receive 15% off coupon on your first curated allocation purchase.</p>
              <div className="flex gap-1.5 pt-1">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 text-[10px] px-2.5 py-2 border border-neutral-800 bg-neutral-950 text-white rounded-none focus:border-brand-pink outline-hidden"
                />
                <button className="bg-brand-pink hover:bg-brand-pink/90 text-white text-[10px] uppercase font-bold px-3.5 py-2 rounded-none transition-colors whitespace-nowrap cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright area */}
        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 tracking-widest uppercase" id="footer-copyright-bar">
          <p>&copy; 2026 CLASSY GLAM CLOSET LLC. All Rights Reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-sans">
            Crafted for confident curves with <Heart className="w-3 h-3 text-brand-pink fill-brand-pink" /> by the Glam concierges.
          </p>
        </div>

      </div>
    </footer>
  );
}
