import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials"
import { SimulationPreview } from "@/components/simulation-preview"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <SimulationPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
