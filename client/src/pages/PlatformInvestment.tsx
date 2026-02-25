import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, TrendingUp, Users, DollarSign, Zap, CheckCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export default function PlatformInvestment() {
  const { addItem } = useCart();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const investmentTiers = [
    {
      id: 'starter',
      name: 'Starter Investor',
      amount: 100,
      equity: 0.01,
      benefits: [
        'Direct stake in platform revenue',
        'Monthly investor reports',
        'Access to investor community',
        'Early access to new features',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Investor',
      amount: 500,
      equity: 0.05,
      benefits: [
        'All Starter benefits',
        'Quarterly strategy calls',
        'Custom analytics dashboard',
        'Priority support',
        'Voting rights on platform decisions',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Partner',
      amount: 5000,
      equity: 0.5,
      benefits: [
        'All Pro benefits',
        'Monthly executive briefings',
        'Custom partnership agreements',
        'Co-marketing opportunities',
        'Board observer status',
        'Dedicated account manager',
      ],
    },
  ];

  const handleInvest = (tier: typeof investmentTiers[0]) => {
    addItem({
      id: Math.random(),
      title: `SoundWeave Platform Investment - ${tier.name}`,
      artist: 'SoundWeave',
      price: tier.amount,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop',
      category: 'digital',
    });
    setSelectedTier(tier.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20">
          <div className="container">
            <Link href="/collab">
              <a className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Collaborations
              </a>
            </Link>

            <div className="max-w-3xl">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Zap className="w-4 h-4 inline mr-2" />
                Flagship Investment Opportunity
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Invest in <span className="gradient-text">SoundWeave Platform</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Own a stake in the future of independent music. Join creators and music enthusiasts in building the world's
                most artist-friendly platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Investors</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Raised</p>
                    <p className="text-2xl font-bold">R2.3M</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Growth</p>
                    <p className="text-2xl font-bold">+23%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Split Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Revenue Distribution Model</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6">How Your Investment Works</h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Purchase Investment Tier</p>
                      <p className="text-sm text-muted-foreground">Choose your investment amount and receive equity stake</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Earn Revenue Share</p>
                      <p className="text-sm text-muted-foreground">Receive 30% of platform revenue proportional to your stake</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Monthly Payouts</p>
                      <p className="text-sm text-muted-foreground">Receive automatic monthly distributions to your account</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Platform Growth</p>
                      <p className="text-sm text-muted-foreground">Benefit from platform appreciation and future exits</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
                  <h4 className="text-xl font-bold mb-6">Revenue Split Breakdown</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Platform Operations</span>
                        <span className="text-lg font-bold text-primary">70%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '70%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Infrastructure, development, marketing</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Investor Distribution</span>
                        <span className="text-lg font-bold text-accent">30%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div className="bg-accent h-full" style={{ width: '30%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Shared among all platform investors</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Example: If platform generates R100,000 monthly</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Platform Operations</span>
                        <span className="font-semibold">R70,000</span>
                      </div>
                      <div className="flex justify-between text-accent font-semibold">
                        <span>Investor Pool</span>
                        <span>R30,000</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Tiers */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Investment Tiers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {investmentTiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={`p-8 relative transition-all ${
                    tier.popular
                      ? 'border-2 border-primary md:scale-105 shadow-xl'
                      : 'border border-border hover:border-primary/50'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary">R{tier.amount}</div>
                    <p className="text-sm text-muted-foreground mt-2">{tier.equity}% equity stake</p>
                  </div>

                  <div className="space-y-3 mb-8 pb-8 border-b border-border">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleInvest(tier)}
                    className={`w-full ${
                      tier.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {selectedTier === tier.id ? 'Added to Cart' : 'Invest Now'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'When do I start receiving returns?',
                  a: 'Returns begin the month after your investment is processed. Monthly distributions are automatically sent to your registered account.',
                },
                {
                  q: 'Can I increase my investment later?',
                  a: 'Yes! You can purchase additional investment tiers at any time. Your equity stakes will be combined for distribution purposes.',
                },
                {
                  q: 'What happens if the platform grows?',
                  a: 'As the platform grows, your 30% share of revenues increases proportionally. You also benefit from potential future exits or acquisitions.',
                },
                {
                  q: 'Is my investment secure?',
                  a: 'Your investment is protected by smart contracts on the blockchain. All transactions are transparent and auditable.',
                },
                {
                  q: 'Can I withdraw my investment?',
                  a: 'Investments are long-term commitments. However, you can sell your stake to other investors on our secondary market.',
                },
              ].map((faq, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators and music enthusiasts building the future of independent music.
            </p>
            <Link href="/cart">
              <a>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
                  View Your Cart
                </Button>
              </a>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
