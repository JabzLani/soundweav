import { Music, Users, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const values = [
    {
      icon: Music,
      title: 'Artist Empowerment',
      description: 'We believe independent artists deserve direct access to their audience and fair compensation for their work.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a vibrant community where fans and creators connect, collaborate, and support each other.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology including blockchain and smart contracts for transparent transactions.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting independent artists with listeners worldwide, breaking down geographical barriers.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Music industry veteran with 15+ years of experience',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      bio: 'Blockchain and Web3 expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Community',
      bio: 'Artist relations and community building specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About SoundWeave</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing the music industry by empowering independent artists and connecting them directly with their audience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              SoundWeave is dedicated to democratizing the music industry. We provide independent artists with the tools, platform, and community they need to create, distribute, and monetize their music on their own terms.
            </p>
            <p className="text-lg text-muted-foreground">
              By combining live radio streaming, e-commerce capabilities, and blockchain-based collaboration funding, we're creating a new paradigm where artists retain control of their work and receive fair compensation directly from their supporters.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="p-6">
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden text-center">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <p className="text-muted-foreground">Independent Artists</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Active Listeners</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$2M+</div>
                <p className="text-muted-foreground">Distributed to Artists</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Live Radio Stream</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Join the SoundWeave Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an artist ready to share your music or a fan supporting independent creators, SoundWeave is the platform for you.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
