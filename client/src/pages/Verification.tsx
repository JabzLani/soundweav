import { CheckCircle, Upload, Clock, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Verification() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Your Information',
      description: 'Create an artist account and provide your basic information including name, email, and profile details.',
    },
    {
      icon: Upload,
      title: 'Upload Verification Documents',
      description: 'Provide a valid government-issued ID and proof of music ownership (copyright registration, publishing rights, or original recordings).',
    },
    {
      icon: Clock,
      title: 'Review Process',
      description: 'Our verification team reviews your submission within 2-5 business days. We may request additional information if needed.',
    },
    {
      icon: Award,
      title: 'Get Verified',
      description: 'Once approved, you\'ll receive a verification badge on your profile and unlock premium artist features.',
    },
  ];

  const benefits = [
    {
      title: 'Verified Badge',
      description: 'Display a verified badge on your profile to build trust with listeners.',
    },
    {
      title: 'Premium Analytics',
      description: 'Access detailed analytics about your listeners, sales, and engagement.',
    },
    {
      title: 'Direct Payments',
      description: 'Receive direct payments to your bank account or crypto wallet.',
    },
    {
      title: 'Collaboration Tools',
      description: 'Launch funding campaigns and collaboration projects with smart contract protection.',
    },
    {
      title: 'Featured Placement',
      description: 'Get featured in our artist spotlight and curated playlists.',
    },
    {
      title: 'Priority Support',
      description: 'Access priority customer support for any issues or questions.',
    },
  ];

  const requirements = [
    {
      title: 'Identity Verification',
      items: [
        'Valid government-issued ID (passport, driver\'s license, national ID)',
        'Clear photo of the ID document',
        'Photo of you holding the ID document',
      ],
    },
    {
      title: 'Music Ownership',
      items: [
        'Copyright registration or certificate',
        'Publishing rights documentation',
        'Original recording proof (metadata, production files)',
        'Distribution agreements from previous platforms',
      ],
    },
    {
      title: 'Account Information',
      items: [
        'Accurate artist name and bio',
        'Professional profile picture',
        'Links to other music platforms (Spotify, Apple Music, etc.)',
        'Social media presence (optional but helpful)',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Artist Verification</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get verified and unlock premium features to grow your music career on SoundWeave.
            </p>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Verification Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <Card className="p-6 h-full">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </Card>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Verification Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {requirements.map((req) => (
                <Card key={req.title} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{req.title}</h3>
                  <ul className="space-y-3">
                    {req.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Verified Artist Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6">
                  <CheckCircle className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">How long does verification take?</h3>
                <p className="text-muted-foreground">
                  Our verification process typically takes 2-5 business days. You'll receive an email notification once your account is verified.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">What if my verification is rejected?</h3>
                <p className="text-muted-foreground">
                  If your verification is rejected, we'll provide specific feedback on what needs to be corrected. You can resubmit your application with updated documents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Can I sell music without being verified?</h3>
                <p className="text-muted-foreground">
                  No, verification is required to upload and sell music on SoundWeave. This protects both artists and listeners by ensuring copyright compliance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Is there a fee for verification?</h3>
                <p className="text-muted-foreground">
                  No, artist verification is completely free. We only charge a 15% platform fee on sales.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">What if I don't have copyright registration?</h3>
                <p className="text-muted-foreground">
                  You can provide alternative proof of ownership such as original recording files, metadata, production documentation, or distribution agreements from other platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Verified?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your verification journey and unlock premium features to grow your music career.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Start Verification
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
