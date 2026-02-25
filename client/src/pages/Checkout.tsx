import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ShoppingCart, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // Validate form
      if (!email || !fullName || !address || !city || !country || !postalCode) {
        throw new Error('Please fill in all fields');
      }

      if (items.length === 0) {
        throw new Error('Your cart is empty');
      }

      // In a real implementation, this would call the backend to create a Stripe checkout session
      // For now, we'll show a placeholder message
      console.log('Checkout data:', {
        email,
        fullName,
        address,
        city,
        country,
        postalCode,
        items,
        total,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert('Checkout initiated! Stripe integration will be enabled once you provide API keys.');
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container">
            {/* Header */}
            <div className="mb-8">
              <Link href="/cart">
                <a className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cart
                </a>
              </Link>
              <h1 className="text-4xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase securely</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <Card className="p-6 space-y-6">
                  {/* Billing Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Street Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Main Street"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      {/* City and Country */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="New York"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Country</label>
                          <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="United States"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      {/* Postal Code */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="10001"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-600">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}

                      {/* Security Notice */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center gap-3 text-blue-600">
                        <Lock className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Your payment information is secure and encrypted with Stripe.</span>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isProcessing || items.length === 0}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-semibold"
                      >
                        {isProcessing ? 'Processing...' : `Pay R${total.toFixed(2)}`}
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-20 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Order Summary
                    </h2>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {items.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Your cart is empty</p>
                    ) : (
                      items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start pb-3 border-b border-border/50">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-sm">R{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>R0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>R0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">R{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Continue Shopping */}
                  <Link href="/marketplace">
                    <a>
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </a>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
