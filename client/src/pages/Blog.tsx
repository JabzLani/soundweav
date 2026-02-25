import { Search, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'How to Get Your Music on SoundWeave',
      excerpt: 'A comprehensive guide for independent artists to upload and promote their music on our platform.',
      author: 'SoundWeave Team',
      date: '2024-01-15',
      category: 'Getting Started',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'The Future of Independent Music',
      excerpt: 'Exploring how blockchain and direct artist-fan relationships are revolutionizing the music industry.',
      author: 'Music Industry Expert',
      date: '2024-01-12',
      category: 'Industry Insights',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Artist Spotlight: Luna Echo',
      excerpt: 'Meet Luna Echo, an innovative electronic artist pushing the boundaries of ambient and techno fusion.',
      author: 'SoundWeave Curator',
      date: '2024-01-10',
      category: 'Artist Spotlight',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Maximizing Your Earnings as an Independent Artist',
      excerpt: 'Strategies for pricing your music, creating collaboration projects, and building a sustainable income.',
      author: 'SoundWeave Team',
      date: '2024-01-08',
      category: 'Artist Tips',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&h=400&fit=crop',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Understanding Smart Contracts and Escrow',
      excerpt: 'A beginner\'s guide to blockchain technology and how it protects collaboration funding on SoundWeave.',
      author: 'Tech Team',
      date: '2024-01-05',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
      readTime: '10 min read',
    },
    {
      id: 6,
      title: 'Building Your Fanbase: Community Engagement Tips',
      excerpt: 'How to use SoundWeave\'s messaging and community features to connect with your listeners.',
      author: 'Community Manager',
      date: '2024-01-01',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
      readTime: '6 min read',
    },
  ];

  const categories = ['All', 'Getting Started', 'Industry Insights', 'Artist Spotlight', 'Artist Tips', 'Technology', 'Community'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SoundWeave Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, insights, and stories from the independent music community.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-2"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1 h-64 md:h-auto overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                              {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{post.readTime}</span>
                          </div>
                          <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                          <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                          <a href="#" className="text-primary hover:text-primary/80 font-medium">
                            Read More →
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No blog posts found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to get the latest tips, artist spotlights, and platform updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
