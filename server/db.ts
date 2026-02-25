import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ LOCAL AUTH FUNCTIONS ============
export async function createLocalUser(email: string, password: string, name: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Use email as openId for local auth compatibility
    const result = await db.insert(users).values({
      openId: email,
      email,
      password,
      name,
      loginMethod: "local",
      lastSignedIn: new Date(),
    });

    return result;
  } catch (error) {
    console.error("[Database] Failed to create local user:", error);
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot find user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { desc, or, and, gte, lte, count } from "drizzle-orm";
import {
  artists,
  tracks,
  products,
  orders,
  collabProjects,
  investments,
  messages,
  notifications,
  songPurchases,
  chatRooms,
  liveEvents,
  blogPosts,
} from "../drizzle/schema";

// ============ ARTIST QUERIES ============
export async function getArtistByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(artists).where(eq(artists.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getVerifiedArtists() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(artists).where(eq(artists.verificationStatus, "approved"));
}

// ============ TRACK QUERIES ============
export async function getTracksByArtistId(artistId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tracks).where(eq(tracks.artistId, artistId));
}

export async function getTopTracks(limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tracks).orderBy(desc(tracks.playCount)).limit(limit);
}

// ============ PRODUCT QUERIES ============
export async function getProductsByArtistId(artistId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.artistId, artistId));
}

export async function getProductsByType(type: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.type, type as any));
}

// ============ ORDER QUERIES ============
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId));
}

// ============ COLLAB PROJECT QUERIES ============
export async function getActiveCollabProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(collabProjects).where(eq(collabProjects.status, "active"));
}

export async function getCollabProjectsByArtistId(artistId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(collabProjects).where(eq(collabProjects.artistId, artistId));
}

export async function getProjectInvestments(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(investments).where(eq(investments.projectId, projectId));
}

// ============ MESSAGE QUERIES ============
export async function getUserMessages(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(messages).where(
    or(
      eq(messages.senderId, userId),
      eq(messages.receiverId, userId)
    )
  ).orderBy(desc(messages.createdAt));
}

export async function getRoomMessages(roomId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(messages).where(eq(messages.roomId, roomId)).orderBy(desc(messages.createdAt));
}

// ============ NOTIFICATION QUERIES ============
export async function getUserNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt));
}

// ============ SONG PURCHASE TRACKING ============
export async function getUserSongPurchaseCount(userId: number, monthStart: Date, monthEnd: Date) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(songPurchases)
    .where(
      and(
        eq(songPurchases.userId, userId),
        gte(songPurchases.purchaseDate, monthStart),
        lte(songPurchases.purchaseDate, monthEnd)
      )
    );
  return result[0]?.count || 0;
}

export async function getUniqueSongArtistsForUser(userId: number, monthStart: Date, monthEnd: Date) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .selectDistinct({ artistId: songPurchases.artistId })
    .from(songPurchases)
    .where(
      and(
        eq(songPurchases.userId, userId),
        gte(songPurchases.purchaseDate, monthStart),
        lte(songPurchases.purchaseDate, monthEnd)
      )
    );
  return result.length;
}
