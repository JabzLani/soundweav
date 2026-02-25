import { useState } from 'react';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Luna Echo - Album Release Party',
      artist: 'Luna Echo',
      date: '2024-02-15',
      time: '20:00',
      location: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
      description: 'Join Luna Echo for the official release party of her new album "Neon Dreams". Live performance, exclusive merchandise, and meet & greet opportunities.',
      attendees: 450,
      ticketPrice: 150,
      ticketsAvailable: 200,
    },
    {
      id: 2,
      title: 'Sonic Pulse - DJ Set',
      artist: 'Sonic Pulse',
      date: '2024-02-20',
      time: '22:00',
      location: 'Johannesburg, South Africa',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
      description: 'High-energy DJ set featuring the latest electronic and house music. Perfect for dance enthusiasts and electronic music lovers.',
      attendees: 320,
      ticketPrice: 120,
      ticketsAvailable: 150,
    },
    {
      id: 3,
      title: 'Echo Dreams - Ambient Performance',
      artist: 'Echo Dreams',
      date: '2024-02-25',
      time: '19:00',
      location: 'Durban, South Africa',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&h=400&fit=crop',
      description: 'An immersive ambient music experience. Echo Dreams will perform live with visual projections and interactive elements.',
      attendees: 280,
      ticketPrice: 100,
      ticketsAvailable: 300,
    },
    {
      id: 4,
      title: 'SoundWeave Music Festival',
      artist: 'Multiple Artists',
      date: '2024-03-10',
      time: '14:00',
      location: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
      description: 'A full-day festival featuring 15+ independent artists across multiple genres. Food vendors, merchandise, and community activities.',
      attendees: 1200,
      ticketPrice: 250,
      ticketsAvailable: 500,
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'Cosmic Sound - Live Session',
      artist: 'Cosmic Sound',
      date: '2024-01-20',
      time: '20:00',
      location: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
      description: 'An intimate live session with Cosmic Sound performing their greatest hits.',
      attendees: 380,
      ticketPrice: 80,
      ticketsAvailable: 0,
    },
    {
      id: 6,
      title: 'Artist Collaboration Workshop',
      artist: 'SoundWeave Team',
      date: '2024-01-15',
      time: '18:00',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
      description: 'Learn how to collaborate with other artists and launch successful funding projects on SoundWeave.',
      attendees: 520,
      ticketPrice: 0,
      ticketsAvailable: 0,
    },
  ];

  const EventCard = ({ event, isPast = false }: { event: typeof upcomingEvents[0]; isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1 h-64 md:h-auto overflow-hidden relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {isPast && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Past Event</span>
            </div>
          )}
        </div>
        <div className="md:col-span-2 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            <p className="text-muted-foreground mb-4">{event.artist}</p>
            <p className="text-muted-foreground mb-6">{event.description}</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{event.attendees} attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-primary" />
                <span>{event.ticketsAvailable > 0 ? `${event.ticketsAvailable} tickets left` : 'Sold out'}</span>
              </div>
            </div>
            {!isPast && event.ticketsAvailable > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">R{event.ticketPrice}</span>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Tickets
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SoundWeave Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover live performances, festivals, and exclusive events from independent artists.
            </p>
          </div>
        </section>

        {/* Events Tabs */}
        <section className="py-16 md:py-24">
          <div className="container">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upcoming">
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              {/* Upcoming Events */}
              <TabsContent value="upcoming">
                <div className="space-y-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </TabsContent>

              {/* Past Events */}
              <TabsContent value="past">
                <div className="space-y-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast={true} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Host an Event CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">Want to Host an Event?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              SoundWeave provides tools for independent artists to organize and promote live events. Get started with our event hosting platform.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Create an Event
            </Button>
          </div>
        </section>

        {/* Event Tips */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Tips for Hosting Successful Events</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Plan Ahead</h3>
                <p className="text-muted-foreground">
                  Give your audience at least 2-4 weeks notice for your event. Use our promotional tools to build anticipation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Set the Right Price</h3>
                <p className="text-muted-foreground">
                  Research similar events in your area and price competitively. Consider offering early bird discounts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Engage Your Community</h3>
                <p className="text-muted-foreground">
                  Use messaging and social features to build excitement. Share behind-the-scenes content and artist updates.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Provide Value</h3>
                <p className="text-muted-foreground">
                  Offer unique experiences like meet & greets, exclusive merchandise, or special performances.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
