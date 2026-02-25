import { useState } from 'react';
import { BarChart3, Users, CheckCircle, TrendingUp, AlertCircle, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You do not have permission to access the admin dashboard.</p>
          <Button onClick={() => setLocation('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const stats = [
    {
      label: 'Total Users',
      value: '12,847',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      label: 'Verified Artists',
      value: '2,341',
      change: '+8%',
      icon: CheckCircle,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      label: 'Active Investments',
      value: '847',
      change: '+23%',
      icon: TrendingUp,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      label: 'Platform Revenue',
      value: 'R2.3M',
      change: '+18%',
      icon: BarChart3,
      color: 'bg-orange-500/10 text-orange-600',
    },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'artists', label: 'Artist Verification', icon: CheckCircle },
    { id: 'investments', label: 'Investment Review', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className={`${!sidebarOpen && 'hidden'} font-bold text-lg`}>
            <span className="text-primary">Sound</span>
            <span className="text-accent">Weave</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border space-y-2">
          <div className={`${!sidebarOpen && 'hidden'} text-xs text-muted-foreground mb-3`}>
            Logged in as {user?.name}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage platform, artists, and investments</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={idx} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Verifications</h2>
                  <div className="space-y-3">
                    {[
                      { name: 'Luna Echo', status: 'Approved', time: '2 hours ago' },
                      { name: 'Stellar Vibes', status: 'Pending', time: '4 hours ago' },
                      { name: 'Cosmic Sound', status: 'Approved', time: '1 day ago' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            item.status === 'Approved'
                              ? 'bg-green-500/10 text-green-600'
                              : 'bg-yellow-500/10 text-yellow-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Top Investments</h2>
                  <div className="space-y-3">
                    {[
                      { project: 'SoundWeave Platform', amount: 'R2.3M', investors: '2,847' },
                      { project: 'Luna Echo Album', amount: 'R450K', investors: '1,234' },
                      { project: 'Cosmic Sound Tour', amount: 'R380K', investors: '892' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">{item.project}</p>
                          <p className="text-xs text-muted-foreground">{item.investors} investors</p>
                        </div>
                        <p className="font-bold text-primary">{item.amount}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'artists' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Artist Verification Management</h2>
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Artist verification module coming soon</p>
              </div>
            </Card>
          )}

          {activeTab === 'investments' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Investment Review</h2>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Investment review module coming soon</p>
              </div>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">User management module coming soon</p>
              </div>
            </Card>
          )}

          {activeTab === 'analytics' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Analytics module coming soon</p>
              </div>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Settings module coming soon</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
