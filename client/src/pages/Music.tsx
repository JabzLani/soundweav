import { useState, useMemo } from 'react';
import { Play, Filter, Grid3x3, List, Loader2, Music as MusicIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';

export default function Music() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    mood: '',
    bpm: '',
    releaseDate: '',
    artist: '',
  });

  // Fetch top tracks from tRPC API
  const { data: tracks = [], isLoading, error } = trpc.tracks.getTop.useQuery({ limit: 100 });
  const { addItem } = useCart();

  // Filter and search tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter((track: any) => {
      const matchesSearch = track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.artistName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !filters.genre || track.genre === filters.genre;
      const matchesMood = !filters.mood || track.mood === filters.mood;
      return matchesSearch && matchesGenre && matchesMood;
    });
  }, [tracks, searchQuery, filters]);

  // Get unique genres and moods
  const genres = useMemo(() => {
    const genreSet = new Set(tracks.map((t: any) => t.genre).filter(Boolean));
    return Array.from(genreSet).sort();
  }, [tracks]);

  const moods = useMemo(() => {
    const moodSet = new Set(tracks.map((t: any) => t.mood).filter(Boolean));
    return Array.from(moodSet).sort();
  }, [tracks]);

  const bpmRanges = ['60-90', '90-120', '120-140', '140+'];

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading tracks</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-card">
          <div className="container py-8">
            <h1 className="text-4xl font-bold mb-2">Music Library</h1>
            <p className="text-muted-foreground">Discover and explore thousands of independent tracks</p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="border-b bg-muted/30">
          <div className="container py-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by track name, artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-4 py-2 rounded-lg"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium block mb-2">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                >
                  <option value="">All Genres</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Mood</label>
                <select
                  value={filters.mood}
                  onChange={(e) => setFilters({ ...filters, mood: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                >
                  <option value="">All Moods</option>
                  {moods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">BPM</label>
                <select
                  value={filters.bpm}
                  onChange={(e) => setFilters({ ...filters, bpm: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                >
                  <option value="">All BPM</option>
                  {bpmRanges.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Release Date</label>
                <select
                  value={filters.releaseDate}
                  onChange={(e) => setFilters({ ...filters, releaseDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                >
                  <option value="">Any Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Sort By</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-background text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Loading...' : `Showing ${filteredTracks.length} tracks`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tracks Display */}
        <section className="container py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="text-center py-12">
              <MusicIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">No tracks found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTracks.map((track: any) => (
                <Card key={track.id} className="overflow-hidden card-hover cursor-pointer group">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {track.albumArtUrl ? (
                      <img
                        src={track.albumArtUrl}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <MusicIcon className="w-12 h-12 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    <button className="absolute bottom-2 right-2 player-button w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold truncate">{track.title}</h4>
                    <p className="text-sm text-muted-foreground truncate mb-2">{track.artistName}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                      <span>{track.duration || '3:45'}</span>
                      <span>{track.playCount || 0} plays</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs"
                        onClick={() => addItem({
                          id: track.id,
                          title: track.title,
                          artist: track.artistName,
                          price: track.price || 1.99,
                          image: track.albumArtUrl,
                          quantity: 1,
                          category: 'digital',
                        })}
                      >
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="h-8 text-xs">
                        ${track.price || '1.99'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTracks.map((track: any) => (
                <Card key={track.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    {track.albumArtUrl ? (
                      <img
                        src={track.albumArtUrl}
                        alt={track.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <MusicIcon className="w-8 h-8 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.artistName}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        {track.genre && <span>{track.genre}</span>}
                        {track.mood && <span>{track.mood}</span>}
                        {track.bpm && <span>{track.bpm} BPM</span>}
                        <span>{track.playCount || 0} plays</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">${track.price || '1.99'}</span>
                      <button className="player-button w-10 h-10">
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs"
                        onClick={() => addItem({
                          id: track.id,
                          title: track.title,
                          artist: track.artistName,
                          price: track.price || 1.99,
                          image: track.albumArtUrl,
                          quantity: 1,
                          category: 'digital',
                        })}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
