import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/_core/hooks/useAuth';

export interface Notification {
  id: string;
  type: 'message' | 'project_update' | 'purchase' | 'verification' | 'follow';
  title: string;
  content: string;
  relatedId?: number;
  relatedType?: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  clearAll: () => void;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user) return;

    const socketInstance = io(window.location.origin, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketInstance.on('connect', () => {
      console.log('[Notifications] Socket connected');
      setIsConnected(true);
      socketInstance.emit('join', user.id);
    });

    socketInstance.on('disconnect', () => {
      console.log('[Notifications] Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('notifications:load', (loadedNotifications: Notification[]) => {
      setNotifications(
        loadedNotifications.map((n) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      );
    });

    socketInstance.on('notification:new', (notification: Notification) => {
      console.log('[Notifications] New notification:', notification);
      setNotifications((prev) => [
        {
          ...notification,
          timestamp: new Date(notification.timestamp),
        },
        ...prev,
      ]);
    });

    socketInstance.on('notifications:cleared', () => {
      setNotifications([]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const addNotification = useCallback(
    (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    },
    []
  );

  const markAsRead = useCallback(
    (notificationId: string) => {
      if (socket) {
        socket.emit('notification:read', { userId: user?.id, notificationId });
      }
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    },
    [socket, user?.id]
  );

  const clearAll = useCallback(() => {
    if (socket && user) {
      socket.emit('notifications:clear', user.id);
    }
    setNotifications([]);
  }, [socket, user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        clearAll,
        isConnected,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
