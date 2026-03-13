'use client'

import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-300 mb-12">
                Have a question or suggestion? We&apos;d love to hear from you. Reach out anytime!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card-glass p-6 rounded-lg text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Email</h3>
                  <a href="mailto:support@iconvertnow.com" className="text-gray-400 hover:text-primary transition-colors">
                    support@iconvertnow.com
                  </a>
                </div>

                <div className="card-glass p-6 rounded-lg text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Support</h3>
                  <p className="text-gray-400">
                    Available via email
                  </p>
                </div>

                <div className="card-glass p-6 rounded-lg text-center">
                  <div className="w-8 h-8 text-primary mx-auto mb-3">🌐</div>
                  <h3 className="font-semibold text-white mb-2">Online</h3>
                  <p className="text-gray-400">
                    24/7 availability
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="card-glass p-8 rounded-lg space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500 resize-none"
                    required
                  />
                </div>

                {submitted && (
                  <div className="p-4 bg-accent/10 border border-accent/50 rounded-lg text-accent">
                    Thank you! We&apos;ll get back to you soon.
                  </div>
                )}

                <Button
                  type="submit"
                  className="gradient-btn text-white border-0 w-full"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
