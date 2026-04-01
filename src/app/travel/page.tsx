"use client";

import Footer from "@/components/Footer";
import { weddingConfig } from "@/config/weddingConfig";
import Link from "next/link";

export default function TravelPage() {
  const { location } = weddingConfig;

  const trainHubs = [
    {
      name: "Delhi / NCR",
      description:
        "Best overall option for most guests. Direct premium trains connect comfortably into Lalitpur Junction.",
      trains: [
        "Hazrat Nizamuddin - Khajuraho Vande Bharat Express (22470) ~ 5h 35m",
        "New Delhi - Rani Kamalapati Shatabdi Express (12002) ~ 5h 42m",
        "Sachkhand Express (12716) ~ 6h 56m",
      ],
    },
    {
      name: "Bhopal",
      description:
        "A convenient short rail journey if you are arriving via Raja Bhoj Airport or traveling from central Madhya Pradesh.",
      trains: [
        "Rani Kamalapati - New Delhi Shatabdi Express (12001) ~ 2h 11m",
        "Sachkhand Express (12715) ~ 2h 31m",
        "Mumbai LTT - Sitapur Superfast Express (12107) ~ 2h 26m",
      ],
    },
    {
      name: "Gwalior",
      description:
        "Useful as a regional rail gateway if you prefer breaking the journey before entering Bundelkhand.",
      trains: [
        "New Delhi - Rani Kamalapati Shatabdi Express (12002) ~ 2h 14m",
        "Hazrat Nizamuddin - Khajuraho Vande Bharat Express (22470) ~ 2h 25m",
        "Punjab Mail (12138) ~ 3h 04m",
      ],
    },
  ];

  const roadRoutes = [
    {
      name: "Delhi / NCR",
      distance: "~519 km",
      duration: "~7 hr 15 min",
      route: "Primarily NH44 via the Gwalior - Jhansi - Talbehat corridor into Lalitpur.",
    },
    {
      name: "Bhopal",
      distance: "~233 km",
      duration: "~3 hr 39 min",
      route: "NH146 toward the Sagar side, then NH44 north into Lalitpur.",
    },
    {
      name: "Gwalior",
      distance: "~196 km",
      duration: "~2 hr 56 min",
      route: "NH44 southbound via Jhansi and Talbehat toward Lalitpur.",
    },
  ];

  const cityRoutes = trainHubs.map((hub) => ({
    ...hub,
    roadway: roadRoutes.find((route) => route.name === hub.name),
  }));

  const attractions = [
    {
      name: "Deogarh Temple Complex",
      desc: "A single heritage stop that covers both the famous Dashavatara Temple and the historic Jain temple cluster inside Deogarh Fort.",
      distance: "~30 km from Lalitpur",
      mapLinks: [
        {
          label: "Dashavatara Temple",
          url: "https://www.google.com/maps/search/?api=1&query=Dashavatara+Temple+Deogarh+Lalitpur",
        },
        {
          label: "Jain Temple Complex",
          url: "https://www.google.com/maps/search/?api=1&query=Jain+Temple+Deogarh+Lalitpur",
        },
      ],
    },
    {
      name: "Matatila & Rajghat Dams",
      desc: "Beautiful, vast reservoirs built across the Betwa River. These spots offer incredibly scenic and serene views perfect for a tranquil evening.",
      distance: "~40 km from Lalitpur",
      mapLinks: [
        {
          label: "Matatila Dam",
          url: "https://www.google.com/maps/search/?api=1&query=Matatila+Dam+Lalitpur",
        },
        {
          label: "Rajghat Dam",
          url: "https://www.google.com/maps/search/?api=1&query=Rajghat+Dam+Lalitpur",
        },
      ],
    },
    {
      name: "Talbehat Fort",
      desc: "A historic 17th-century Bundelkhandi fort strategically positioned on the highway, bearing witness to the rich regional history of Uttar Pradesh.",
      distance: "~40 km from Lalitpur",
      mapLinks: [
        {
          label: "Open Map",
          url: "https://www.google.com/maps/search/?api=1&query=Talbehat+Fort+Lalitpur",
        },
      ],
    },
    {
      name: "Chanderi",
      desc: "A charming historic town famous for its hand-woven Chanderi silk sarees, striking forts, and majestic medieval architecture.",
      distance: "~35 km from Lalitpur",
      mapLinks: [
        {
          label: "Open Map",
          url: "https://www.google.com/maps/search/?api=1&query=Chanderi+Madhya+Pradesh",
        },
      ],
    },
    {
      name: "Jakhlaun Pump Canal",
      desc: "Enjoy serene evening strolls by the Betwa river waters at the scenic Jakhlaun Pump Canal and its surrounding park area.",
      distance: "~24 km from Lalitpur",
      mapLinks: [
        {
          label: "Open Map",
          url: "https://www.google.com/maps/search/?api=1&query=Jakhlaun+Lalitpur",
        },
      ],
    },
    {
      name: "Govind Sagar Dam & Parks",
      desc: "For local relaxation within city limits, visit the beautiful Govind Sagar Dam or take a quiet evening walk through the parks in Civil Lines.",
      distance: "Local (Lalitpur)",
      mapLinks: [
        {
          label: "Open Map",
          url: "https://www.google.com/maps/search/?api=1&query=Govind+Sagar+Dam+Lalitpur",
        },
      ],
    },
  ];

  return (
    <>
      <main className="bg-[#FCFAF8] pb-24 pt-28 text-[#2C1E16] font-body selection:bg-[#E8DCC4] selection:text-[#8A252C] md:pt-32">
        <div className="fixed inset-0 z-0 hidden pointer-events-none lg:block">
          <div className="absolute bottom-0 left-12 top-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute bottom-0 right-12 top-0 w-px bg-[#E8DCC4]/50"></div>
        </div>

        <header className="relative z-10 px-6 md:px-12">
          <div className="mx-auto max-w-screen-xl border-b border-[#E8DCC4] pb-16">
            <p className="font-plus-jakarta text-xs uppercase tracking-[0.4em] text-[#8F4E00]">
              Destination: {location.city.split(",")[0]}
            </p>
            <div className="mt-6 flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <h1 className="font-noto-serif text-5xl leading-[1.1] tracking-[-0.02em] text-[#8A252C] md:text-7xl lg:text-8xl">
                  Getting to the <br /> Heart of Bundelkhand.
                </h1>
                <p className="mt-8 max-w-2xl text-lg font-light leading-[1.8] text-[#2C1E16]/80 font-plus-jakarta">
                  Lalitpur is a historic city in the Bundelkhand region of Uttar
                  Pradesh, nestled elegantly between heritage and the horizon. We
                  have added the most useful train names and key road corridors so
                  travel planning feels straightforward.
                </p>
              </div>

              <div className="min-w-[300px] rounded-2xl border border-[#E8DCC4] bg-[#F5EFE6] p-8">
                <div className="mb-4 flex items-center gap-4 border-b border-[#E8DCC4] pb-4">
                  <span
                    className="material-symbols-outlined text-[#8A252C]"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    train
                  </span>
                  <div>
                    <p className="font-plus-jakarta text-[10px] uppercase tracking-[0.28em] text-[#8A252C]">
                      Primary Hub
                    </p>
                    <p className="font-noto-serif text-lg text-[#2C1E16]">
                      {location.trainStationName}
                    </p>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 border-b border-[#E8DCC4] pb-4">
                  <span
                    className="material-symbols-outlined text-[#8A252C]"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    place
                  </span>
                  <div>
                    <p className="font-plus-jakarta text-[10px] uppercase tracking-[0.28em] text-[#8A252C]">
                      The Venue
                    </p>
                    <p className="font-noto-serif text-lg text-[#2C1E16]">
                      {location.weddingVenue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="material-symbols-outlined text-[#8A252C]"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    map
                  </span>
                  <div>
                    <p className="font-plus-jakarta text-[10px] uppercase tracking-[0.28em] text-[#8A252C]">
                      Distance
                    </p>
                    <p className="font-noto-serif text-lg text-[#2C1E16]">
                      {location.trainStationDistance} from Station
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative z-10 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-12">
              <h2 className="font-noto-serif text-4xl tracking-tight text-[#8A252C]">
                How to Reach
              </h2>
              <div className="my-4 h-px w-16 bg-[#E8DCC4]"></div>
              <p className="max-w-2xl font-plus-jakarta font-light text-[#2C1E16]/70">
                Each city card below includes the train options we recommend
                first, followed by roadway distance and NH guidance in the same
                block.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {cityRoutes.map((hub) => (
                <div
                  key={hub.name}
                  className="flex flex-col rounded-2xl border border-[#E8DCC4] bg-transparent p-8 transition-colors duration-500 hover:bg-[#F5EFE6]"
                >
                  <div className="mb-6 text-[#8F4E00]">
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'wght' 200" }}
                    >
                      train
                    </span>
                  </div>
                  <h3 className="mb-3 font-noto-serif text-2xl text-[#2C1E16]">
                    {hub.name}
                  </h3>
                  <p className="mb-6 flex-grow text-sm font-light leading-[1.8] text-[#2C1E16]/80 font-plus-jakarta">
                    {hub.description}
                  </p>
                  <div className="mt-auto border-t border-[#E8DCC4] pt-5">
                    <p className="mb-3 font-plus-jakarta text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A252C]">
                      By Train (Recommended)
                    </p>
                    <ul className="space-y-3">
                      {hub.trains.map((train) => (
                        <li
                          key={train}
                          className="flex items-start gap-2 text-sm leading-7 text-[#2C1E16] font-plus-jakarta"
                        >
                          <span
                            className="material-symbols-outlined text-[14px] text-[#8F4E00]"
                            style={{ fontVariationSettings: "'wght' 200" }}
                          >
                            arrow_right_alt
                          </span>
                          <span>{train}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {hub.roadway ? (
                    <div className="mt-8 border-t border-[#E8DCC4] pt-5">
                      <p className="mb-3 font-plus-jakarta text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A252C]">
                        By Roadways
                      </p>
                      <div className="space-y-4 text-sm font-plus-jakarta text-[#2C1E16]">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8F4E00]">
                            Distance
                          </p>
                          <p className="mt-1">{hub.roadway.distance}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8F4E00]">
                            Drive Time
                          </p>
                          <p className="mt-1">{hub.roadway.duration}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8F4E00]">
                            NH Information
                          </p>
                          <p className="mt-1 leading-[1.8] text-[#2C1E16]/80">
                            {hub.roadway.route}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-[#E8DCC4] bg-[#F5EFE6] px-6 py-24 md:px-12">
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-16 text-center">
              <span className="mb-4 block font-plus-jakarta text-xs uppercase tracking-[0.4em] text-[#8F4E00]">
                Extend Your Stay
              </span>
              <h3 className="mb-6 font-noto-serif text-4xl tracking-tight text-[#8A252C] lg:text-5xl">
                Explore Historic Bundelkhand
              </h3>
              <p className="mx-auto max-w-2xl font-plus-jakarta font-light leading-[1.8] text-[#2C1E16]/80">
                Lalitpur is a gateway to ancient empires, pristine Betwa river
                valleys, and monumental 6th-century rock-cut architecture. Take a
                moment to breathe in the heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
              {attractions.map((item, i) => (
                <div key={item.name} className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#E8DCC4] bg-[#FCFAF8] font-noto-serif text-lg text-[#8A252C] sm:flex">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="mb-3 font-noto-serif text-2xl text-[#2C1E16]">
                      {item.name}
                    </h4>
                    <p className="mb-4 text-sm font-light leading-[1.8] text-[#2C1E16]/80 font-plus-jakarta">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC4] bg-[#FCFAF8] px-3 py-1.5 font-plus-jakarta text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F4E00]">
                        {item.distance}
                      </span>
                      {item.mapLinks.map((mapLink) => (
                        <a
                          key={mapLink.url}
                          href={mapLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC4] bg-transparent px-3 py-1.5 font-plus-jakarta text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A252C] transition-colors duration-300 hover:bg-[#FCFAF8]"
                        >
                          {mapLink.label}
                          <span
                            className="material-symbols-outlined text-[14px]"
                            style={{ fontVariationSettings: "'wght' 200" }}
                          >
                            north_east
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-screen-xl text-center">
            <h3 className="mb-12 font-noto-serif text-4xl tracking-tight text-[#8A252C]">
              The Wedding Venue
            </h3>

            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-[#E8DCC4] bg-[#F5EFE6] shadow-[0_20px_40px_rgba(44,30,22,0.02)]">
              <iframe
                src={location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.4] opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                title="Wedding venue map"
              ></iframe>
            </div>

            <div className="mt-16 flex flex-col items-center">
              <p className="mb-6 font-plus-jakarta text-xs uppercase tracking-[0.4em] text-[#8F4E00]">
                Next Step
              </p>
              <Link
                href="/rsvp"
                className="inline-flex items-center gap-3 rounded-full bg-[#8A252C] px-10 py-5 font-plus-jakarta text-xs font-semibold uppercase tracking-[0.25em] text-[#FCFAF8] shadow-[0_10px_30px_rgba(138,37,44,0.15)] outline-none transition-all duration-300 hover:scale-105 hover:bg-[#6A1A20] focus:ring focus:ring-[#8A252C]/20"
              >
                Send Us Your RSVP
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  favorite
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
