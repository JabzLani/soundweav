import { useState } from 'react';
import { useLocation } from 'wouter';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Mock product data - in a real app, this would come from URL params or API
  const product = {
    id: 1,
    title: 'Neon Dreams - Album',
    artist: 'Luna Echo',
    price: 9.99,
    format: 'MP3 + FLAC',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop',
    description: 'Complete album with 12 unreleased tracks featuring ambient electronic music with ethereal vocals and lush soundscapes.',
    category: 'digital' as const,
    rating: 4.8,
    reviews: 156,
    downloads: 2450,
    releaseDate: '2024-01-15',
    tracks: [
      { number: 1, title: 'Neon Dreams', duration: '4:32' },
      { number: 2, title: 'Digital Horizon', duration: '5:12' },
      { number: 3, title: 'Crystal Waves', duration: '3:45' },
      { number: 4, title: 'Luminous Path', duration: '4:58' },
      { number: 5, title: 'Ethereal Echoes', duration: '5:23' },
      { number: 6, title: 'Neon Nights', duration: '4:15' },
      { number: 7, title: 'Digital Dreams', duration: '5:01' },
      { number: 8, title: 'Crystal Horizon', duration: '4:42' },
      { number: 9, title: 'Luminous Waves', duration: '5:34' },
      { number: 10, title: 'Ethereal Nights', duration: '4:28' },
      { number: 11, title: 'Neon Echoes', duration: '5:15' },
      { number: 12, title: 'Digital Infinity', duration: '6:02' },
    ],
    relatedProducts: [
      {
        id: 2,
        title: 'Midnight Waves - Single',
        artist: 'Sonic Pulse',
        price: 1.99,
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
      },
      {
        id: 3,
        title: 'Crystal Horizon - EP',
        artist: 'Echo Dreams',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
      },
      {
        id: 4,
        title: 'Stellar Vibes - Remix Pack',
        artist: 'Cosmic Sound',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      },
    ],
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      artist: product.artist,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container py-4">
            <button
              onClick={() => setLocation('/marketplace')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Marketplace
            </button>
          </div>
        </div>

        {/* Product Details */}
        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">{product.artist}</p>
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <Card className="p-6 mb-6 bg-muted/50">
                <div className="text-4xl font-bold mb-4">${product.price}</div>
                <p className="text-muted-foreground mb-4">{product.format}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  {product.downloads} downloads • Released {product.releaseDate}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border rounded-lg hover:bg-muted flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border rounded-lg hover:bg-muted flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">About This Product</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tracklist */}
        <section className="border-t py-12">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Tracklist</h2>
            <Card className="overflow-hidden">
              {product.tracks.map((track, index) => (
                <div
                  key={track.number}
                  className={`p-4 flex items-center justify-between ${
                    index !== product.tracks.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">{track.number}</span>
                    <span className="font-medium">{track.title}</span>
                  </div>
                  <span className="text-muted-foreground">{track.duration}</span>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold truncate">{relatedProduct.title}</h3>
                    <p className="text-sm text-muted-foreground truncate mb-3">
                      {relatedProduct.artist}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${relatedProduct.price}</span>
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
