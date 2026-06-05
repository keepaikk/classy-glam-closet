import React from "react";
import { Ruler, Sparkles, AlertCircle, ShoppingBag, Landmark } from "lucide-react";
import { SizeCalculationResult } from "../types";

interface SizeCalculatorProps {
  onApplySize: (size: string) => void;
  onExploreMatching: (category: string) => void;
}

export default function SizeCalculator({ onApplySize, onExploreMatching }: SizeCalculatorProps) {
  const [unit, setUnit] = React.useState<"inches" | "cm">("inches");
  const [bust, setBust] = React.useState<number>(44);
  const [waist, setWaist] = React.useState<number>(38);
  const [hips, setHips] = React.useState<number>(48);
  const [result, setResult] = React.useState<SizeCalculationResult | null>(null);

  // Synchronous calculation of beautiful curvy sizes
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert values to inches for evaluation model if input is cm
    const bIn = unit === "cm" ? bust / 2.54 : bust;
    const wIn = unit === "cm" ? waist / 2.54 : waist;
    const hIn = unit === "cm" ? hips / 2.54 : hips;

    // Proportional curve shape evaluation formula
    let shape: 'Hourglass' | 'Pear' | 'Apple' | 'Rectangle' = 'Hourglass';
    const bustHipDiff = Math.abs(bIn - hIn);
    const waistBustDiff = bIn - wIn;
    const waistHipDiff = hIn - wIn;

    if (waistBustDiff >= 7 && waistHipDiff >= 8 && bustHipDiff <= 3) {
      shape = 'Hourglass';
    } else if (hIn - bIn >= 3.5 && waistHipDiff >= 6) {
      shape = 'Pear';
    } else if (wIn - bIn >= -1 || wIn - hIn >= -1) {
      shape = 'Apple';
    } else {
      shape = 'Rectangle';
    }

    // Classy Glam custom Size charting mapped safely
    let recommendedSize = "1X (US 14-16)";
    let recommendedUsSize = "14/16";

    // Use largest dimension of Bust, Waist, or Hips to guarantee fluid, comfortable fit without tight pulling
    const maxValIdx = Math.max(
      bIn >= 52 ? 4 : bIn >= 48 ? 3 : bIn >= 44 ? 2 : 1,
      wIn >= 47 ? 4 : wIn >= 43 ? 3 : wIn >= 39 ? 2 : 1,
      hIn >= 56 ? 4 : hIn >= 52 ? 3 : hIn >= 48 ? 2 : 1
    );

    if (maxValIdx === 4) {
      recommendedSize = "4X (US 26-28)";
      recommendedUsSize = "26/28";
    } else if (maxValIdx === 3) {
      recommendedSize = "3X (US 22-24)";
      recommendedUsSize = "22/24";
    } else if (maxValIdx === 2) {
      recommendedSize = "2X (US 18-20)";
      recommendedUsSize = "18/20";
    } else {
      recommendedSize = "1X (US 14-16)";
      recommendedUsSize = "14/16";
    }

    // Dynamic elegant Style advice based on proportion shape matching requested theme colors
    let advice = "";
    if (shape === 'Hourglass') {
      advice = "Highlight your gorgeous symmetry! Broad waistbelts on our Empress Wrap Dress draw focus to your narrowest point, while form-skimming black knits with metallic details sculpt beautifully.";
    } else if (shape === 'Pear') {
      advice = "Emphasize your elegant shoulders! Our Aurelia Gown with asymmetric neck drapes creates magnificent vertical lines. Balance your frame beautifully with structured outerwear like our Cashmere Trench.";
    } else if (shape === 'Apple') {
      advice = "Draw attention to your spectacular neckline and columns! Select open fronts like our Blush Trench Duster over Regal Gold Satin Bodysuits to create flattering structural layers with absolute effortless confidence.";
    } else {
      advice = "Drape layers with dramatic structures! Lean into statement outerwear, double-breasted blazers, or high-waist straight trouser pairings to construct premium vertical architectural lines.";
    }

    setResult({
      recommendedSize,
      recommendedUsSize,
      bustCm: Math.round(unit === "inches" ? bust * 2.54 : bust),
      waistCm: Math.round(unit === "inches" ? waist * 2.54 : waist),
      hipsCm: Math.round(unit === "inches" ? hips * 2.54 : hips),
      bodyShape: shape,
      styleAdvice: advice
    });
  };

  // Preset measurements for curve icons to play with calculator
  const applyPreset = (b: number, w: number, h: number) => {
    setUnit("inches");
    setBust(b);
    setWaist(w);
    setHips(h);
    setResult(null);
  };

  return (
    <div className="bg-white py-12 md:py-16" id="curves-calculator-section">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header Block Section */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="w-12 h-12 bg-[#F9EEF4] text-[#E85AA6] flex items-center justify-center mx-auto mb-2">
            <Ruler className="w-6 h-6" />
          </div>
          <h2 className="serif text-3xl font-bold text-brand-black">
            The Curves Matcher
          </h2>
          <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold font-sans">
            Premium Custom Measurement Formulator
          </p>
          <div className="w-16 h-[1.5px] bg-[#D4A017] mx-auto mt-2" />
          <p className="text-sm text-neutral-600 font-sans mt-3">
            At Classy Glam Closet, we design for curves first. Enter your measurements below, and our algorithm will identify your matching size based on comfortable, flowing silhouette boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-neutral-50 border border-gray-100 rounded-none p-6 text-left space-y-6" id="calc-input-panel">
            
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-xs font-bold text-brand-black uppercase tracking-wider">Select Unit System:</span>
              <div className="inline-flex rounded-none bg-white p-0.5 border border-gray-250">
                <button
                  type="button"
                  id="btn-unit-inches"
                  onClick={() => { setUnit("inches"); setBust(44); setWaist(38); setHips(48); setResult(null); }}
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                    unit === "inches" ? "bg-brand-black text-white" : "text-neutral-500 hover:text-[#E85AA6]"
                  }`}
                >
                  Inches
                </button>
                <button
                  type="button"
                  id="btn-unit-cm"
                  onClick={() => { setUnit("cm"); setBust(112); setWaist(96); setHips(122); setResult(null); }}
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                    unit === "cm" ? "bg-brand-black text-white" : "text-neutral-500 hover:text-[#E85AA6]"
                  }`}
                >
                  CM
                </button>
              </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-5" id="size-matcher-form">
              
              {/* Slider 1: Bust */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-[10px] text-brand-black uppercase tracking-widest">
                  <span>Bust Line</span>
                  <span className="text-brand-pink">{bust} {unit === "inches" ? "in" : "cm"}</span>
                </div>
                <input
                  type="range"
                  min={unit === "inches" ? 36 : 90}
                  max={unit === "inches" ? 64 : 160}
                  step={1}
                  value={bust}
                  onChange={(e) => { setBust(Number(e.target.value)); setResult(null); }}
                  className="w-full accent-[#E85AA6] cursor-pointer"
                  id="slider-bust"
                />
                <p className="text-[10px] text-neutral-400 font-sans">Measure over the fullest part of your chest with a comfortable bra on.</p>
              </div>

              {/* Slider 2: Waist */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-[10px] text-brand-black uppercase tracking-widest">
                  <span>Natural Waist</span>
                  <span className="text-brand-pink">{waist} {unit === "inches" ? "in" : "cm"}</span>
                </div>
                <input
                  type="range"
                  min={unit === "inches" ? 30 : 75}
                  max={unit === "inches" ? 58 : 150}
                  step={1}
                  value={waist}
                  onChange={(e) => { setWaist(Number(e.target.value)); setResult(null); }}
                  className="w-full accent-[#E85AA6] cursor-pointer"
                  id="slider-waist"
                />
                <p className="text-[10px] text-neutral-400 font-sans">Measure at the narrowest circumference of your torso, typically above your navel.</p>
              </div>

              {/* Slider 3: Hips */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-[10px] text-brand-black uppercase tracking-widest">
                  <span>Circumference of Hips</span>
                  <span className="text-brand-pink">{hips} {unit === "inches" ? "in" : "cm"}</span>
                </div>
                <input
                  type="range"
                  min={unit === "inches" ? 40 : 100}
                  max={unit === "inches" ? 68 : 175}
                  step={1}
                  value={hips}
                  onChange={(e) => { setHips(Number(e.target.value)); setResult(null); }}
                  className="w-full accent-[#E85AA6] cursor-pointer"
                  id="slider-hips"
                />
                <p className="text-[10px] text-neutral-400 font-sans">Measure around the fullest part of your seat with feet standing together.</p>
              </div>

              {/* Action trigger */}
              <button
                type="submit"
                id="btn-trigger-calculator"
                className="w-full py-4 bg-[#E85AA6] hover:bg-neutral-900 text-white font-bold uppercase text-[10px] tracking-widest transition-all duration-200 mt-2 cursor-pointer rounded-none"
              >
                Determine Glam Size Recommendation
              </button>

            </form>

            {/* Quick Presets section */}
            <div className="pt-2 border-t border-gray-200">
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 font-sans">Try standard curvy landmarks:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset(42, 36, 45)}
                  className="px-2.5 py-1.5 rounded-none bg-white border border-gray-250 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-brand-pink hover:border-[#E85AA6] cursor-pointer"
                >
                  Statuesque 1X
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(46, 40, 50)}
                  className="px-2.5 py-1.5 rounded-none bg-white border border-gray-250 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-brand-pink hover:border-[#E85AA6] cursor-pointer"
                >
                  Curvaceous 2X
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(50, 44, 54)}
                  className="px-2.5 py-1.5 rounded-none bg-white border border-gray-250 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:text-brand-pink hover:border-[#E85AA6] cursor-pointer"
                >
                  Elegance 3X
                </button>
              </div>
            </div>

          </div>

          {/* Right: Output Result Cards (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center min-h-[350px] text-left" id="calc-result-panel">
            {!result ? (
              <div className="border border-gray-100 bg-neutral-50/50 rounded-none p-8 text-center flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 border border-[#E85AA6]/30 bg-[#F9EEF4] flex items-center justify-center text-brand-pink mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-brand-black uppercase tracking-widest text-xs">Awaiting Your Proportions</h4>
                <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto font-sans leading-relaxed">Fill in your bust, natural waist, and hips on the left to calculate custom garment suggestions designed with precision for your curves.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in" id="calc-success-card">
                
                {/* Primary Card */}
                <div className="bg-[#111111] text-white rounded-none p-6 relative overflow-hidden border-t-2 border-brand-gold">
                  {/* Decorative gold vector line */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A017]/10 rounded-full blur-xl pointer-events-none" />

                  <span className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest block mb-1">Recommended Curated Size</span>
                  <h3 className="serif text-3xl font-extrabold text-white tracking-tight">
                    {result.recommendedSize}
                  </h3>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-4 text-[11px] font-sans">
                    <div>
                      <span className="text-neutral-500 text-[9px] uppercase tracking-widest block">US Traditional equivalent</span>
                      <span className="font-bold text-white text-xs">Size {result.recommendedUsSize}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[9px] uppercase tracking-widest block">Assessed Curve Shape</span>
                      <span className="font-bold text-[#E85AA6] text-xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {result.bodyShape} Icon
                      </span>
                    </div>
                  </div>

                  {/* Button to quickly save this sizes to context/storage */}
                  <button
                    onClick={() => onApplySize(result.recommendedSize)}
                    id="btn-apply-size-local"
                    className="w-full mt-5 py-3 rounded-none bg-[#E85AA6] hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Set My Profile to {result.recommendedSize.split(" ")[0]}
                  </button>
                </div>

                {/* advice Block */}
                <div className="border border-gray-100 bg-neutral-50 p-5 space-y-3 rounded-none border-l-4 border-brand-gold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <h5 className="font-bold text-[10px] uppercase tracking-widest text-brand-black">Sartorial Concierge Notes:</h5>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {result.styleAdvice}
                  </p>
                  <p className="text-[9px] text-neutral-400 font-sans tracking-wider uppercase">
                    Calibrated against comfortable fit boundaries.
                  </p>
                </div>

                {/* Fast shopping links */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onExploreMatching("evening")}
                    className="flex-1 py-3 text-center bg-neutral-50 hover:bg-[#E85AA6] hover:text-white transition-all duration-150 font-bold uppercase text-[9px] tracking-widest text-neutral-700 rounded-none border border-gray-200 cursor-pointer"
                  >
                    Evening Curations
                  </button>
                  <button
                    onClick={() => onExploreMatching("corporate")}
                    className="flex-1 py-3 text-center bg-neutral-50 hover:bg-[#E85AA6] hover:text-white transition-all duration-150 font-bold uppercase text-[9px] tracking-widest text-neutral-700 rounded-none border border-gray-200 cursor-pointer"
                  >
                    Office Wear Matches
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
