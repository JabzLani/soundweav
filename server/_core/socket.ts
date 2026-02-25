import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export interface NotificationEvent {
  id: string;
  type: 'message' | 'project_update' | 'purchase' | 'verification' | 'follow';
  userId: number;
  title: string;
  content: string;
  relatedId?: number;
  relatedType?: string;
  timestamp: Date;
  read: boolean;
}

interface UserSocket {
  userId: number;
  socketId: string;
}

const userSockets = new Map<number, Set<string>>();
const notifications = new Map<number, NotificationEvent[]>();

export function initializeSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // User joins their notification room
    socket.on('join', (userId: number) => {
      socket.join(`user:${userId}`);

      if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set());
      }
      userSockets.get(userId)!.add(socket.id);

      // Send any pending notifications
      const userNotifications = notifications.get(userId) || [];
      socket.emit('notifications:load', userNotifications);

      console.log(`[Socket] User ${userId} joined notification room`);
    });

    // Handle message notifications
    socket.on('message:send', (data: { fromUserId: number; toUserId: number; content: string }) => {
      const notification: NotificationEvent = {
        id: `msg-${Date.now()}`,
        type: 'message',
        userId: data.toUserId,
        title: 'New Message',
        content: data.content,
        relatedId: data.fromUserId,
        relatedType: 'user',
        timestamp: new Date(),
        read: false,
      };

      storeNotification(data.toUserId, notification);
      io.to(`user:${data.toUserId}`).emit('notification:new', notification);
    });

    // Handle project update notifications
    socket.on('project:update', (data: { projectId: number; title: string; content: string; affectedUsers: number[] }) => {
      data.affectedUsers.forEach((userId) => {
        const notification: NotificationEvent = {
          id: `proj-${Date.now()}-${userId}`,
          type: 'project_update',
          userId,
          title: data.title,
          content: data.content,
          relatedId: data.projectId,
          relatedType: 'project',
          timestamp: new Date(),
          read: false,
        };

        storeNotification(userId, notification);
        io.to(`user:${userId}`).emit('notification:new', notification);
      });
    });

    // Handle purchase notifications
    socket.on('purchase:complete', (data: { userId: number; productName: string; amount: number }) => {
      const notification: NotificationEvent = {
        id: `purchase-${Date.now()}`,
        type: 'purchase',
        userId: data.userId,
        title: 'Purchase Confirmed',
        content: `Your purchase of "${data.productName}" for $${data.amount} has been confirmed.`,
        timestamp: new Date(),
        read: false,
      };

      storeNotification(data.userId, notification);
      io.to(`user:${data.userId}`).emit('notification:new', notification);
    });

    // Handle verification status notifications
    socket.on('verification:status', (data: { userId: number; status: 'approved' | 'rejected' | 'pending'; message: string }) => {
      const notification: NotificationEvent = {
        id: `verify-${Date.now()}`,
        type: 'verification',
        userId: data.userId,
        title: `Verification ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`,
        content: data.message,
        timestamp: new Date(),
        read: false,
      };

      storeNotification(data.userId, notification);
      io.to(`user:${data.userId}`).emit('notification:new', notification);
    });

    // Handle follow notifications
    socket.on('user:follow', (data: { followerId: number; followedUserId: number; followerName: string }) => {
      const notification: NotificationEvent = {
        id: `follow-${Date.now()}`,
        type: 'follow',
        userId: data.followedUserId,
        title: 'New Follower',
        content: `${data.followerName} started following you`,
        relatedId: data.followerId,
        relatedType: 'user',
        timestamp: new Date(),
        read: false,
      };

      storeNotification(data.followedUserId, notification);
      io.to(`user:${data.followedUserId}`).emit('notification:new', notification);
    });

    // Mark notification as read
    socket.on('notification:read', (data: { userId: number; notificationId: string }) => {
      const userNotifications = notifications.get(data.userId);
      if (userNotifications) {
        const notification = userNotifications.find((n) => n.id === data.notificationId);
        if (notification) {
          notification.read = true;
        }
      }
    });

    // Clear all notifications
    socket.on('notifications:clear', (userId: number) => {
      notifications.delete(userId);
      io.to(`user:${userId}`).emit('notifications:cleared');
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      // Remove socket from user's socket set
      for (const [userId, sockets] of Array.from(userSockets.entries())) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            userSockets.delete(userId);
          }
        }
      }
      console.log(`[Socket] User disconnected: ${socket.id}`);
    });
  });

  return io;
}

function storeNotification(userId: number, notification: NotificationEvent) {
  if (!notifications.has(userId)) {
    notifications.set(userId, []);
  }
  const userNotifications = notifications.get(userId)!;
  userNotifications.push(notification);

  // Keep only last 50 notifications per user
  if (userNotifications.length > 50) {
    userNotifications.shift();
  }
}

export function getNotifications(userId: number): NotificationEvent[] {
  return notifications.get(userId) || [];
}

export function clearNotifications(userId: number) {
  notifications.delete(userId);
}
