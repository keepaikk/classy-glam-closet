import React from "react";
import { CartItem } from "../types";
import { CheckCircle, ArrowLeft, CreditCard, Sparkles, Building, ChevronRight, ClipboardCheck } from "lucide-react";

interface CheckoutProps {
  cartItems: CartItem[];
  discountAmount: number;
  finalTotal: number;
  couponCode: string;
  onBack: () => void;
  onClearCart: () => void;
}

export default function Checkout({ cartItems, discountAmount, finalTotal, couponCode, onBack, onClearCart }: CheckoutProps) {
  // Customer details form state
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expDate, setExpDate] = React.useState("");

  // UI state
  const [isOrdering, setIsOrdering] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const handleAutoPopulate = () => {
    setFirstName("Evelyn");
    setLastName("Glamour");
    setEmail("evelyn.curves@cloglam.com");
    setAddress("84 Luxury Boulevard, Apt Curve-5");
    setCity("Beverly Hills");
    setZip("90210");
    setCardNumber("4111 8888 9999 5555");
    setExpDate("12/28");
    setCvv("777");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !address || !cardNumber) {
      alert("Please complete the essential billing and shipping credentials.");
      return;
    }

    setIsOrdering(true);
    
    // Simulate luxury fulfillment booking
    setTimeout(() => {
      setIsOrdering(false);
      setIsSuccess(true);
      // Generate a luxury booking reference order number
      const code = `CG-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;
      setOrderId(code);
      onClearCart();
    }, 2000);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (isSuccess) {
    return (
      <div className="bg-neutral-50 py-16 text-center min-h-[600px] flex items-center justify-center font-sans px-4" id="order-success-screen">
        <div className="bg-white rounded-none p-10 max-w-xl mx-auto border border-gray-150 shadow-2xl relative overflow-hidden space-y-6 text-center animate-fade-in">
          
          {/* Gold highlight banner background decorative seal */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D4A017]" />
          
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-none flex items-center justify-center mx-auto mb-2 animate-pulse">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-bold text-[#D4A017] uppercase tracking-[0.25em] block">Sartorial Suite Confirmation</span>
            <h2 className="serif text-3xl font-bold text-brand-black">Your Order is Booked!</h2>
            <p className="text-xs text-neutral-500 font-sans">Thank you for letting us dress your beautiful self, {firstName || "curvy icon"}.</p>
          </div>

          {/* Invoice detailing card layout requested */}
          <div className="border border-gray-200 bg-neutral-50 rounded-none p-6 text-left text-xs font-medium space-y-4 font-sans" id="invoice">
            
            {/* Stamp logo header */}
            <div className="flex justify-between items-center border-b border-gray-250 pb-3">
              <div>
                <h4 className="serif font-black text-brand-black uppercase tracking-wider text-sm">CLASSY GLAM CLOSET</h4>
                <p className="text-[9px] text-[#D4A017] tracking-widest uppercase font-bold">Celebrated Order Statement</p>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[8px] tracking-widest uppercase font-bold">Ref ID:</span>
                <span className="font-bold text-brand-black text-xs font-mono">{orderId}</span>
              </div>
            </div>

            {/* Ship to */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-neutral-400 block text-[8px] tracking-widest uppercase font-bold">Billing Consignee</span>
                <span className="font-bold text-brand-black block">{firstName} {lastName}</span>
                <span className="text-neutral-500 text-[10px]">{email}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[8px] tracking-widest uppercase font-bold">Fulfillment Address</span>
                <span className="font-bold text-brand-black block">{address}</span>
                <span className="text-neutral-500 text-[10px]">{city}, {zip}</span>
              </div>
            </div>

            {/* Charges outline */}
            <div className="border-t border-gray-200 pt-3 space-y-1.5">
              <div className="flex justify-between">
                <span>Total value of selections:</span>
                <span className="font-bold text-brand-black">${subtotal || finalTotal + discountAmount}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon {couponCode} Savings:</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-[9px]">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-brand-black border-t border-dashed border-gray-200 pt-2">
                <span className="serif uppercase tracking-widest text-xs">Paid Total:</span>
                <span className="text-[#E85AA6] font-sans text-base">${finalTotal}</span>
              </div>
            </div>

            <div className="bg-[#111111] text-[#D4A017] p-3 text-[10px] rounded-none text-center font-bold uppercase tracking-widest">
              Free tracking matches sent to email shortly
            </div>

          </div>

          <button
            onClick={onBack}
            className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-[#E85AA6] border border-gray-250 hover:bg-neutral-50 rounded-none transition-colors shrink-0 cursor-pointer"
          >
            Continue Exploring Collections
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 md:py-16 text-left" id="checkout-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Back and title */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-brand-pink transition-colors text-[10px] font-bold uppercase tracking-widest cursor-pointer"
            id="back-to-cart-btn"
          >
            <ArrowLeft className="w-4 h-4 text-brand-gold" />
            Back to Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Checkout Credentials Form (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6" id="checkout-form-panel">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 pb-4">
              <div>
                <h2 className="serif text-2xl font-bold text-brand-black">Perfect Dressing Checkout</h2>
                <p className="text-xs text-neutral-500 mt-1">Provide your billing details or use the easy auto-populate helper.</p>
              </div>
              
              {/* Quick auto fill helper requested */}
              <button
                type="button"
                id="btn-auto-populate"
                onClick={handleAutoPopulate}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-none border border-neutral-300 text-brand-black hover:bg-neutral-50 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                Auto-Populate Details
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6" id="checkout-billing-form">
              
              {/* Contact section */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] flex items-center gap-1.5">
                  <Building className="w-4 h-4" /> Ship-to Identity & Communication
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">First Name</label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Last Name</label>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="Elegance"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Email for Tracking Details</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                    placeholder="consignee.curves@cloglam.com"
                  />
                </div>
              </div>

              {/* Shipping address */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017]">Delivery Address</h4>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Street Address</label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                    placeholder="123 Curve Avenue, Suite Luxury"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">City</label>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">ZIP/Postal Code</label>
                    <input
                      required
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment details */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> Secure Payment Card
                </h4>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Credit Card Number</label>
                  <input
                    required
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                    placeholder="4111 2222 3333 4444"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Expiration Date (MM/YY)</label>
                    <input
                      required
                      type="text"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="12/28"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">CVV Code</label>
                    <input
                      required
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-none px-3.5 py-3 outline-hidden focus:border-[#E85AA6] bg-neutral-50/50 font-sans"
                      placeholder="345"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="btn-place-order"
                disabled={isOrdering}
                className="w-full py-4 text-white hover:bg-neutral-900 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 duration-200 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: "#E85AA6" }}
              >
                {isOrdering ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-none animate-spin" />
                    Completing Luxury Allocation...
                  </>
                ) : (
                  <>
                    Submit Booking &bull; ${finalTotal}
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Right Side: Selections Summary (lg:col-span-5) */}
          <div className="lg:col-span-5 border border-gray-150 bg-neutral-50 rounded-none p-6 space-y-6" id="checkout-summary-panel">
            <h3 className="serif text-lg font-bold text-brand-black border-b border-gray-200 pb-3 uppercase tracking-wider">Garment Summary</h3>
            
            <div className="space-y-4 max-h-[280px] overflow-y-auto" id="checkout-items-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-4 border-b border-gray-250">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-16 object-cover rounded-none bg-neutral-150 shrink-0 border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left flex-1 space-y-1">
                    <h5 className="font-bold text-xs text-brand-black leading-snug font-sans uppercase tracking-wider">{item.product.name}</h5>
                    <div className="text-[10px] text-neutral-500 font-medium font-sans uppercase tracking-wider">
                      <span>Size: {item.selectedSize.split(" ")[0]}</span> &bull; <span>Qty: {item.quantity}</span>
                    </div>
                    <p className="font-bold text-xs text-brand-black font-sans">${item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations recap */}
            <div className="space-y-3 text-[11px] uppercase tracking-wider text-neutral-500 pt-2 text-left font-sans font-bold">
              <div className="flex justify-between">
                <span>Total values selected:</span>
                <span className="font-extrabold text-brand-black">${subtotal}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-extrabold text-[10px]">
                  <span>Applied Saving ({couponCode}):</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span className="text-emerald-600 font-extrabold text-[10px]">Complementary Premium</span>
              </div>

              <div className="flex justify-between text-xs font-bold text-brand-black border-t border-gray-200 pt-4">
                <span className="serif uppercase tracking-widest">Your Grand Final Due:</span>
                <span className="text-[#E85AA6] font-sans text-lg">${finalTotal}</span>
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-200 rounded-none space-y-1.5 text-[10px] text-neutral-400 font-medium leading-relaxed border-l-4 border-brand-gold">
              <p className="font-bold text-brand-black uppercase tracking-widest flex items-center gap-1 leading-none text-[11px] mb-1">
                <Sparkles className="w-3 h-3 text-[#D4A017]" /> Flexible Fits Promised
              </p>
              <p className="font-sans leading-relaxed">If any garment doesn't sit exactly how you dreamed, we offer complimentary plus size returns & exchange within 30 days of luxury receipt.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
