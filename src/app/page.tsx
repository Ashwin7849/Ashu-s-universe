import { Header } from "@/components/shared/header";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { AppsSection } from "@/components/home/apps-section";
import { GetInTouchSection } from "@/components/home/get-in-touch-section";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AppsSection />
        <GetInTouchSection />
      </main>
      <Footer />
    </div>
  );
}
