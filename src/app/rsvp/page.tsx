"use client";

import { useState } from "react";
import { weddingConfig } from "@/config/weddingConfig";
import Footer from "@/components/Footer";

export default function RSVPPage() {
  const { dates } = weddingConfig;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Set a long timeout for Google Scripts (60s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        contact: formData.get("contact"),
        guests: formData.get("guests"),
        attending: formData.get("attending"),
        message: formData.get("message"),
      };

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(result.error || 'Failed to submit RSVP');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Error submitting form:', error);
      
      if (error.name === 'AbortError') {
        // If it timed out but we saw 200s in terminal, it likely still worked
        alert('The submission is taking a bit longer than usual. Please check your sheet or try again in a moment.');
      } else {
        alert('There was an error submitting your RSVP. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="bg-background pb-24 pt-28 md:pt-32 text-foreground font-body selection:bg-border selection:text-accent min-h-screen relative overflow-hidden transition-colors duration-700">
        
        {/* Global Grid Overlay for Minimalist framing */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-border/30"></div>
          <div className="absolute right-12 top-0 bottom-0 w-px bg-border/30"></div>
        </div>

        {/* Editorial Layout: Hero & Velvet Form Card */}
        <section className="max-w-screen-xl mx-auto px-6 relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start justify-between">
            
            {/* Left: Typographic Display */}
            <div className="w-full lg:w-5/12 relative mt-4 md:mt-16 text-center lg:text-left">
              {/* Massive faded watermark */}
              <div className="absolute top-0 right-0 lg:left-0 -translate-y-16 translate-x-12 lg:-translate-x-12 pointer-events-none opacity-[0.03] select-none text-highlight">
                <span className="material-symbols-outlined text-[300px] md:text-[400px]">filter_vintage</span>
              </div>
              
              <div className="relative z-10">
                <span className="font-plus-jakarta text-xs uppercase tracking-[0.4em] text-highlight mb-8 block">
                  Joyfully Invited
                </span>
                <h1 className="font-noto-serif text-6xl md:text-8xl text-foreground leading-[1.05] tracking-[-0.03em] mb-8">
                  Your <br className="hidden md:block"/>
                  Presence is <br className="hidden md:block"/>
                  <span className="italic text-accent font-light">Requested.</span>
                </h1>
                <p className="font-plus-jakarta text-foreground/70 leading-[1.8] font-light text-lg max-w-md mx-auto lg:mx-0">
                  We kindly request the honor of your company as we celebrate our union. Please return this RSVP card by <span className="text-highlight font-semibold">{dates.rsvpDeadline}</span>.
                </p>
                
                <div className="hidden lg:flex items-center gap-6 mt-16 pl-2">
                  <div className="w-16 h-px bg-border"></div>
                  <span className="font-plus-jakarta text-[10px] uppercase tracking-[0.3em] text-accent font-bold">The Union</span>
                </div>
              </div>
            </div>

            {/* Right: The Velvet Card (Form) */}
            <div className="w-full lg:w-6/12 relative">
              <div className="bg-accent rounded-[2rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(var(--color-foreground),0.15)]  border border-accent relative overflow-hidden transition-colors duration-700">
                
                {/* Subtle border inset for luxury card feel */}
                <div className="absolute inset-4 border border-background/20 rounded-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  <h2 className="font-noto-serif text-3xl md:text-4xl text-background mb-10 text-center tracking-tight">Please Respond</h2>

                  {submitSuccess ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                      <span className="material-symbols-outlined text-6xl text-background/60 mb-6" style={{ fontVariationSettings: "'wght' 200" }}>check_circle</span>
                      <h3 className="font-noto-serif text-4xl text-background mb-6">Thank You.</h3>
                      <p className="font-plus-jakarta text-background/80 leading-[1.8] font-light max-w-sm">
                        Your response has been sealed. We look forward to celebrating this joyous occasion with you. We will contact you soon regarding your stay.
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-10" onSubmit={handleSubmit}>
                      
                      {/* Name */}
                      <div className="relative group">
                        <label className="block text-[10px] font-plus-jakarta text-background/80 uppercase tracking-[0.3em] mb-3 font-semibold">Guest Name(s)</label>
                        <input 
                          name="name"
                          required
                          className="w-full bg-transparent border-0 border-b border-background/20 py-3 focus:ring-0 focus:border-background/60 transition-colors font-noto-serif italic text-2xl text-background placeholder-background/40 focus:outline-none" 
                          placeholder="Your Name" 
                          type="text" 
                        />
                      </div>
                      
                      {/* Contact */}
                      <div className="relative group">
                        <label 
                          suppressHydrationWarning 
                          className="block text-[10px] font-plus-jakarta text-background/80 uppercase tracking-[0.3em] mb-3 font-semibold"
                        >
                          Contact Email or Phone (Optional)
                        </label>
                        <input 
                          name="contact"
                          className="w-full bg-transparent border-0 border-b border-background/20 py-3 focus:ring-0 focus:border-background/60 transition-colors font-noto-serif text-xl text-background placeholder-background/40 focus:outline-none" 
                          placeholder="For updates" 
                          type="text" 
                        />
                      </div>
                      
                      {/* Two Column details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="relative group">
                          <label className="block text-[10px] font-plus-jakarta text-background/80 uppercase tracking-[0.3em] mb-3 font-semibold">Number of Guests</label>
                          <select 
                            name="guests"
                            className="w-full bg-transparent border-0 border-b border-background/20 py-3 focus:ring-0 focus:border-background/60 transition-colors font-noto-serif text-xl text-background appearance-none cursor-pointer focus:outline-none"
                            style={{ color: 'var(--background)' }}
                          >
                            <option value="1" className="text-foreground">1 attending</option>
                            <option value="2" className="text-foreground">2 attending</option>
                            <option value="3" className="text-foreground">3 attending</option>
                            <option value="4+" className="text-foreground">Family (4+)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-10 text-background/60 pointer-events-none" style={{ fontVariationSettings: "'wght' 200" }}>expand_more</span>
                        </div>
                        
                        <div className="relative group">
                          <label className="block text-[10px] font-plus-jakarta text-background/80 uppercase tracking-[0.3em] mb-3 font-semibold">Your Response</label>
                          <select 
                            name="attending"
                            className="w-full bg-transparent border-0 border-b border-background/20 py-3 focus:ring-0 focus:border-background/60 transition-colors font-noto-serif text-xl text-background appearance-none cursor-pointer focus:outline-none"
                            style={{ color: 'var(--background)' }}
                          >
                            <option value="Joyfully Accepts" className="text-foreground">Joyfully Accepts</option>
                            <option value="Regretfully Declines" className="text-foreground">Regretfully Declines</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-10 text-background/60 pointer-events-none" style={{ fontVariationSettings: "'wght' 200" }}>expand_more</span>
                        </div>
                      </div>
                      
                      {/* Note */}
                      <div className="relative group">
                        <label className="block text-[10px] font-plus-jakarta text-background/80 uppercase tracking-[0.3em] mb-3 font-semibold">Special Request</label>
                        <textarea 
                          name="message"
                          className="w-full bg-transparent border-0 border-b border-background/20 py-3 focus:ring-0 focus:border-background/60 transition-colors font-noto-serif text-xl text-background placeholder-background/40 resize-none h-20 focus:outline-none" 
                          placeholder="Any special requests or notes for us..."
                        ></textarea>
                      </div>
                      
                      {/* Submit */}
                      <button 
                        disabled={isSubmitting}
                        className="w-full mt-8 bg-background text-accent hover:opacity-90 active:scale-[0.98] py-5 rounded-full font-plus-jakarta text-[11px] font-bold tracking-[0.3em] uppercase transition-all flex justify-center items-center gap-3 cursor-pointer disabled:opacity-50" 
                        type="submit"
                      >
                        {isSubmitting ? "Sealing Envelope..." : "Send RSVP"}
                        {!isSubmitting && <span className="material-symbols-outlined text-sm text-accent" style={{ fontVariationSettings: "'wght' 300" }}>send</span>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Small Details Grid */}
        <section className="max-w-screen-xl mx-auto px-6 mt-24 mb-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-16">
            <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-highlight mb-6" style={{ fontVariationSettings: "'wght' 100" }}>local_hotel</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-foreground">Accommodations</h4>
                  <p className="text-sm font-plus-jakarta text-foreground/70 leading-[1.8] font-light max-w-sm mx-auto">
                    Arrangements for out-of-town guests have been secured across multiple comfortable venues. We will contact you personally with your specific stay details upon receiving your RSVP.
                  </p>
            </div>
            <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-highlight mb-6" style={{ fontVariationSettings: "'wght' 100" }}>local_parking</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-foreground">Parking</h4>
                  <p className="text-sm font-plus-jakarta text-foreground/70 leading-[1.8] font-light max-w-sm mx-auto">
                    Ample secure parking and valet assistance will be readily available at all the major celebration locations.
                  </p>
            </div>
              <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-highlight mb-6" style={{ fontVariationSettings: "'wght' 100" }}>celebration</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-foreground">Festivities</h4>
                  <p className="text-sm font-plus-jakarta text-foreground/70 leading-[1.8] font-light max-w-sm mx-auto">
                    Expect a multi-day itinerary filled with vibrant music, dancing, and late-night celebrations. Dress festively and comfortably!
                  </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
