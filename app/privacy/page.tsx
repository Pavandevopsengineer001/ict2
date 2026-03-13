import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | iConvertNow',
  description: 'Privacy policy for iConvertNow online tools platform',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Data Processing</h2>
            <p>
              iConvertNow processes all data locally in your browser. No data is sent to our servers unless explicitly required for backend features.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. No Data Collection</h2>
            <p>
              We do not collect, store, or track your personal information. All tools run entirely on your device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Cookies</h2>
            <p>
              iConvertNow does not use tracking cookies. We may use functional cookies for user preferences only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Third-Party Services</h2>
            <p>
              We may use analytics services to understand site performance. These services operate under their own privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Changes to Privacy Policy</h2>
            <p>
              We may update this policy at any time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Contact</h2>
            <p>
              For privacy concerns, please contact us at support@iconvertnow.com
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
