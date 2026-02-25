import { useState } from 'react';
import { Package, Download, Eye, Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/_core/hooks/useAuth';

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  receiptUrl?: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data - in a real app, this would come from the API
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2025-11-20',
      items: [
        { id: 1, title: 'Neon Dreams', quantity: 1, price: 49.99 },
        { id: 2, title: 'Midnight Waves', quantity: 1, price: 39.99 },
      ],
      total: 89.98,
      status: 'completed',
      receiptUrl: '#',
    },
    {
      id: 'ORD-002',
      date: '2025-11-18',
      items: [
        { id: 3, title: 'Crystal Horizon Album', quantity: 1, price: 99.99 },
      ],
      total: 99.99,
      status: 'completed',
      receiptUrl: '#',
    },
    {
      id: 'ORD-003',
      date: '2025-11-15',
      items: [
        { id: 4, title: 'SoundWeave Platform Investment', quantity: 1, price: 500.00 },
      ],
      total: 500.00,
      status: 'completed',
      receiptUrl: '#',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Completed
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Pending
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
            Cancelled
          </div>
        );
      default:
        return null;
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
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                Order History
              </h1>
              <p className="text-muted-foreground">View and manage your purchases</p>
            </div>

            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
                <p className="text-muted-foreground mb-6">You haven't made any purchases yet.</p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Shopping
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="lg:col-span-2 space-y-4">
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary/20"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{order.id}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="space-y-2 mb-4 pb-4 border-b border-border">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.title} x {item.quantity}
                            </span>
                            <span className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span className="text-lg font-bold">R{order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {order.receiptUrl && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Order Details Sidebar */}
                <div className="lg:col-span-1">
                  {selectedOrder ? (
                    <Card className="p-6 sticky top-20 space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-2">Order Details</h2>
                        <p className="text-sm text-muted-foreground">{selectedOrder.id}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                          <p className="font-semibold">
                            {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          {getStatusBadge(selectedOrder.status)}
                        </div>

                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-3 font-semibold">Items</p>
                          <div className="space-y-2">
                            {selectedOrder.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.title}</span>
                                <span className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>R{selectedOrder.total.toFixed(2)}</span>
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
                            <span className="text-primary">R{selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {selectedOrder.receiptUrl && (
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                          </Button>
                        )}
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-6 sticky top-20 text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">Select an order to view details</p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
