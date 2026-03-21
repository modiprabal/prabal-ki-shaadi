import HeroSection from "@/components/HeroSection";
import EventsPreview from "@/components/EventsPreview";
import VenueSection from "@/components/VenueSection";
import RsvpCTA from "@/components/RsvpCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <EventsPreview />
      <VenueSection />
      <RsvpCTA />
      <Footer />
    </main>
  );
}
