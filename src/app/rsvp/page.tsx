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
      <main className="pt-32 pb-20 min-h-screen relative">
        {/* Background aesthetic blobs */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#ffb3ac]/10 to-transparent -z-10 blur-3xl rounded-b-full"></div>
        <div className="absolute top-80 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ffdea5]/10 to-transparent -z-10 blur-3xl rounded-full"></div>

        {/* Hero Meta */}
        <div className="text-center px-6 mb-16">
          <span className="font-label text-secondary tracking-[0.2em] uppercase text-xs mb-6 block">Your Presence is Requested</span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight tracking-tight max-w-2xl mx-auto">
            Celebrate <br />
            <span className="italic font-normal text-primary">Our Union.</span>
          </h1>
        </div>

        <section className="max-w-screen-xl mx-auto px-6">
          <div className="bg-surface-container-lowest rounded-[3rem] shadow-[0_30px_60px_rgba(30,27,19,0.06)] overflow-hidden border border-outline-variant/10">
            <div className="flex flex-col lg:flex-row">
              {/* RSVP Form Column */}
              <div className="w-full lg:w-5/12 p-10 md:p-16 lg:p-20 bg-white relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#af101a 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                
                <h2 className="font-headline text-3xl text-on-surface mb-2 relative z-10">RSVP</h2>
                <p className="font-body text-on-surface-variant mb-12 relative z-10">Kindly respond by {dates.rsvpDeadline}</p>

                {submitSuccess ? (
                  <div className="relative z-10 p-8 bg-surface-container rounded-2xl border border-primary/20 text-center animate-pulse">
                     <span className="material-symbols-outlined text-4xl text-primary mb-4">check_circle</span>
                     <h3 className="font-headline text-2xl text-on-surface mb-2">Thank You!</h3>
                     <p className="text-on-surface-variant">We have received your RSVP and look forward to celebrating with you.</p>
                  </div>
                ) : (
                  <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative group">
                      <label className="block text-xs font-label text-tertiary uppercase tracking-wider mb-2 font-semibold">Your Full Name</label>
                      <input 
                        name="name"
                        required
                        className="w-full bg-transparent border-0 border-b border-outline/50 py-3 focus:ring-0 focus:border-primary transition-colors font-body text-lg text-on-surface placeholder-on-surface-variant/40 hover:border-outline" 
                        placeholder="e.g. Rahul Sharma" 
                        type="text" 
                      />
                    </div>
                    {/* Contact */}
                    <div className="relative group">
                      <label className="block text-xs font-label text-tertiary uppercase tracking-wider mb-2 font-semibold">Email or Phone</label>
                      <input 
                        name="contact"
                        required
                        className="w-full bg-transparent border-0 border-b border-outline/50 py-3 focus:ring-0 focus:border-primary transition-colors font-body text-lg text-on-surface placeholder-on-surface-variant/40 hover:border-outline" 
                        placeholder="For any crucial updates" 
                        type="text" 
                      />
                    </div>
                    {/* Two Column details */}
                    <div className="grid grid-cols-2 gap-8">
                      <div className="relative group">
                        <label className="block text-xs font-label text-tertiary uppercase tracking-wider mb-2 font-semibold">Guests</label>
                        <select 
                           name="guests"
                           className="w-full bg-transparent border-0 border-b border-outline/50 py-3 focus:ring-0 focus:border-primary transition-colors font-body text-lg text-on-surface appearance-none hover:border-outline cursor-pointer"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">Family (4+)</option>
                        </select>
                         <span className="material-symbols-outlined absolute right-0 top-9 text-outline-variant pointer-events-none">expand_more</span>
                      </div>
                      <div className="relative group">
                        <label className="block text-xs font-label text-tertiary uppercase tracking-wider mb-2 font-semibold">Attending?</label>
                        <select 
                          name="attending"
                          className="w-full bg-transparent border-0 border-b border-outline/50 py-3 focus:ring-0 focus:border-primary transition-colors font-body text-lg text-on-surface appearance-none hover:border-outline cursor-pointer"
                        >
                          <option value="Joyfully Accepts">Joyfully Accepts</option>
                          <option value="Regretfully Declines">Regretfully Declines</option>
                        </select>
                         <span className="material-symbols-outlined absolute right-0 top-9 text-outline-variant pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    {/* Note */}
                    <div className="relative group">
                      <label className="block text-xs font-label text-tertiary uppercase tracking-wider mb-2 font-semibold">Dietary Notes / Message</label>
                      <textarea 
                        name="message"
                        className="w-full bg-transparent border-0 border-b border-outline/50 py-3 focus:ring-0 focus:border-primary transition-colors font-body text-lg text-on-surface placeholder-on-surface-variant/40 hover:border-outline resize-none h-20" 
                        placeholder="Any special requests?"
                      ></textarea>
                    </div>
                    {/* Submit */}
                    <button 
                      disabled={isSubmitting}
                      className="w-full mt-10 bg-[#af101a] text-[#ffffff] shadow-[0_10px_20px_rgba(175,16,26,0.3)] hover:bg-[#930010] active:scale-[0.98] py-5 rounded-full font-plus-jakarta font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50" 
                      type="submit"
                    >
                      {isSubmitting ? "Submitting..." : "Send RSVP"}
                      {!isSubmitting && <span className="material-symbols-outlined font-light text-xl">favorite</span>}
                    </button>
                  </form>
                )}
              </div>

              {/* Venue Map Info Column */}
              <div className="w-full lg:w-7/12 relative">
                {/* Embedded dynamic Map */}
                <iframe 
                  src="https://maps.google.com/maps?q=Shubh%20Heaven%20Resort,%20Lalitpur,%20Uttar%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '500px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  className="w-full h-full object-cover opacity-90 saturate-50 hover:saturate-100 transition-all duration-1000"
                ></iframe>
                
                {/* Floating Venue Card on Map */}
                <div className="absolute inset-x-8 bottom-8 md:inset-x-auto md:right-8 md:bottom-8 bg-[#fff8ef]/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-sm border border-[#f5edde]">
                  <h3 className="font-headline text-2xl text-[#1e1b13] mb-4">Shubh Heaven Resort</h3>
                  <div className="space-y-3 font-body text-sm text-[#5b403d]">
                    <div className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-[#af101a] shrink-0 mt-0.5">map</span>
                      <p>NH-44 Highway, Lalitpur, Uttar Pradesh 284403, India</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="material-symbols-outlined text-[#8f4e00] shrink-0">event</span>
                      <p>June 23 - June 24, 2026</p>
                    </div>
                  </div>
                  <a href="/travel" className="mt-6 w-full block text-center bg-[#f5edde] hover:bg-[#e9e2d3] text-[#8f4e00] py-3 rounded-xl font-bold tracking-wider text-xs uppercase transition-colors">
                    View Travel Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Small Details Grid */}
        <section className="max-w-screen-xl mx-auto px-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#f5edde] p-8 rounded-3xl text-center">
                     <span className="material-symbols-outlined text-4xl text-[#af101a] mb-4 font-light">local_hotel</span>
                     <h4 className="font-headline text-xl mb-2 text-[#1e1b13]">Accommodations</h4>
                     <p className="text-sm text-[#5b403d] leading-relaxed">Arrangements for guests traveling from out of town have been made at the venue.</p>
                </div>
                <div className="bg-[#f5edde] p-8 rounded-3xl text-center">
                     <span className="material-symbols-outlined text-4xl text-[#af101a] mb-4 font-light">local_parking</span>
                     <h4 className="font-headline text-xl mb-2 text-[#1e1b13]">Parking</h4>
                     <p className="text-sm text-[#5b403d] leading-relaxed">Ample secure parking with valet assistance is available at Shubh Heaven Resort.</p>
                </div>
                 <div className="bg-[#f5edde] p-8 rounded-3xl text-center border border-[#e9e2d3]">
                     <span className="material-symbols-outlined text-4xl text-[#af101a] mb-4 font-light">celebration</span>
                     <h4 className="font-headline text-xl mb-2 text-[#1e1b13]">Festivities</h4>
                     <p className="text-sm text-[#5b403d] leading-relaxed">Expect vibrant music, dancing, and late-night celebrations. Dress comfortably!</p>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
