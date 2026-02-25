import { useState } from 'react';
import { Send, Search, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Luna Echo',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      lastMessage: 'Thanks for supporting my new album!',
      timestamp: '2 hours ago',
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: 'Sonic Pulse',
      avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
      lastMessage: 'The collaboration sounds amazing',
      timestamp: '5 hours ago',
      unread: 2,
      online: true,
    },
    {
      id: 3,
      name: 'Echo Dreams',
      avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
      lastMessage: 'Looking forward to the project',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: 'SoundWeave Support',
      avatar: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop',
      lastMessage: 'Your verification has been approved',
      timestamp: '3 days ago',
      unread: 0,
      online: true,
    },
  ];

  const messages = {
    1: [
      { id: 1, sender: 'Luna Echo', text: 'Hey! Thanks for the investment', timestamp: '2:30 PM', isOwn: false },
      { id: 2, sender: 'You', text: 'Happy to support your work!', timestamp: '2:35 PM', isOwn: true },
      { id: 3, sender: 'Luna Echo', text: 'The album is almost done. Want a preview?', timestamp: '2:40 PM', isOwn: false },
      { id: 4, sender: 'You', text: 'Absolutely! Would love to hear it', timestamp: '2:45 PM', isOwn: true },
      { id: 5, sender: 'Luna Echo', text: 'Thanks for supporting my new album!', timestamp: '2:50 PM', isOwn: false },
    ],
    2: [
      { id: 1, sender: 'Sonic Pulse', text: 'Interested in collaborating?', timestamp: '10:00 AM', isOwn: false },
      { id: 2, sender: 'You', text: 'Definitely! What did you have in mind?', timestamp: '10:15 AM', isOwn: true },
      { id: 3, sender: 'Sonic Pulse', text: 'The collaboration sounds amazing', timestamp: '10:20 AM', isOwn: false },
    ],
    3: [
      { id: 1, sender: 'Echo Dreams', text: 'Hi! Thanks for following', timestamp: 'Yesterday', isOwn: false },
      { id: 2, sender: 'You', text: 'Love your ambient work!', timestamp: 'Yesterday', isOwn: true },
      { id: 3, sender: 'Echo Dreams', text: 'Looking forward to the project', timestamp: 'Yesterday', isOwn: false },
    ],
    4: [
      { id: 1, sender: 'SoundWeave Support', text: 'Your artist verification is being reviewed', timestamp: '3 days ago', isOwn: false },
      { id: 2, sender: 'SoundWeave Support', text: 'Your verification has been approved', timestamp: '3 days ago', isOwn: false },
    ],
  };

  const currentConversation = conversations.find((c) => c.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : [];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r bg-card flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button size="icon" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${
                  selectedChat === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground ml-2">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="hidden md:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-card flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={currentConversation?.avatar}
                  alt={currentConversation?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold">{currentConversation?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {currentConversation?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
