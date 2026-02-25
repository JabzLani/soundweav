import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      value: 'support@soundweave.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call our support team during business hours.',
      value: '+1 (555) 123-4567',
    },
    {
      icon: MapPin,
      title: 'Address',
      description: 'Visit our office in Cape Town, South Africa.',
      value: '123 Music Street, Cape Town, 8000',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card key={method.title} className="p-8 text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <p className="font-semibold text-foreground">{method.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">What is SoundWeave?</h3>
                <p className="text-muted-foreground">
                  SoundWeave is a platform that empowers independent artists to sell their music, collaborate with other creators, and connect directly with their audience through live radio streaming and community features.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">How long does it take to get verified as an artist?</h3>
                <p className="text-muted-foreground">
                  Our verification process typically takes 2-5 business days. You'll need to provide proof of identity and music ownership.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and cryptocurrency payments through our blockchain integration.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a href="/faq" className="text-primary hover:text-primary/80 font-medium">
                View all FAQs →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
