import { useState, useMemo } from 'react';
import { ShoppingCart, Music, Shirt, Ticket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useCart } from '@/contexts/CartContext';

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('digital');
  const { addItem } = useCart();

  // Fetch products by type from tRPC API
  const { data: digitalProducts = [], isLoading: digitalLoading } = trpc.products.getByType.useQuery('digital');
  const { data: physicalProducts = [], isLoading: physicalLoading } = trpc.products.getByType.useQuery('physical');
  const { data: ticketProducts = [], isLoading: ticketLoading } = trpc.products.getByType.useQuery('tickets');

  const isLoading = digitalLoading || physicalLoading || ticketLoading;

  const handleAddToCart = (product: any, category: 'digital' | 'physical' | 'tickets') => {
    addItem({
      id: product.id,
      title: product.title || product.name,
      artist: product.artistName || product.artist || 'Unknown Artist',
      price: product.price,
      image: product.imageUrl || product.image,
      quantity: 1,
      category,
    });
  };

  const ProductCard = ({ product, category }: any) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
        {product.imageUrl || product.image ? (
          <img
            src={product.imageUrl || product.image}
            alt={product.title || product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {category === 'digital' && <Music className="w-20 h-20 text-muted-foreground opacity-30" />}
            {category === 'physical' && <Shirt className="w-20 h-20 text-muted-foreground opacity-30" />}
            {category === 'tickets' && <Ticket className="w-20 h-20 text-muted-foreground opacity-30" />}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{product.title || product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.artistName || product.artist || 'Unknown Artist'}</p>

        {product.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        )}

        {product.format && (
          <p className="text-xs bg-accent/20 text-accent px-2 py-1 rounded w-fit mb-3">
            {product.format}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <Button
            size="sm"
            onClick={() => handleAddToCart(product, category)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 to-accent/20 border-b py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">SoundWeave Marketplace</h1>
            <p className="text-muted-foreground">Discover digital music, merchandise, and live event tickets</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="container py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="digital" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span className="hidden sm:inline">Digital Music</span>
              </TabsTrigger>
              <TabsTrigger value="physical" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                <span className="hidden sm:inline">Merchandise</span>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span className="hidden sm:inline">Tickets</span>
              </TabsTrigger>
            </TabsList>

            {/* Digital Music Tab */}
            <TabsContent value="digital" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Digital Music</h2>
                <p className="text-muted-foreground mb-6">High-quality audio files from independent artists</p>
              </div>

              {digitalLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : digitalProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No digital products available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {digitalProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} category="digital" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Physical Merchandise Tab */}
            <TabsContent value="physical" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Merchandise</h2>
                <p className="text-muted-foreground mb-6">Official merchandise from your favorite artists</p>
              </div>

              {physicalLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : physicalProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Shirt className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No merchandise available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {physicalProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} category="physical" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Live Event Tickets</h2>
                <p className="text-muted-foreground mb-6">Secure your spot at upcoming live events</p>
              </div>

              {ticketLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : ticketProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No tickets available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ticketProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} category="tickets" />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
