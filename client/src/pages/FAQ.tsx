import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Getting Started',
      items: [
        {
          question: 'What is SoundWeave?',
          answer: 'SoundWeave is a platform that empowers independent artists to sell their music, collaborate with other creators, and connect directly with their audience through live radio streaming and community features.',
        },
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign In" button in the header and follow the authentication flow. You can sign up using your email or social media accounts.',
        },
        {
          question: 'Is there a cost to join SoundWeave?',
          answer: 'No, joining SoundWeave is completely free. You only pay when you purchase music or invest in collaboration projects.',
        },
      ],
    },
    {
      category: 'For Artists',
      items: [
        {
          question: 'How do I upload my music?',
          answer: 'After creating an artist account, go to your dashboard and click "Upload Music". You can add metadata, cover art, pricing, and more.',
        },
        {
          question: 'What is artist verification?',
          answer: 'Verification confirms you own the music you\'re selling. It requires ID verification and proof of music ownership. Verified artists get a badge and access to premium features.',
        },
        {
          question: 'How much do I earn from sales?',
          answer: 'You keep 85% of all sales revenue. SoundWeave takes a 15% platform fee to cover payment processing and platform maintenance.',
        },
        {
          question: 'Can I set my own prices?',
          answer: 'Yes! You have complete control over pricing for your tracks, albums, and merchandise.',
        },
        {
          question: 'What is a collaboration project?',
          answer: 'A collaboration project is a funding campaign where you set a goal and investors can fund your project in exchange for rewards. Smart contracts ensure transparent fund management.',
        },
      ],
    },
    {
      category: 'For Listeners',
      items: [
        {
          question: 'Is the radio stream free?',
          answer: 'Yes, our 24/7 radio stream is completely free. You can listen anytime without a subscription.',
        },
        {
          question: 'How do I purchase music?',
          answer: 'Browse the Music Library, click on a track, and click "Purchase". You\'ll be guided through a secure checkout process.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments through our blockchain integration.',
        },
        {
          question: 'Can I get refunds?',
          answer: 'Digital purchases are non-refundable, but if you experience technical issues, please contact our support team.',
        },
        {
          question: 'How do I invest in a collaboration project?',
          answer: 'Browse the Collab tab, find a project you want to support, select an investment tier, and complete checkout.',
        },
      ],
    },
    {
      category: 'Payments & Security',
      items: [
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, all payments are processed through secure, encrypted channels. We use industry-standard security protocols.',
        },
        {
          question: 'What is blockchain escrow?',
          answer: 'For collaboration projects, smart contracts hold funds in escrow. When the funding goal is met, funds are released to the artist. If not met, investments are returned.',
        },
        {
          question: 'How long does it take to receive earnings?',
          answer: 'Artists receive payouts monthly. Funds are transferred to your connected bank account or crypto wallet.',
        },
        {
          question: 'What are transaction fees?',
          answer: 'Artists pay a 15% platform fee. Listeners pay no fees on purchases - the price shown is the final price.',
        },
      ],
    },
    {
      category: 'Community & Support',
      items: [
        {
          question: 'How do I contact an artist?',
          answer: 'Use the messaging feature to send direct messages to artists. You can also join group chat rooms for specific genres or topics.',
        },
        {
          question: 'How do I report inappropriate content?',
          answer: 'Use the report button on any content or user profile. Our moderation team reviews all reports within 24 hours.',
        },
        {
          question: 'How can I get support?',
          answer: 'Visit our Contact page or email support@soundweave.com. Our team responds within 24 hours.',
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account anytime from your account settings. This action is permanent.',
        },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SoundWeave.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <Card
                          key={item.question}
                          className="overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                          >
                            <h3 className="font-semibold text-lg">{item.question}</h3>
                            <ChevronDown
                              className={`w-5 h-5 text-primary transition-transform ${
                                isOpen ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 border-t bg-muted/20">
                              <p className="text-muted-foreground">{item.answer}</p>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <a href="/contact" className="text-primary hover:text-primary/80 font-medium">
                Get in touch →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
