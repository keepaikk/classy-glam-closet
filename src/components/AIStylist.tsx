import React from "react";
import { Sparkles, Send, Bot, User, Trash2, ArrowRight } from "lucide-react";

interface StylistMessage {
  role: 'user' | 'model';
  text: string;
}

interface AIStylistProps {
  userSizePreference: string;
}

export default function AIStylist({ userSizePreference }: AIStylistProps) {
  const [messages, setMessages] = React.useState<StylistMessage[]>([
    {
      role: 'model',
      text: "### Welcome to your Custom Curves Consultation!\n\nI am your dedicated Virtual Fashion Stylist from **CLASSY GLAM CLOSET**. Together, we will outline bespoke outfits celebrating your shape.\n\n*Tell me more about your upcoming occasion (e.g. wedding reception, boardroom presentation, smart-casual weekend getaway) or what body shape you want to curate!* \n\n*How can I elevate your style today?*"
    }
  ]);
  const [inputText, setInputText] = React.useState("");
  const [occasion, setOccasion] = React.useState("evening");
  const [shape, setShape] = React.useState("Hourglass");
  const [stylePref, setStylePref] = React.useState("Bold Glam");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const presetQueries = [
    { label: "Wedding guest options", prompt: "I am attending an evening wedding. What is the most flattering evening wardrobe drape for curvy bodies?" },
    { label: "Corporate board meeting look", prompt: "Can you recommend a powerful and elegant corporate presentation outfit? I want something comfortable but highly sophisticated." },
    { label: "Pear shape casual pairings", prompt: "Explain how to pair a structured blazer with wide-leg pants or denim to flatter a pear-shaped silhouette." }
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const activeText = customPrompt || inputText;
    if (!activeText.trim() && !customPrompt) return;

    const userMsg: StylistMessage = { role: 'user', text: activeText };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: activeText,
          chatHistory: messages,
          preferences: {
            occasion,
            shape,
            stylePref,
            size: userSizePreference
          }
        })
      });

      const data = await response.json();
      if (data && data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else if (data && data.error) {
        setMessages(prev => [...prev, { role: 'model', text: `### High Traffic on the Style Deck\n\n${data.error}` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "### Concierge Connection Interrupted\n\nI was unable to reach the styling suite. Please double-check your workspace connection settings and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Let's begin a fresh custom curation. Share your styling objectives or proportions!"
      }
    ]);
  };

  return (
    <div className="bg-white py-12 md:py-16" id="ai-stylist-section">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Header styling */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="w-12 h-12 bg-[#F9EEF4] flex items-center justify-center mx-auto mb-2 text-[#E85AA6]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="serif text-3xl font-bold text-brand-black">
            The Virtual Curves Stylist
          </h2>
          <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold font-sans">
            Powered by Smart Gemini Intelligence
          </p>
          <p className="text-sm text-neutral-600 font-sans mt-2">
            Speak to our high-end wardrobe counselor. Get visual pairings, accentuation secrets, and luxury guidelines customized for your curve profile.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Preference Builder (lg:col-span-4) */}
          <div className="lg:col-span-4 border border-gray-100 bg-neutral-50 p-6 text-left space-y-6 flex flex-col justify-between rounded-none" id="stylist-pref-builder">
            <div className="space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-brand-black border-b border-gray-200 pb-3 flex items-center justify-between">
                <span>1. Curve Context</span>
                {userSizePreference && (
                  <span className="text-[10px] uppercase bg-[#E85AA6] text-white px-2 py-0.5 rounded-none font-bold tracking-wider">
                    Profile: {userSizePreference.split(" ")[0]}
                  </span>
                )}
              </h4>

              {/* Occasion select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Desired Occasion</label>
                <select
                  id="pref-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-none px-3 py-2.5 text-xs text-neutral-700 font-medium outline-hidden focus:border-[#E85AA6]"
                >
                  <option value="evening">Elegant Evening Fashion</option>
                  <option value="corporate">Corporate Office Fashion</option>
                  <option value="casual">Smart Casual Luxe</option>
                </select>
              </div>

              {/* Shape select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Your Body Silhouette</label>
                <select
                  id="pref-shape"
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-none px-3 py-2.5 text-xs text-neutral-700 font-medium outline-hidden focus:border-[#E85AA6]"
                >
                  <option value="Hourglass">Balanced Hourglass</option>
                  <option value="Pear">Lower-Curved Pear</option>
                  <option value="Apple">Mid-Curved Sculpted Apple</option>
                  <option value="Rectangle">Uniform Classical Rectangle</option>
                </select>
              </div>

              {/* Style vibe select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Style Philosophy</label>
                <select
                  id="pref-vibe"
                  value={stylePref}
                  onChange={(e) => setStylePref(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-none px-3 py-2.5 text-xs text-neutral-700 font-medium outline-hidden focus:border-[#E85AA6]"
                >
                  <option value="Bold Glam">Bold & Vibrant (Pink & Gold highlights)</option>
                  <option value="Quiet Luxury">Quiet Luxury & Sophistication</option>
                  <option value="Highly Structured">Sharp Tailored & Monochromatic</option>
                </select>
              </div>
            </div>

            {/* Quick tips card */}
            <div className="pt-6 border-t border-gray-200 bg-white p-4 rounded-none border-l-4 border-brand-gold space-y-1.5 text-[11px] leading-relaxed text-neutral-500">
              <p className="font-bold text-xs text-brand-black flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-gold" /> Style Philosophy
              </p>
              <p className="font-sans">We believe in defining, draped structures, and bold confidence. Let our AI tailor garments directly to your style priorities.</p>
            </div>

          </div>

          {/* Right Column: Conversational Deck (lg:col-span-8) */}
          <div className="lg:col-span-8 border border-gray-200 rounded-none overflow-hidden flex flex-col justify-between bg-neutral-50 h-[500px]" id="stylist-chat-panel">
            
            {/* Top info and reset */}
            <div className="bg-white border-b border-gray-200 px-5 py-3.5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Styling Suite Live</span>
              </div>
              <button
                onClick={clearChat}
                id="btn-clear-chat"
                className="p-1.5 text-neutral-400 hover:text-brand-pink rounded-none transition-colors cursor-pointer"
                title="Clear Consultation Logs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolling Chat log */}
            <div className="p-5 flex-1 overflow-y-auto space-y-5" id="chat-scroller">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot Icon */}
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-none bg-neutral-900 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-brand-gold" />
                    </div>
                  )}

                  <div 
                    className={`rounded-none p-4 max-w-[85%] text-xs shadow-xs text-left ${
                      msg.role === 'user'
                        ? 'bg-[#111111] text-white border-b-2 border-[#E85AA6] font-medium'
                        : 'bg-white text-neutral-800 border border-gray-200/80 shadow-xs'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-line font-sans">{msg.text}</p>
                    ) : (
                      // Clean simple markdown formatting helper
                      <div className="markdown-body space-y-1.5 text-neutral-700">
                        {msg.text.split("\n").map((line, lIdx) => {
                          const trimmed = line.trim();
                          if (trimmed.startsWith("###")) {
                            return <h3 key={lIdx} className="text-sm font-extrabold text-brand-black serif pt-2 border-b border-gray-100 pb-0.5">{trimmed.replace("###", "")}</h3>;
                          }
                          if (trimmed.startsWith("##")) {
                            return <h2 key={lIdx} className="text-base font-extrabold text-brand-black serif pt-2 mb-1">{trimmed.replace("##", "")}</h2>;
                          }
                          if (trimmed.startsWith("#")) {
                            return <h1 key={lIdx} className="text-lg font-extrabold text-brand-black serif pt-2 mb-1">{trimmed.replace("#", "")}</h1>;
                          }
                          if (trimmed.startsWith("- **")) {
                            const innerText = trimmed.replace("-", "").trim();
                            return (
                              <li key={lIdx} className="list-disc ml-4 font-sans text-[11px] leading-relaxed">
                                {innerText.includes("**") ? (
                                  <>
                                    <strong className="text-brand-pink font-semibold">{innerText.split("**")[1]}</strong>
                                    {innerText.split("**")[2]}
                                  </>
                                ) : innerText}
                              </li>
                            );
                          }
                          if (trimmed.startsWith("-")) {
                            return <li key={lIdx} className="list-disc ml-4 font-sans text-[11px] leading-relaxed">{trimmed.replace("-", "").trim()}</li>;
                          }
                          // Handle simple bold highlight replacements
                          if (line.includes("**")) {
                            const parts = line.split("**");
                            return (
                              <p key={lIdx} className="font-sans text-[11px] leading-relaxed">
                                {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-brand-pink font-semibold">{p}</strong> : p)}
                              </p>
                            );
                          }
                          return <p key={lIdx} className="font-sans text-[11px] leading-relaxed">{line}</p>;
                        })}
                      </div>
                    )}
                  </div>

                  {/* User Icon */}
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-none bg-neutral-200 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-neutral-600" />
                    </div>
                  )}
                </div>
              ))}

              {/* loading state */}
              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-none bg-[#111111] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-none p-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-brand-pink animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-none bg-brand-gold animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-none bg-brand-pink animate-bounce" />
                    <span className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest font-sans ml-2">CONCIERGE COUPLING OUTFITS...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom presets bar */}
            <div className="bg-white border-t border-gray-200 px-5 py-3 flex gap-2 overflow-x-auto shrink-0 scrollbar-none items-center" id="chat-presets-bar">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest shrink-0">Prompts:</span>
              {presetQueries.map((pq, idx) => (
                <button
                  key={idx}
                  id={`chat-preset-${idx}`}
                  onClick={() => handleSendMessage(pq.prompt)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-[#F9EEF4] hover:text-[#E85AA6] text-[10px] font-bold rounded-none text-neutral-700 transition-colors whitespace-nowrap border border-gray-200 cursor-pointer"
                >
                  {pq.label}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div className="bg-white p-4 border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="stylist-chat-input"
                  placeholder="Ask about necklines, blazer lengths, colors, or evening accessories..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  className="flex-1 text-xs border border-gray-200 rounded-none px-4 py-3.5 focus:outline-hidden focus:border-[#E85AA6] font-sans bg-neutral-50/50"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  id="stylist-send-btn"
                  className="p-3.5 rounded-none bg-[#E85AA6] hover:bg-neutral-900 text-white shadow-xs hover:shadow-md transition-all shrink-0 duration-100 cursor-pointer"
                  disabled={isLoading}
                  title="Submit Query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
