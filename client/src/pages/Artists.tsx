import { useState, useMemo } from 'react';
import { Search, Music, Users, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';

export default function Artists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  // Fetch verified artists from tRPC API
  const { data: artists = [], isLoading, error } = trpc.artists.getVerified.useQuery();

  // Filter artists based on search and genre
  const filteredArtists = useMemo(() => {
    return artists.filter((artist: any) => {
      const matchesSearch = artist.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artist.bio?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !genreFilter || artist.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [artists, searchQuery, genreFilter]);

  // Get unique genres from artists
  const genres = useMemo(() => {
    const genreSet = new Set(artists.map((a: any) => a.genre).filter(Boolean));
    return Array.from(genreSet).sort();
  }, [artists]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading artists</p>
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 to-accent/20 border-b py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Artist Directory</h1>
            <p className="text-muted-foreground">Discover independent artists and creators</p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="border-b bg-card/50 py-8">
          <div className="container space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search artists by name or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGenreFilter('')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !genreFilter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Genres
              </button>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    genreFilter === genre
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Artists Grid */}
        <section className="container py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">No artists found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtists.map((artist: any) => (
                <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Artist Image */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    {artist.profilePicUrl ? (
                      <img
                        src={artist.profilePicUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-20 h-20 text-muted-foreground opacity-30" />
                    )}
                  </div>

                  {/* Artist Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      {artist.isVerified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>

                    {artist.genre && (
                      <p className="text-sm bg-accent/20 text-accent px-2 py-1 rounded w-fit mb-3">
                        {artist.genre}
                      </p>
                    )}

                    {artist.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {artist.bio}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex gap-4 text-xs text-muted-foreground mb-4 py-2 border-t border-b">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{artist.followers || 0} followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        <span>{artist.tracksCount || 0} tracks</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <a href={`/profile/${artist.userId}`} className="block">
                      <Button className="w-full">View Profile</Button>
                    </a>
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
