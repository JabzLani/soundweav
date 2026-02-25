import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Search, User, ShoppingCart, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { useCart } from '@/contexts/CartContext';
import NotificationCenter from '@/components/NotificationCenter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Latest Music', href: '/music' },
    { label: 'Artists', href: '/artists' },
    { label: 'Collab', href: '/collab' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Live & Blog', href: '/live' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl gradient-text">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
            ♪
          </div>
          SoundWeave
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search artists, tracks..."
              className="pl-10 pr-4 py-2 rounded-full bg-muted border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Play Button */}
          <button className="player-button hidden sm:flex">
            ▶
          </button>

          {/* Notification Center */}
          <NotificationCenter />

          {/* Cart Button */}
          <a href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* User Actions */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user?.name || 'Profile'}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg py-2">
                  <a href="/profile" className="block px-4 py-2 text-sm hover:bg-muted cursor-pointer">My Profile</a>
                  <a href="/messages" className="block px-4 py-2 text-sm hover:bg-muted flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="w-4 h-4" /> Messages
                  </a>
                  <a href="/cart" className="block px-4 py-2 text-sm hover:bg-muted flex items-center gap-2 cursor-pointer">
                    <ShoppingCart className="w-4 h-4" /> Cart ({cartCount})
                  </a>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
