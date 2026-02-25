import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart.
            </p>
            <Button
              onClick={() => setLocation('/marketplace')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
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
        {/* Header */}
        <section className="border-b bg-card">
          <div className="container py-8">
            <button
              onClick={() => setLocation('/marketplace')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shopping
            </button>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </section>

        {/* Cart Content */}
        <section className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.artist}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.category === 'digital' && 'Digital Music'}
                          {item.category === 'physical' && 'Physical Merchandise'}
                          {item.category === 'tickets' && 'Event Ticket'}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right mb-4">
                          <p className="text-2xl font-bold">R{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            R{item.price.toFixed(2)} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="p-1 hover:bg-background rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-background rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600 mt-4 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-8">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="text-red-500 hover:text-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-semibold">R{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R{total.toFixed(2)}
                  </span>
                </div>

                <Link href="/checkout">
                  <a>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg mb-4">
                      Proceed to Checkout
                    </Button>
                  </a>
                </Link>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation('/marketplace')}
                >
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
