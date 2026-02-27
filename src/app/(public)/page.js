import Hero from "@/components/Hero/Hero";
import BrandMarquee from "@/components/BrandMarquee/BrandMarquee";
import Services from "@/components/Services/Services";
import Statement from "@/components/Statement/Statement";
import Portfolio from "@/components/Portfolio/Portfolio";
import TargetAudience from "@/components/TargetAudience/TargetAudience";
import About from "@/components/About/About";
import Testimonials from "@/components/Testimonials/Testimonials";
import FAQs from "@/components/FAQs/FAQs";
import ConsultationCTA from "@/components/ConsultationCTA/ConsultationCTA";

export default function Home() {
  return (
    <main>
      <div className="container">
        <Hero />
        <Statement />
        <BrandMarquee />
        <Portfolio />
        <TargetAudience />
        <Testimonials />
        <Services />
        <About />
        <FAQs />
        <ConsultationCTA />
      </div>
    </main>
  );
}
