import { Upload, Music, ShoppingCart, Award, Zap, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HowItWorks() {
  const artistSteps = [
    {
      icon: Upload,
      title: 'Upload Your Music',
      description: 'Create an artist account and upload your tracks with metadata, cover art, and pricing information.',
    },
    {
      icon: Music,
      title: 'Set Your Prices',
      description: 'Control how much you charge for downloads, streams, and exclusive content. Keep 85% of all sales.',
    },
    {
      icon: Award,
      title: 'Get Verified',
      description: 'Complete our verification process to unlock premium features and build trust with your audience.',
    },
    {
      icon: Zap,
      title: 'Launch Collaborations',
      description: 'Create funding projects for new albums, tours, or collaborations with smart contract escrow.',
    },
  ];

  const listenerSteps = [
    {
      icon: Music,
      title: 'Discover Music',
      description: 'Browse our curated collection of independent artists across all genres on our 24/7 radio stream.',
    },
    {
      icon: ShoppingCart,
      title: 'Support Artists',
      description: 'Purchase tracks, merchandise, or invest in collaboration projects. Your money goes directly to creators.',
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      description: 'All payments are protected with blockchain-based escrow and transparent smart contracts.',
    },
    {
      icon: Award,
      title: 'Exclusive Benefits',
      description: 'Get access to exclusive content, early releases, and direct communication with your favorite artists.',
    },
  ];

  const features = [
    {
      title: 'Live Radio Streaming',
      description: 'Listen to our 24/7 curated radio station featuring independent artists from around the world.',
    },
    {
      title: 'Direct Artist Support',
      description: 'Every purchase goes directly to the artist. No middlemen, no unnecessary fees.',
    },
    {
      title: 'Smart Contract Escrow',
      description: 'Collaboration funding uses blockchain smart contracts to ensure transparent fund management.',
    },
    {
      title: 'Artist Verification',
      description: 'Verified artists get a badge and access to premium tools and analytics.',
    },
    {
      title: 'Community Messaging',
      description: 'Direct messaging and group chats connect artists with fans and other creators.',
    },
    {
      title: 'Transparent Analytics',
      description: 'Artists get detailed insights into plays, sales, and listener demographics.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How SoundWeave Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent platform connecting independent artists with their audience.
            </p>
          </div>
        </section>

        {/* For Artists */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">For Independent Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {artistSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <Card className="p-6 h-full">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                    {index < artistSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* For Listeners */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">For Music Fans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {listenerSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <Card className="p-6 h-full">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Icon className="w-12 h-12 text-secondary mb-4" />
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                    {index < listenerSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-secondary/20" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Model */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Transparent Pricing</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">Artist Earnings</h3>
                <p className="text-muted-foreground mb-4">
                  Artists keep 85% of all sales revenue. SoundWeave takes a 15% platform fee to cover payment processing, hosting, and platform maintenance.
                </p>
                <div className="bg-muted p-4 rounded">
                  <p className="text-sm"><strong>Example:</strong> A $10 track sale = $8.50 to artist, $1.50 to SoundWeave</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">Listener Costs</h3>
                <p className="text-muted-foreground mb-4">
                  No subscription required to listen to our radio stream. Purchase individual tracks or invest in projects at artist-set prices.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">Collaboration Funding</h3>
                <p className="text-muted-foreground mb-4">
                  When a collaboration project reaches its funding goal, funds are released to the artist. If the goal isn't met, all investments are returned.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of independent artists and music fans on SoundWeave today.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Create Your Account
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
