import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  datetime,
  index,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 */
export const users = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey(),
    openId: varchar("openId", { length: 64 }).notNull().unique(),
    name: text("name"),
    email: varchar("email", { length: 320 }).unique(),
    loginMethod: varchar("loginMethod", { length: 64 }),
    password: text("password"), // For local auth only, not used with OAuth
    role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
    userType: mysqlEnum("userType", ["listener", "creator"]).default("listener"),
    profilePicUrl: text("profilePicUrl"),
    headerImageUrl: text("headerImageUrl"),
    bio: text("bio"),
    isVerified: boolean("isVerified").default(false),
    subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "inactive"]).default("inactive"),
    subscriptionExpiresAt: timestamp("subscriptionExpiresAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
    userTypeIdx: index("userType_idx").on(table.userType),
  })
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Artist profiles with additional metadata
 */
export const artists = mysqlTable(
  "artists",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    stageName: varchar("stageName", { length: 255 }).notNull(),
    genre: varchar("genre", { length: 100 }),
    bio: text("bio"),
    profilePicUrl: text("profilePicUrl"),
    verificationStatus: mysqlEnum("verificationStatus", ["pending", "approved", "rejected"]).default("pending"),
    verificationDocUrl: text("verificationDocUrl"),
    walletAddress: varchar("walletAddress", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
    verificationIdx: index("verification_idx").on(table.verificationStatus),
  })
);

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = typeof artists.$inferInsert;

/**
 * Tracks/Songs in the platform
 */
export const tracks = mysqlTable(
  "tracks",
  {
    id: int("id").autoincrement().primaryKey(),
    artistId: int("artistId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    fileUrl: text("fileUrl").notNull(),
    genre: varchar("genre", { length: 100 }),
    mood: varchar("mood", { length: 100 }),
    bpm: int("bpm"),
    duration: int("duration"), // in seconds
    playCount: int("playCount").default(0),
    releaseDate: datetime("releaseDate"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    artistIdIdx: index("artistId_idx").on(table.artistId),
    genreIdx: index("genre_idx").on(table.genre),
  })
);

export type Track = typeof tracks.$inferSelect;
export type InsertTrack = typeof tracks.$inferInsert;

/**
 * Products for marketplace (digital music, physical merch, tickets)
 */
export const products = mysqlTable(
  "products",
  {
    id: int("id").autoincrement().primaryKey(),
    artistId: int("artistId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    type: mysqlEnum("type", ["digital_music", "physical_merch", "ticket"]).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    imageUrl: text("imageUrl"),
    fileUrl: text("fileUrl"), // for digital products
    inventory: int("inventory"), // for physical products
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    artistIdIdx: index("artistId_idx").on(table.artistId),
    typeIdx: index("type_idx").on(table.type),
  })
);

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Orders for marketplace purchases
 */
export const orders = mysqlTable(
  "orders",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
    status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending"),
    stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
    statusIdx: index("status_idx").on(table.status),
  })
);

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items - individual products in an order
 */
export const orderItems = mysqlTable(
  "orderItems",
  {
    id: int("id").autoincrement().primaryKey(),
    orderId: int("orderId").notNull(),
    productId: int("productId").notNull(),
    quantity: int("quantity").default(1),
    priceAtPurchase: decimal("priceAtPurchase", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    orderIdIdx: index("orderId_idx").on(table.orderId),
    productIdIdx: index("productId_idx").on(table.productId),
  })
);

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Collaboration projects seeking funding
 */
