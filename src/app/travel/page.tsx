import Footer from "@/components/Footer";
import { weddingConfig } from "@/config/weddingConfig";
import Link from "next/link";

export default function TravelPage() {
  const { location } = weddingConfig;
  const { airports } = location;

  // Assuming airports array has at least 3 elements like the config: New Delhi, Bhopal, Gwalior
  const airportIcons = ["flight_takeoff", "hub", "explore"];

  return (
    <>
      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden">
          <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4 block">
                Destination: {location.city.split(",")[0]}
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-on-surface font-bold tracking-tight mb-6 leading-tight">
                Getting to <br />
                <span className="text-primary italic">Our Celebration</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed mb-8">
                {location.city.split(",")[0]} awaits your arrival. We've curated the best routes by air and rail to
                ensure your journey is as beautiful as the destination.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Scenic aerial view of Indian landscape and architecture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwGRFlmO1AbwZBS1ZuLebN64DP98h49m_btzpaGb7UPwjhWjcGAGaeqvpE1d03DybCFLm7NHn4jQ_vbZ3nTo6FU2HHoJ3JRlHCU5eVDkgI8bWtPAT1nzZ4eDWu-zA-xrT1IJE8THe3x-hmsNLcJhe43OFMcZg0xC1si-w7ePEtHRY_Cqe4iyEbcnm9ihtl1c5alngr4swIHLoIezVz-rghdFW6Z0ETK2iDGumvBlSuPerS_m1DQ4BMOy0PVR19cAH02juZqBZXns_"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-bold text-on-surface">{location.city}</span>
                </div>
                <p className="text-sm text-on-surface-variant">Heart of India, nestled between heritage and horizon.</p>
              </div>
            </div>
          </div>
          {/* Decorative Watermark */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[40rem]">filter_vintage</span>
          </div>
        </section>

        {/* Travel Modes Bento Grid */}
        <section className="px-6 py-16 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl text-on-surface mb-4">Arrival Points</h2>
              <p className="text-secondary font-medium italic">Recommended Gateways to the Festivities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {airports.slice(0, 3).map((airport, index) => (
                <div
                  key={airport.name}
                  className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(30,27,19,0.04)] flex flex-col hover:translate-y-[-4px] transition-transform duration-300 border border-outline-variant/5"
                >
                  <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {airportIcons[index] || "flight"}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl mb-2 text-on-surface">{airport.name}</h3>
                  <p className="text-on-surface-variant mb-6 text-sm flex-grow">{airport.description}</p>
                  <div className="border-t border-outline-variant/20 pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary font-semibold">
                        {index === 0 ? "Mode: Air + Rail" : index === 1 ? "Mode: Taxi/Rail" : "Mode: Road"}
                      </span>
                      <span className="text-primary font-bold">
                        {index === 0 ? "~4.5 Hours" : index === 1 ? "~2.5 Hours" : "~3 Hours"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Mile Section */}
        <section className="px-6 py-20 max-w-screen-xl mx-auto">
          <div className="bg-surface-container rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-xl border border-outline-variant/10">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="A vintage Indian train station platform at dusk"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1tXt6itkv_hSABbdQr4L2PQBXP_JEgpLfY9yYeEIkLccrSnES0HpkoPw7lKQ_K3ppzB0XZNiNP-7B4g8aTgQp9wGU4I72kDTMWB0BUC7bBS1xSWCBB2yIGQFz8jk3eo9oV7z4Hs72KHx4EKNV9G8ZfLGuzB2Me6g_NdtHID_GAMVJkOCsY02WkSW2XZKdh92i2ILfGtGyVEktK6HTNsvUKHgi6oYreepkpQtGhFrm0A4DL2-cfClorhICgny-HnMndr-Xo1-gX8O"
              />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20">
                <div className="text-primary font-bold text-xl">{location.trainStationDistance}</div>
                <div className="text-xs text-on-surface-variant uppercase tracking-widest">Station to Venue</div>
              </div>
            </div>
            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">train</span>
              <h2 className="font-headline text-4xl text-on-surface mb-6">{location.trainStationName}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                The Lalitpur Junction is the central artery for our wedding guests. Situated just **{location.trainStationDistance}** from
                the primary stay arrangements, it handles several premium trains daily.
              </p>
              <div className="space-y-4 text-on-surface-variant">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 opacity-80"></div>
                  <p className="text-sm leading-relaxed">Pre-arranged shuttle services will be available for all guests arriving at LAR.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 opacity-80"></div>
                  <p className="text-sm leading-relaxed">24/7 taxi desk specifically for our wedding party at the main exit.</p>
                </div>
              </div>
              <Link href="#" className="mt-10 inline-flex items-baseline gap-2 text-primary font-bold hover:gap-4 transition-all w-max group">
                View Detailed Rail Timings 
                <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform relative top-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Map & Coordination */}
        <section className="px-6 py-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <h3 className="font-headline text-3xl mb-4">Need Help Coordinating?</h3>
                <p className="text-on-surface-variant mb-6 text-lg leading-relaxed">
                  Our travel concierge is available 24/7 to assist with bookings or local transfers.
                </p>
                <div className="p-8 bg-surface-container-high rounded-3xl flex items-center gap-5 border border-outline-variant/10 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#af101a]/10 flex items-center justify-center text-[#af101a]">
                      <span className="material-symbols-outlined text-2xl">support_agent</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-1">Travel Concierge</div>
                    <div className="font-headline text-2xl text-on-surface">+91 98765 43210</div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 w-full bg-surface-container-low rounded-[3rem] h-[450px] overflow-hidden relative shadow-inner border border-outline-variant/10">
                <iframe 
                  src={location.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.3] contrast-[0.9] opacity-90 mix-blend-multiply transition-all duration-700 hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal"
                ></iframe>
                
                {/* Location Label Note - mostly covered by Google frame but keeping HTML structure */}
                <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow pointer-events-none hidden md:block">
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Lalitpur Coordination Hub</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
