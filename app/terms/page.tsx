import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | iConvertNow',
  description: 'Terms of service for iConvertNow online tools platform',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="space-y-8 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using iConvertNow, you accept and agree to be bound by the terms of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information, tools, software) from iConvertNow for personal use only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Disclaimer</h2>
            <p>
              The materials on iConvertNow are provided on an &apos;as is&apos; basis. iConvertNow makes no warranties, expressed or implied, and hereby disclaims and negates all warranties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Limitations</h2>
            <p>
              In no event shall iConvertNow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on iConvertNow could include technical, typographical, or photographic errors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Links</h2>
            <p>
              iConvertNow has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Modifications</h2>
            <p>
              iConvertNow may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
