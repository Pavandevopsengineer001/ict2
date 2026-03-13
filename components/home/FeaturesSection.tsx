'use client'

import { Zap, Shield, Smartphone, Sparkles, Cloud, Gauge } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools run directly in your browser with zero upload delays',
    gradient: 'from-primary to-primary/50',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your files never leave your device. Zero data collection, ever.',
    gradient: 'from-secondary to-orange-500',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Access tools from any device - desktop, tablet, or phone',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Sparkles,
    title: 'Always Free',
    description: 'Premium tools without premium pricing. Forever free to use.',
    gradient: 'from-secondary to-primary',
  },
  {
    icon: Cloud,
    title: 'No Installation',
    description: 'Use immediately. No downloads, accounts, or setup required.',
    gradient: 'from-primary via-secondary',
  },
  {
    icon: Gauge,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency. Minimal resource usage.',
    gradient: 'from-secondary to-orange-400',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-card/20">
      <div className="container-premium">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="gradient-text">Why Choose iConvertNow?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the perfect blend of speed, security, and simplicity. Built for professionals, by professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group card-premium p-6 space-y-4 overflow-hidden card-hover"
              >
                {/* Icon with gradient background */}
                <div className={`p-4 w-fit rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg shadow-${feature.gradient}/20 group-hover:shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