export const collabProjects = mysqlTable(
  "collabProjects",
  {
    id: int("id").autoincrement().primaryKey(),
    artistId: int("artistId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    imageUrl: text("imageUrl"),
    fundingGoal: decimal("fundingGoal", { precision: 12, scale: 2 }).notNull(),
    currentFunded: decimal("currentFunded", { precision: 12, scale: 2 }).default("0"),
    deadline: datetime("deadline").notNull(),
    status: mysqlEnum("status", ["active", "funded", "failed", "completed"]).default("active"),
    smartContractAddress: varchar("smartContractAddress", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type CollabProject = typeof collabProjects.$inferSelect;
export type InsertCollabProject = typeof collabProjects.$inferInsert;

/**
 * Investment tiers for collaboration projects
 */
export const investmentTiers = mysqlTable(
  "investmentTiers",
  {
    id: int("id").autoincrement().primaryKey(),
    projectId: int("projectId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    ownershipStake: decimal("ownershipStake", { precision: 5, scale: 2 }).default("0"), // percentage
    royaltyPercentage: decimal("royaltyPercentage", { precision: 5, scale: 2 }).default("0"), // percentage
    limit: int("limit"), // max number of investors for this tier
    investorCount: int("investorCount").default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    projectIdIdx: index("projectId_idx").on(table.projectId),
  })
);

export type InvestmentTier = typeof investmentTiers.$inferSelect;
export type InsertInvestmentTier = typeof investmentTiers.$inferInsert;

/**
 * Investments in collaboration projects
 */
export const investments = mysqlTable(
  "investments",
  {
    id: int("id").autoincrement().primaryKey(),
    projectId: int("projectId").notNull(),
    tierId: int("tierId").notNull(),
    userId: int("userId").notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    ownershipStake: decimal("ownershipStake", { precision: 5, scale: 2 }).default("0"),
    royaltyPercentage: decimal("royaltyPercentage", { precision: 5, scale: 2 }).default("0"),
    status: mysqlEnum("status", ["pending", "completed", "refunded"]).default("pending"),
    smartContractAddress: varchar("smartContractAddress", { length: 255 }),
    stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = typeof investments.$inferInsert;

/**
 * Messages for direct messaging and group chats
 */
export const messages = mysqlTable(
  "messages",
  {
    id: int("id").autoincrement().primaryKey(),
    senderId: int("senderId").notNull(),
    receiverId: int("receiverId"), // null for group messages
    roomId: varchar("roomId", { length: 255 }), // for group chat rooms
    content: text("content").notNull(),
    isRead: boolean("isRead").default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Chat rooms for group conversations
 */
export const chatRooms = mysqlTable(
  "chatRooms",
  {
    id: int("id").autoincrement().primaryKey(),
    roomId: varchar("roomId", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    theme: varchar("theme", { length: 100 }), // e.g., "Hip-Hop Lovers", "Producer's Corner"
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export type ChatRoom = typeof chatRooms.$inferSelect;
export type InsertChatRoom = typeof chatRooms.$inferInsert;

/**
 * Notifications for users
 */
export const notifications = mysqlTable(
  "notifications",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    type: mysqlEnum("type", ["message", "purchase", "project_update", "investment", "verification"]).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"),
    relatedId: int("relatedId"), // ID of related entity (message, order, project, etc.)
    isRead: boolean("isRead").default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  }
);

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Blog posts/articles
 */
export const blogPosts = mysqlTable(
  "blogPosts",
  {
    id: int("id").autoincrement().primaryKey(),
    authorId: int("authorId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique(),
    content: text("content"),
    featuredImageUrl: text("featuredImageUrl"),
    status: mysqlEnum("status", ["draft", "published"]).default("draft"),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Live events/shows
 */
export const liveEvents = mysqlTable(
  "liveEvents",
  {
    id: int("id").autoincrement().primaryKey(),
    artistId: int("artistId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    scheduledAt: datetime("scheduledAt").notNull(),
    streamUrl: text("streamUrl"),
    status: mysqlEnum("status", ["scheduled", "live", "completed", "cancelled"]).default("scheduled"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  }
);

export type LiveEvent = typeof liveEvents.$inferSelect;
export type InsertLiveEvent = typeof liveEvents.$inferInsert;

/**
 * Song purchases tracking for subscription model
 */
export const songPurchases = mysqlTable(
  "songPurchases",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    trackId: int("trackId").notNull(),
    artistId: int("artistId").notNull(),
    purchaseDate: timestamp("purchaseDate").defaultNow().notNull(),
  }
);

export type SongPurchase = typeof songPurchases.$inferSelect;
export type InsertSongPurchase = typeof songPurchases.$inferInsert;
