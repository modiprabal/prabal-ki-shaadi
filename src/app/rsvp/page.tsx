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
    
    try {
      const formData = new FormData(e.currentTarget);
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL as string, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your RSVP. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="bg-[#FCFAF8] pb-24 pt-28 md:pt-32 text-[#2C1E16] font-body selection:bg-[#E8DCC4] selection:text-[#8A252C] min-h-screen relative overflow-hidden">
        
        {/* Global Grid Overlay for Minimalist framing */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute right-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
        </div>

        {/* Editorial Layout: Hero & Velvet Form Card */}
        <section className="max-w-screen-xl mx-auto px-6 relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start justify-between">
            
            {/* Left: Typographic Display */}
            <div className="w-full lg:w-5/12 relative mt-4 md:mt-16 text-center lg:text-left">
              {/* Massive faded watermark */}
              <div className="absolute top-0 right-0 lg:left-0 -translate-y-16 translate-x-12 lg:-translate-x-12 pointer-events-none opacity-[0.03] select-none text-[#8F4E00]">
                <span className="material-symbols-outlined text-[300px] md:text-[400px]">filter_vintage</span>
              </div>
              
              <div className="relative z-10">
                <span className="font-plus-jakarta text-xs uppercase tracking-[0.4em] text-[#8F4E00] mb-8 block">
                  Joyfully Invited
                </span>
                <h1 className="font-noto-serif text-6xl md:text-8xl text-[#2C1E16] leading-[1.05] tracking-[-0.03em] mb-8">
                  Your <br className="hidden md:block"/>
                  Presence <br className="hidden md:block"/>
                  <span className="italic text-[#8A252C] font-light">is Requested.</span>
                </h1>
                <p className="font-plus-jakarta text-[#2C1E16]/70 leading-[1.8] font-light text-lg max-w-md mx-auto lg:mx-0">
                  We kindly request the honor of your company as we celebrate our union. Please return this RSVP card by <span className="text-[#8F4E00] font-semibold">{dates.rsvpDeadline}</span>.
                </p>
                
                <div className="hidden lg:flex items-center gap-6 mt-16 pl-2">
                  <div className="w-16 h-px bg-[#E8DCC4]"></div>
                  <span className="font-plus-jakarta text-[10px] uppercase tracking-[0.3em] text-[#8A252C] font-bold">The Union</span>
                </div>
              </div>
            </div>

            {/* Right: The Velvet Card (Form) */}
            <div className="w-full lg:w-6/12 relative">
              <div className="bg-[#8A252C] rounded-[2rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(44,30,22,0.15)]  border border-[#8A252C] relative overflow-hidden">
                
                {/* Subtle border inset for luxury card feel */}
                <div className="absolute inset-4 border border-[#FCFAF8]/10 rounded-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  <h2 className="font-noto-serif text-3xl md:text-4xl text-[#FCFAF8] mb-10 text-center tracking-tight">Répondez s'il vous plaît</h2>

                  {submitSuccess ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                      <span className="material-symbols-outlined text-6xl text-[#E8DCC4] mb-6" style={{ fontVariationSettings: "'wght' 200" }}>check_circle</span>
                      <h3 className="font-noto-serif text-4xl text-[#FCFAF8] mb-6">Thank You.</h3>
                      <p className="font-plus-jakarta text-[#FCFAF8]/80 leading-[1.8] font-light max-w-sm">
                        Your response has been sealed. We look forward to celebrating this joyous occasion with you. We will contact you soon regarding your stay.
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-10" onSubmit={handleSubmit}>
                      
                      {/* Name */}
                      <div className="relative group">
                        <label className="block text-[10px] font-plus-jakarta text-[#E8DCC4] uppercase tracking-[0.3em] mb-3 font-semibold">Guest Name(s)</label>
                        <input 
                          name="name"
                          required
                          className="w-full bg-transparent border-0 border-b border-[#FCFAF8]/20 py-3 focus:ring-0 focus:border-[#E8DCC4] transition-colors font-noto-serif italic text-2xl text-[#FCFAF8] placeholder-[#FCFAF8]/20 focus:outline-none" 
                          placeholder="Your Name" 
                          type="text" 
                        />
                      </div>
                      
                      {/* Contact */}
                      <div className="relative group">
                        <label className="block text-[10px] font-plus-jakarta text-[#E8DCC4] uppercase tracking-[0.3em] mb-3 font-semibold">Contact Email or Phone</label>
                        <input 
                          name="contact"
                          required
                          className="w-full bg-transparent border-0 border-b border-[#FCFAF8]/20 py-3 focus:ring-0 focus:border-[#E8DCC4] transition-colors font-noto-serif text-xl text-[#FCFAF8] placeholder-[#FCFAF8]/20 focus:outline-none" 
                          placeholder="For updates" 
                          type="text" 
                        />
                      </div>
                      
                      {/* Two Column details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="relative group">
                          <label className="block text-[10px] font-plus-jakarta text-[#E8DCC4] uppercase tracking-[0.3em] mb-3 font-semibold">Number of Guests</label>
                          <select 
                            name="guests"
                            className="w-full bg-transparent border-0 border-b border-[#FCFAF8]/20 py-3 focus:ring-0 focus:border-[#E8DCC4] transition-colors font-noto-serif text-xl text-[#FCFAF8] appearance-none cursor-pointer focus:outline-none"
                            style={{ color: '#FCFAF8' }}
                          >
                            <option value="1" className="text-[#2C1E16]">1 attending</option>
                            <option value="2" className="text-[#2C1E16]">2 attending</option>
                            <option value="3" className="text-[#2C1E16]">3 attending</option>
                            <option value="4+" className="text-[#2C1E16]">Family (4+)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-10 text-[#E8DCC4] pointer-events-none" style={{ fontVariationSettings: "'wght' 200" }}>expand_more</span>
                        </div>
                        
                        <div className="relative group">
                          <label className="block text-[10px] font-plus-jakarta text-[#E8DCC4] uppercase tracking-[0.3em] mb-3 font-semibold">Your Response</label>
                          <select 
                            name="attending"
                            className="w-full bg-transparent border-0 border-b border-[#FCFAF8]/20 py-3 focus:ring-0 focus:border-[#E8DCC4] transition-colors font-noto-serif text-xl text-[#FCFAF8] appearance-none cursor-pointer focus:outline-none"
                            style={{ color: '#FCFAF8' }}
                          >
                            <option value="Joyfully Accepts" className="text-[#2C1E16]">Joyfully Accepts</option>
                            <option value="Regretfully Declines" className="text-[#2C1E16]">Regretfully Declines</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-10 text-[#E8DCC4] pointer-events-none" style={{ fontVariationSettings: "'wght' 200" }}>expand_more</span>
                        </div>
                      </div>
                      
                      {/* Note */}
                      <div className="relative group">
                        <label className="block text-[10px] font-plus-jakarta text-[#E8DCC4] uppercase tracking-[0.3em] mb-3 font-semibold">Dietary Notes / Message</label>
                        <textarea 
                          name="message"
                          className="w-full bg-transparent border-0 border-b border-[#FCFAF8]/20 py-3 focus:ring-0 focus:border-[#E8DCC4] transition-colors font-noto-serif text-xl text-[#FCFAF8] placeholder-[#FCFAF8]/20 resize-none h-20 focus:outline-none" 
                          placeholder="Optional notes for the hosts..."
                        ></textarea>
                      </div>
                      
                      {/* Submit */}
                      <button 
                        disabled={isSubmitting}
                        className="w-full mt-8 bg-[#FCFAF8] text-[#8A252C] hover:bg-[#F5EFE6] active:scale-[0.98] py-5 rounded-full font-plus-jakarta text-[11px] font-bold tracking-[0.3em] uppercase transition-all flex justify-center items-center gap-3 cursor-pointer disabled:opacity-50" 
                        type="submit"
                      >
                        {isSubmitting ? "Sealing Envelope..." : "Send RSVP"}
                        {!isSubmitting && <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 300" }}>send</span>}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#E8DCC4] pt-16">
            <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-[#8F4E00] mb-6" style={{ fontVariationSettings: "'wght' 100" }}>local_hotel</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-[#2C1E16]">Accommodations</h4>
                  <p className="text-sm font-plus-jakarta text-[#2C1E16]/70 leading-[1.8] font-light max-w-sm mx-auto">
                    Arrangements for out-of-town guests have been secured across multiple comfortable venues. We will contact you personally with your specific stay details upon receiving your RSVP.
                  </p>
            </div>
            <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-[#8F4E00] mb-6" style={{ fontVariationSettings: "'wght' 100" }}>local_parking</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-[#2C1E16]">Parking</h4>
                  <p className="text-sm font-plus-jakarta text-[#2C1E16]/70 leading-[1.8] font-light max-w-sm mx-auto">
                    Ample secure parking and valet assistance will be readily available at all the major celebration locations.
                  </p>
            </div>
              <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-[#8F4E00] mb-6" style={{ fontVariationSettings: "'wght' 100" }}>celebration</span>
                  <h4 className="font-noto-serif text-2xl mb-3 text-[#2C1E16]">Festivities</h4>
                  <p className="text-sm font-plus-jakarta text-[#2C1E16]/70 leading-[1.8] font-light max-w-sm mx-auto">
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
