import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Zap, Target, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | iConvertNow',
  description: 'Learn about iConvertNow and our mission to provide free online tools for everyone',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About iConvertNow</h1>
              <p className="text-lg text-gray-300">
                We're building the web's most comprehensive collection of free online tools designed to simplify your workflow and save you time.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Mission */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  Our Mission
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  To provide free, fast, and secure online tools that empower developers, students, professionals, and everyday users to accomplish their tasks efficiently. We believe powerful utilities should be accessible to everyone, without barriers, subscriptions, or compromises on privacy.
                </p>
              </div>

              {/* Values */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <Code className="w-8 h-8 text-primary" />
                  Our Values
                </h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span><strong>Privacy First:</strong> All data processing happens locally in your browser. Your information is never sent to servers.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span><strong>Completely Free:</strong> No freemium models, no ads, no hidden costs. All tools are always free.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span><strong>Fast & Reliable:</strong> Optimized for speed and performance across all devices.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span><strong>User-Focused:</strong> Built with user experience at the forefront of every decision.</span>
                  </li>
                </ul>
              </div>

              {/* Growing Collection */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary" />
                  Growing Collection
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We started with a collection of 24 essential tools and continue to expand. Currently offering:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> JSON Formatter & Validator
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> Text Analysis Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> Image Processing Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> Encoding/Decoding Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> Calculators & Converters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">→</span> Developer Utilities
                  </li>
                </ul>
              </div>

              {/* Future Roadmap */}
              <div className="card-glass p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">What&apos;s Coming Next</h2>
                <p className="text-gray-300 mb-4">
                  We&apos;re constantly working to expand our offerings. Planned additions include:
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Advanced file conversion tools (PDF, Documents, Audio, Video)</li>
                  <li>• AI-powered text and image processing</li>
                  <li>• Batch processing capabilities</li>
                  <li>• Cloud storage integration</li>
                  <li>• Offline mode support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
