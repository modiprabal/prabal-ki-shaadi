"use client";

import { motion } from "framer-motion";
import { Plane, Train } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function TravelPage() {
  const { location, dates } = weddingConfig;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-6 text-center">
        Travel & Accommodations
      </h1>
      <p className="text-text-muted text-center max-w-lg mb-16">
        We are thrilled to host you in the beautiful city of {location.city}! Here is everything you need to know to plan your trip.
      </p>

      {/* How To Reach */}
      <div className="w-full max-w-6xl mb-16">
        <h2 className="font-serif text-4xl text-text-main mb-12 text-center">How to Reach</h2>
        
        {/* By Air - 3 Column Grid (Moved to Top) */}
        <h3 className="font-serif text-2xl text-text-main mb-6 flex justify-center items-center gap-3">
           By Air
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {location.airports.map((airport, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm flex flex-col h-full hover:border-brand-sage/50 transition-colors"
            >
              <div className="w-12 h-12 bg-brand-peach text-text-main rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-text-main mb-3">{airport.name}</h3>
              <p className="text-sm text-text-muted mb-6 leading-relaxed flex-1">
                {airport.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-emerald font-bold mb-3 border-b border-brand-sage/20 pb-2">Connecting Trains</h4>
                  <ul className="space-y-2">
                    {airport.trains.map((train, i) => (
                      <li key={i} className="text-sm text-text-main flex items-start gap-2">
                        <span className="text-brand-sage mt-0.5">▪</span> {train}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-emerald font-bold mb-3 border-b border-brand-sage/20 pb-2">Drive Distance</h4>
                  <p className="text-sm text-text-main leading-relaxed">
                    {airport.drive}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* By Train - Horizontal Premium Card */}
        <h3 className="font-serif text-2xl text-text-main mb-6 text-center mt-12">
          By Train
        </h3>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-brand-sage/40 shadow-sm flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto mb-8 hover:shadow-md transition-shadow relative overflow-hidden"
        >
          {/* Decorative faint background shape */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-mint/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-24 h-24 shrink-0 bg-white border border-brand-sage/30 text-text-main rounded-full flex items-center justify-center shadow-sm relative z-10">
            <Train className="w-10 h-10 text-brand-emerald" />
          </div>
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="font-serif text-3xl text-text-main mb-3">{location.trainStationName}</h3>
            <p className="text-text-muted leading-relaxed mb-6 max-w-2xl">
              Lalitpur Junction is a major railway hub with excellent, frequent direct connectivity from New Delhi, Mumbai, Bhopal, and other major cities across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
               <span className="bg-brand-peach/50 border border-brand-sage/20 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest text-text-main shadow-sm flex items-center gap-2 font-medium">
                 📍 {location.trainStationDistance} to Venue
               </span>
               <span className="bg-brand-peach/50 border border-brand-sage/20 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest text-text-main shadow-sm flex items-center gap-2 font-medium">
                 🚕 Taxis Easily Available
               </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accommodation (Bottom) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white/50 backdrop-blur-md rounded-3xl p-10 border border-brand-sage/40 shadow-sm text-center mb-12 relative overflow-hidden"
      >
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-brand-peach/40 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="font-serif text-3xl text-text-main mb-4 relative z-10">Where to Stay</h2>
        <p className="text-text-muted mb-8 leading-relaxed max-w-2xl mx-auto relative z-10">
          We are working to ensure a comfortable stay for all our guests across various beautiful properties near the venue. We will reach out to you separately with your personalized hotel assignment and room details closer to the date. Check-ins begin at {dates.checkInTime} on {dates.checkInDate}.
        </p>
        <button disabled className="relative z-10 px-8 py-3 bg-white border border-brand-sage/50 text-brand-sage/90 rounded-full tracking-widest uppercase text-sm font-medium cursor-not-allowed shadow-sm">
          Details Coming Soon
        </button>
      </motion.div>

      {/* Map Embed */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mt-8 bg-white/50 backdrop-blur-md rounded-3xl p-4 border border-white/40 shadow-sm"
      >
        <h2 className="font-serif text-2xl text-text-main mb-4 px-4">{location.weddingVenue} Location</h2>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-inner bg-gray-100">
          <iframe 
            src={location.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </main>
  );
}
