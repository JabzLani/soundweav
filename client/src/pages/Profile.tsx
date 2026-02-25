import { useState } from 'react';
import { Edit2, Upload, Music, ShoppingBag, LogOut, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState<'listener' | 'creator'>('listener');

  const listenerStats = {
    totalSpent: 249.99,
    tracksOwned: 42,
    artistsFollowed: 18,
    playlistsCreated: 5,
  };

  const creatorStats = {
    totalEarnings: 5420.50,
    tracksUploaded: 28,
    followers: 1540,
    projectsFunded: 2,
  };

  const purchaseHistory = [
    { id: 1, title: 'Neon Dreams - Album', artist: 'Luna Echo', price: 9.99, date: '2024-01-15' },
    { id: 2, title: 'Midnight Waves - Single', artist: 'Sonic Pulse', price: 1.99, date: '2024-01-10' },
  ];

  const investments = [
    { id: 1, project: 'New Album Production', artist: 'Luna Echo', amount: 500, tier: 'Royalty Share', status: 'Active' },
    { id: 2, project: 'Music Video Production', artist: 'Sonic Pulse', amount: 300, tier: 'Revenue Share', status: 'Active' },
  ];

  const uploads = [
    { id: 1, title: 'Stellar Vibes', genre: 'Electronic', plays: 5400, date: '2024-01-20' },
    { id: 2, title: 'Digital Dreams', genre: 'Ambient', plays: 3200, date: '2024-01-15' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-card">
          <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{user?.name || 'Profile'}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
                {user?.isVerified && (
                  <div className="flex items-center gap-1 mt-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified Artist</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {!user?.isVerified && userType === 'creator' && (
                  <a href="/verify">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Start Verification
                    </Button>
                  </a>
                )}
                <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setUserType('listener')} className={`px-6 py-3 rounded-lg font-medium transition-colors ${userType === 'listener' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                <ShoppingBag className="w-4 h-4 inline mr-2" />
                Listener
              </button>
              <button onClick={() => setUserType('creator')} className={`px-6 py-3 rounded-lg font-medium transition-colors ${userType === 'creator' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                <Music className="w-4 h-4 inline mr-2" />
                Creator
              </button>
            </div>
          </div>
        </section>

        <section className="container py-12">
          {userType === 'listener' ? (
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Total Spent</p><p className="text-3xl font-bold">${listenerStats.totalSpent}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Tracks Owned</p><p className="text-3xl font-bold">{listenerStats.tracksOwned}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Artists Followed</p><p className="text-3xl font-bold">{listenerStats.artistsFollowed}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Playlists</p><p className="text-3xl font-bold">{listenerStats.playlistsCreated}</p></Card>
                </div>
              </TabsContent>
              <TabsContent value="purchases">
                <Card><div className="divide-y">{purchaseHistory.map((p) => (<div key={p.id} className="p-4 flex justify-between"><div><h4 className="font-bold">{p.title}</h4><p className="text-sm text-muted-foreground">{p.artist}</p></div><div className="text-right"><p className="font-bold">${p.price}</p><p className="text-xs text-muted-foreground">{p.date}</p></div></div>))}</div></Card>
              </TabsContent>
              <TabsContent value="investments">
                <div className="space-y-4">{investments.map((inv) => (<Card key={inv.id} className="p-4"><div className="flex justify-between items-start"><div><h4 className="font-bold">{inv.project}</h4><p className="text-sm text-muted-foreground">{inv.artist}</p></div><span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold">{inv.status}</span></div><div className="flex justify-between mt-3"><p className="text-sm">{inv.tier}</p><p className="text-2xl font-bold text-primary">${inv.amount}</p></div></Card>))}</div>
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="uploads">Uploads</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Total Earnings</p><p className="text-3xl font-bold">${creatorStats.totalEarnings}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Tracks Uploaded</p><p className="text-3xl font-bold">{creatorStats.tracksUploaded}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Followers</p><p className="text-3xl font-bold">{creatorStats.followers}</p></Card>
                  <Card className="p-6"><p className="text-sm text-muted-foreground mb-2">Active Projects</p><p className="text-3xl font-bold">{creatorStats.projectsFunded}</p></Card>
                </div>
              </TabsContent>
              <TabsContent value="uploads">
                <div className="mb-6"><Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Upload className="w-4 h-4 mr-2" />Upload Track</Button></div>
                <div className="space-y-3">{uploads.map((track) => (<Card key={track.id} className="p-4 flex justify-between"><div><h4 className="font-bold">{track.title}</h4><p className="text-sm text-muted-foreground">{track.genre}</p></div><div className="text-right"><p className="text-sm font-medium">{track.plays.toLocaleString()} plays</p><p className="text-xs text-muted-foreground">{track.date}</p></div></Card>))}</div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-6 max-w-2xl">
                  <Card className="p-6"><h3 className="text-lg font-bold mb-4">Artist Verification</h3><p className="text-sm text-muted-foreground mb-4">Verify to unlock selling and collaboration.</p><Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Verification</Button></Card>
                  <Card className="p-6"><h3 className="text-lg font-bold mb-4">Payout Settings</h3><div className="space-y-4"><div><label className="text-sm font-medium block mb-2">Bank Account</label><Input placeholder="IBAN" className="bg-muted" /></div><div><label className="text-sm font-medium block mb-2">Wallet Address</label><Input placeholder="0x..." className="bg-muted" /></div><Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button></div></Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </section>

        <section className="border-t bg-muted/30">
          <div className="container py-8">
            <Button onClick={() => logout()} variant="destructive" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
