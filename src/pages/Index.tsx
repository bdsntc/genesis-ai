import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GenesisFeed } from "@/components/GenesisFeed";
import { LaunchpadFlow } from "@/components/LaunchpadFlow";
import { SignalForm } from "@/components/SignalForm";
import { ProofSection } from "@/components/ProofSection";
import { TokenSection } from "@/components/TokenSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionsRef.current = document.querySelectorAll(".fade-in-section");
    sectionsRef.current.forEach((section) => observer.observe(section));

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => observer.unobserve(section));
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="fade-in-section">
          <GenesisFeed />
        </div>
        
        <div className="fade-in-section">
          <LaunchpadFlow />
        </div>
        
        <div className="fade-in-section">
          <SignalForm />
        </div>
        
        <div className="fade-in-section">
          <ProofSection />
        </div>
        
        <div className="fade-in-section">
          <TokenSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
