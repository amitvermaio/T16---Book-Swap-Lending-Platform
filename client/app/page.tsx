import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import FeaturesGrid from "@/components/features-grid"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturesGrid />
      <CTASection />
      <Footer />
    </main>
  )
}
