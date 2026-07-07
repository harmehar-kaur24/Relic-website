import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RelicsSection from "@/components/RelicsSection";
import LineageSection from "@/components/LineageSection";
import ScheduleSection from "@/components/ScheduleSection";
import HostSevaSection from "@/components/HostSevaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <Header />
      <SectionNav />
      <main className="flex-1">
        <Hero />
        <RelicsSection />
        <LineageSection />
        <ScheduleSection />
        <HostSevaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
