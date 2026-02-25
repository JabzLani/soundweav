import { Link } from 'wouter';
import { Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RadioPlayer from '@/components/RadioPlayer';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  // Mock data for featured content
  const featuredArtist = {
    id: 1,
    name: 'Luna Echo',
    genre: 'Electronic',
    bio: 'Pioneering electronic artist blending ambient and techno.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    profileUrl: '/artists/1',
  };

  const latestTracks = [
    {
      id: 1,
      title: 'Neon Dreams',
      artist: 'Luna Echo',
      duration: '3:45',
      plays: 12500,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Midnight Waves',
      artist: 'Sonic Pulse',
      duration: '4:12',
      plays: 8900,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Crystal Horizon',
      artist: 'Echo Dreams',
      duration: '3:28',
      plays: 6700,
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Stellar Vibes',
      artist: 'Cosmic Sound',
      duration: '3:55',
      plays: 5400,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    },
  ];

  const topCharts = [
    { rank: 1, title: 'Echoes of Tomorrow', artist: 'Luna Echo', plays: 45000 },
    { rank: 2, title: 'Digital Sunrise', artist: 'Sonic Pulse', plays: 38000 },
    { rank: 3, title: 'Cosmic Journey', artist: 'Echo Dreams', plays: 32000 },
    { rank: 4, title: 'Neon Lights', artist: 'Stellar Sound', plays: 28000 },
    { rank: 5, title: 'Midnight Echo', artist: 'Luna Echo', plays: 25000 },
  ];



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Radio Player */}
        <section className="hero-gradient py-12 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Radio Player */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    <span className="gradient-text">SoundWeave Radio</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Discover independent music, collaborate with artists, and support creators directly.
                  </p>
                </div>

                {/* Radio Player */}
                <RadioPlayer
                  title="SoundWeave Radio"
                  artist="Live Stream"
                  showNowPlaying={true}
                />

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore Music
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="hidden md:flex justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 flex items-center justify-center">
                    <div className="text-6xl">♪</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artist */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Featured Independent Artist</h2>
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 h-64 md:h-auto">
                  <img
                    src={featuredArtist.image}
                    alt={featuredArtist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                  <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium w-fit mb-4">
                    {featuredArtist.genre}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{featuredArtist.name}</h3>
                  <p className="text-muted-foreground mb-6">{featuredArtist.bio}</p>
                  <div className="flex gap-3">
                    <Link href={featuredArtist.profileUrl}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline">Listen Now</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Latest Tracks */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest Tracks</h2>
              <Link href="/music" className="text-primary hover:text-primary/80 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestTracks.map((track) => (
                <Card key={track.id} className="overflow-hidden card-hover">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-2 right-2 player-button w-12 h-12 opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold truncate">{track.title}</h4>
                    <p className="text-sm text-muted-foreground truncate mb-3">{track.artist}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{track.duration}</span>
                      <span>{track.plays.toLocaleString()} plays</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top 20 Chart */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Top 20 Chart</h2>
              <Link href="/charts" className="text-primary hover:text-primary/80 font-medium">
                View Full Chart →
              </Link>
            </div>
            <Card className="overflow-hidden">
              <div className="divide-y">
                {topCharts.map((track) => (
                  <div key={track.rank} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-2xl font-bold text-primary/50 w-8">{track.rank}</span>
                      <div className="flex-1">
                        <h4 className="font-bold">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{track.plays.toLocaleString()} plays</span>
                      <button className="player-button w-10 h-10">
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join SoundWeave?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an artist looking to sell your music or a fan supporting independent creators, SoundWeave is your platform.
            </p>
            {!isAuthenticated && (
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
