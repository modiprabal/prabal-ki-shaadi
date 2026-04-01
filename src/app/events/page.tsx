import Footer from "@/components/Footer";
import { weddingConfig } from "@/config/weddingConfig";
import Link from "next/link";

type WeddingEvent = (typeof weddingConfig.events)[number];

function groupEventsByDate(events: WeddingEvent[]) {
  return events.reduce<Record<string, WeddingEvent[]>>((groups, event) => {
    const existingEvents = groups[event.date] ?? [];
    groups[event.date] = [...existingEvents, event];
    return groups;
  }, {});
}

export default function EventsTimeline() {
  const { events, location, dates } = weddingConfig;
  const cityName = location.city.split(",")[0];
  const eventsByDate = groupEventsByDate(events);
  const itineraryDays = Object.entries(eventsByDate);

  return (
    <>
      <main className="bg-[#FCFAF8] pb-20 pt-28 md:pt-32 text-[#2C1E16] font-body selection:bg-[#E8DCC4] selection:text-[#8A252C]">
        <header className="px-6 md:px-10">
          <div className="mx-auto max-w-screen-xl border-b border-[#E8DCC4] pb-16">
            <p className="font-plus-jakarta text-xs uppercase tracking-[0.4em] text-[#8F4E00]">
              Wedding Itinerary
            </p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl font-noto-serif text-5xl leading-[1.02] tracking-[-0.02em] text-[#8A252C] md:text-7xl lg:text-8xl">
                  The celebrations.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-[#2C1E16]/80 font-plus-jakarta font-light">
                  Every ceremony is grouped day by day so guests can read the
                  flow quickly, plan their outfits, and know exactly where the
                  wedding weekend moves next.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DCC4] bg-[#F5EFE6] p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-[#8A252C] font-plus-jakarta">
                  At A Glance
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8F4E00]">
                      Dates
                    </p>
                    <p className="mt-2 font-noto-serif text-2xl text-[#2C1E16]">
                      {dates.checkInDate} onwards
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8F4E00]">
                      Venue
                    </p>
                    <p className="mt-2 font-noto-serif text-2xl text-[#2C1E16]">
                      {location.weddingVenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8F4E00]">
                      City
                    </p>
                    <p className="mt-2 font-noto-serif text-2xl text-[#2C1E16]">
                      {cityName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 pt-14 md:px-10 md:pt-20">
          <div className="mx-auto max-w-screen-xl space-y-16">
            {itineraryDays.map(([date, dayEvents], dayIndex) => (
              <section
                key={date}
                className="grid gap-8 border-t border-[#E8DCC4] pt-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="text-xs uppercase tracking-[0.34em] text-[#8A252C] font-plus-jakarta">
                    Day {dayIndex + 1}
                  </p>
                  <h2 className="mt-3 font-noto-serif text-4xl tracking-tight text-[#2C1E16] md:text-5xl">
                    {date}
                  </h2>
                  <p className="mt-5 max-w-sm text-base leading-7 text-[#2C1E16]/70 font-plus-jakarta font-light">
                    {dayEvents.length} ceremonies at {location.weddingVenue}.
                    Each block below gives you the timing, venue, and mood for
                    the moment.
                  </p>
                </div>

                <div className="space-y-6">
                  {dayEvents.map((event, index) => (
                    <article
                      key={event.title}
                      className="rounded-2xl border border-[#E8DCC4] bg-transparent p-6 md:p-8 transition-colors duration-500 hover:bg-[#F5EFE6]"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-2xl">
                          <div className="flex items-center gap-4">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DCC4] bg-[#FCFAF8] font-plus-jakarta text-xs font-semibold uppercase tracking-[0.14em] text-[#8F4E00]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-xs uppercase tracking-[0.28em] text-[#8A252C] font-plus-jakarta">
                              Ceremony
                            </p>
                          </div>
                          <h3 className="mt-4 font-noto-serif text-3xl leading-tight text-[#2C1E16] md:text-4xl">
                            {event.title}
                          </h3>
                          <p className="mt-4 text-base leading-7 text-[#2C1E16]/80 font-plus-jakarta font-light">
                            {event.description}
                          </p>
                        </div>

                        <div className="min-w-[12rem] rounded-xl border border-[#E8DCC4] bg-[#FCFAF8] px-5 py-4 md:text-right md:border-none md:bg-transparent md:px-0">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8F4E00] font-plus-jakarta">
                            Time
                          </p>
                          <p className="mt-2 font-noto-serif text-2xl text-[#2C1E16]">
                            {event.time}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 grid gap-4 border-t border-[#E8DCC4] pt-5 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8A252C] font-plus-jakarta">
                            Venue
                          </p>
                          <p className="mt-2 text-sm text-[#2C1E16] font-noto-serif italic">
                            {event.venue}
                          </p>
                        </div>

                        <a
                          href={event.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-plus-jakarta text-xs font-semibold uppercase tracking-[0.22em] text-[#8F4E00] transition-all duration-300 hover:gap-3 opacity-90 hover:opacity-100"
                        >
                          Venue Map
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 200" }}>arrow_right_alt</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="px-6 pt-24 md:px-10 md:pt-32">
          <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#E8DCC4] bg-[#F5EFE6] p-10 lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8F4E00] font-plus-jakarta">
                Venue & Flow
              </p>
              <h3 className="mt-4 font-noto-serif text-3xl tracking-tight md:text-4xl text-[#8A252C]">
                All celebrations are centered at {location.weddingVenue}.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-[#2C1E16]/80 font-plus-jakarta font-light">
                We have designed all our ceremonies to flow seamlessly in one beautiful location for your comfort. For detailed travel arrangements, lodging, and local movement around {cityName}, please review our travel guide.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8DCC4] bg-transparent p-10 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8A252C] font-plus-jakarta mb-6 text-center">
                Next Steps
              </p>
              <div className="space-y-4">
                <Link
                  href="/travel"
                  className="flex items-center justify-between rounded-xl border border-[#E8DCC4] bg-[#FCFAF8] px-6 py-4 font-plus-jakarta text-xs font-semibold uppercase tracking-[0.22em] text-[#2C1E16] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#F5EFE6]"
                >
                  Travel Guide
                  <span className="material-symbols-outlined text-sm text-[#8A252C]" style={{ fontVariationSettings: "'wght' 200" }}>arrow_right_alt</span>
                </Link>
                <Link
                  href="/rsvp"
                  className="flex items-center justify-between rounded-xl bg-[#8A252C] border border-[#8A252C] px-6 py-4 font-plus-jakarta text-xs font-semibold uppercase tracking-[0.22em] text-[#FCFAF8] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6A1A20]"
                >
                  Send RSVP
                  <span className="material-symbols-outlined text-sm text-[#FCFAF8]" style={{ fontVariationSettings: "'wght' 200" }}>arrow_right_alt</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
