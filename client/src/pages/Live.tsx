import { useState } from 'react';
import { Play, Calendar, Users, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Live() {
  const [isStreamLive, setIsStreamLive] = useState(true);

  const liveEvents = [
    {
      id: 1,
      title: 'Luna Echo - Live Session',
      artist: 'Luna Echo',
      startTime: '2024-01-20 20:00',
      duration: '1 hour',
      listeners: 2450,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Sonic Pulse - DJ Set',
      artist: 'Sonic Pulse',
      startTime: '2024-01-21 19:30',
      duration: '2 hours',
      listeners: 1820,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Echo Dreams - Ambient Performance',
      artist: 'Echo Dreams',
      startTime: '2024-01-22 21:00',
      duration: '90 minutes',
      listeners: 890,
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=300&fit=crop',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'How to Get Your Music on SoundWeave',
      author: 'SoundWeave Team',
      date: '2024-01-15',
      excerpt: 'A comprehensive guide for independent artists to upload and promote their music on our platform.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'The Future of Independent Music',
      author: 'Music Industry Expert',
      date: '2024-01-12',
      excerpt: 'Exploring how blockchain and direct artist-fan relationships are revolutionizing the music industry.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Artist Spotlight: Luna Echo',
      author: 'SoundWeave Curator',
      date: '2024-01-10',
      excerpt: 'Meet Luna Echo, an innovative electronic artist pushing the boundaries of ambient and techno fusion.',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
      readTime: '6 min read',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Live Radio Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-6">
              <Radio className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold">SoundWeave Radio</h1>
              {isStreamLive && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE</span>}
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Tune in to our 24/7 live radio station featuring the best independent artists, curated playlists, and exclusive live sessions.
            </p>

            {/* Player */}
            <Card className="p-8 bg-card">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Radio className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Now Playing: Neon Dreams</h2>
                  <p className="text-muted-foreground mb-4">Luna Echo • Electronic • 3:45</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div className="h-full w-1/3 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">1:15 / 3:45</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">12,450 listeners</span>
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Tabs */}
        <section className="container py-12">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events">
                <Calendar className="w-4 h-4 mr-2" />
                Live Events
              </TabsTrigger>
              <TabsTrigger value="blog">Blog & News</TabsTrigger>
            </TabsList>

            {/* Live Events */}
            <TabsContent value="events">
              <div className="space-y-4">
                {liveEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-4">{event.artist}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <span>📅 {event.startTime}</span>
                            <span>⏱️ {event.duration}</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" /> {event.listeners.toLocaleString()} listening
                            </span>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Live
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Blog */}
            <TabsContent value="blog">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden card-hover cursor-pointer">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <p className="text-xs text-muted-foreground">By {post.author}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 border-t">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Go Live?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Independent artists can schedule live sessions and reach thousands of listeners on SoundWeave Radio.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Schedule Your Live Session
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
