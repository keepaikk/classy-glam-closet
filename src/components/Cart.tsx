import React from "react";
import { CartItem } from "../types";
import { Trash2, X, ShoppingBag, ArrowRight, Tag, Percent } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: (discountAmount: number, finalTotal: number, couponCode: string) => void;
}

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const [coupon, setCoupon] = React.useState("");
  const [activeDiscountPercentage, setActiveDiscountPercentage] = React.useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = React.useState("");
  const [couponError, setCouponError] = React.useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = coupon.trim().toUpperCase();

    if (code === "GLAM15") {
      setActiveDiscountPercentage(15);
      setAppliedCouponCode("GLAM15 [-15%]");
      setCoupon("");
    } else if (code === "CURVEELEGANCE") {
      setActiveDiscountPercentage(20);
      setAppliedCouponCode("CURVEELEGANCE [-20%]");
      setCoupon("");
    } else {
      setCouponError("Invalid luxury coupon token. Try 'GLAM15' or 'CURVEELEGANCE'!");
    }
  };

  const discountAmount = Math.round(subtotal * (activeDiscountPercentage / 100));
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-55 overflow-hidden" id="cart-drawer-backdrop">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-350" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between rounded-none border-l border-gray-100" id="cart-drawer-panel">
          
          {/* Top Panel Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-neutral-50 shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h3 className="serif font-bold text-lg text-brand-black">Your Glam Curation</h3>
            </div>
            <button
              onClick={onClose}
              id="close-cart-drawer-btn"
              className="p-1 rounded-none text-neutral-400 hover:text-brand-pink transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Contents list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" id="cart-items-scroller">
            {cartItems.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center justify-center space-y-4" id="empty-cart-view">
                <div className="w-16 h-16 rounded-none bg-neutral-50 border border-neutral-200 flex items-center justify-center text-brand-gold animate-pulse">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="serif text-lg font-bold text-brand-black">Your Closet is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto font-sans leading-relaxed">
                  You haven't added any luxury curations of classic fashion yet. Explore our clothing collections or consult the AI advisor to get recommended fits!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-none bg-[#E85AA6] hover:bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer"
                >
                  Return to Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="cart-items-list">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}`}
                    id={`cart-item-${item.product.id}`}
                    className="flex items-start gap-4 pb-4 border-b border-gray-100 relative"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded-none bg-neutral-50 shrink-0 border border-gray-200"
                    />

                    {/* Metadata */}
                    <div className="flex-1 space-y-1.5 text-left">
                      <h4 className="font-bold text-xs text-brand-black line-clamp-1 leading-tight font-sans uppercase tracking-wider">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-bold text-[#E85AA6] bg-neutral-50 border border-gray-200 px-2 py-0.5 rounded-none font-sans uppercase tracking-wider">
                          Size {item.selectedSize.split(" ")[0]}
                        </span>
                        <span className="text-neutral-500 font-sans">
                          {item.product.colorName.split("&")[0]}
                        </span>
                      </div>

                      {/* Quantity adjusting */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center bg-neutral-50 rounded-none border border-gray-200">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                            className="px-2.5 py-1 text-xs text-neutral-600 hover:text-brand-pink font-extrabold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-800 font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                            className="px-2.5 py-1 text-xs text-neutral-600 hover:text-brand-pink font-extrabold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-bold text-xs text-brand-black font-sans ml-auto">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      id={`btn-remove-${item.product.id}`}
                      className="absolute top-1.5 right-1 text-neutral-300 hover:text-brand-pink transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Calculations Drawer and Actions */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-neutral-50 shrink-0 space-y-4" id="cart-calculations-deck">
              
              {/* Coupon inputs */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2" id="coupon-entry-form">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    id="coupon-input"
                    placeholder="Enter Coupon (e.g. GLAM15)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full text-[10px] border border-gray-250 bg-white rounded-none pl-9 pr-3 py-2.5 outline-hidden focus:border-[#E85AA6] font-bold uppercase tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  id="btn-apply-coupon"
                  className="px-4 py-2.5 bg-neutral-900 text-white text-[10px] font-bold uppercase rounded-none hover:bg-[#E85AA6] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p id="coupon-error-txt" className="text-[10px] font-bold text-brand-pink text-left">{couponError}</p>
              )}

              {appliedCouponCode && (
                <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-3 py-1.5 rounded-none text-[9px] font-bold tracking-widest uppercase">
                  <div className="flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    <span>Luxury Discount Applied</span>
                  </div>
                  <span>{appliedCouponCode}</span>
                </div>
              )}

              {/* Invoicing rows */}
              <div className="space-y-2 text-[11px] uppercase tracking-wider font-bold text-neutral-500 border-t border-gray-200 pt-4 text-left font-sans">
                <div className="flex justify-between">
                  <span>Subtotal value:</span>
                  <span className="font-extrabold text-brand-black">${subtotal}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>In-room Coupon Savings:</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping Standard (Plus size delivery):</span>
                  <span className="text-emerald-600 font-extrabold text-[9px] tracking-widest">Complimentary</span>
                </div>

                <div className="flex justify-between text-xs font-bold text-brand-black border-t border-gray-200 pt-3">
                  <span className="serif uppercase tracking-widest">Your Grand Total:</span>
                  <span className="font-sans text-brand-pink text-base">${finalTotal}</span>
                </div>
              </div>

              {/* Action checkout button */}
              <button
                id="btn-goto-checkout"
                onClick={() => onCheckout(discountAmount, finalTotal, appliedCouponCode ? appliedCouponCode.split(" ")[0] : "")}
                className="w-full py-4 bg-[#E85AA6] hover:bg-neutral-900 text-white rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-200 mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-[9px] text-neutral-400 font-sans tracking-wide uppercase">Secure 256-bit encrypted luxury socket connection.</p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
