import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { PopularToolsSection } from '@/components/home/PopularToolsSection'

export const metadata: Metadata = {
  title: 'iConvertNow - All-in-One Online Tools',
  description: 'Convert files, format data, resize images, and simplify your workflow with free online tools. Fast, secure, and no installation required.',
  keywords: ['online tools', 'file converter', 'free tools', 'JSON formatter', 'image resizer'],
  openGraph: {
    title: 'iConvertNow - All-in-One Online Tools',
    description: 'Convert files, format data, and simplify your workflow with free online tools.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <PopularToolsSection />
      </main>
      <Footer />
    </div>
  )
}
