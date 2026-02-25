import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getVerifiedArtists,
  getArtistByUserId,
  getTopTracks,
  getTracksByArtistId,
  getProductsByType,
  getProductsByArtistId,
  getActiveCollabProjects,
  getCollabProjectsByArtistId,
  getProjectInvestments,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createLocalUser, findUserByEmail } = await import("./db");
        const { createInMemoryUser, findInMemoryUserByEmail } = await import("./inMemoryStore");

        // Try database first, fall back to in-memory
        let existingUser;
        try {
          existingUser = await findUserByEmail(input.email);
        } catch (e) {
          existingUser = findInMemoryUserByEmail(input.email);
        }

        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Create user (database or in-memory)
        try {
          await createLocalUser(input.email, input.password, input.name);
        } catch (e) {
          console.log("[Auth] Database not available, using in-memory storage");
          createInMemoryUser(input.email, input.password, input.name);
        }

        // Create session (using email as openId for local auth)
        const { sdk } = await import("./_core/sdk");
        const sessionToken = await sdk.createSessionToken(input.email, {
          name: input.name,
          expiresInMs: 365 * 24 * 60 * 60 * 1000, // 1 year
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000
        });

        return { success: true, email: input.email };
      }),
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { findUserByEmail } = await import("./db");
        const { findInMemoryUserByEmail } = await import("./inMemoryStore");

        // Try database first, fall back to in-memory
        let user;
        try {
          user = await findUserByEmail(input.email);
        } catch (e) {
          user = findInMemoryUserByEmail(input.email);
        }

        if (!user || user.password !== input.password) {
          throw new Error("Invalid email or password");
        }

        // Create session
        const { sdk } = await import("./_core/sdk");
        const sessionToken = await sdk.createSessionToken(input.email, {
          name: user.name || "",
          expiresInMs: 365 * 24 * 60 * 60 * 1000, // 1 year
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000
        });

        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
      }),
  }),

  artists: router({
    getVerified: publicProcedure.query(async () => {
      return await getVerifiedArtists();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getArtistByUserId(input);
    }),
  }),

  tracks: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().default(20) }).optional())
      .query(async ({ input }) => {
        return await getTopTracks(input?.limit || 20);
      }),
    getByArtistId: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getTracksByArtistId(input);
    }),
  }),

  products: router({
    getByType: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await getProductsByType(input);
    }),
    getByArtistId: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getProductsByArtistId(input);
    }),
  }),

  projects: router({
    getActive: publicProcedure.query(async () => {
      return await getActiveCollabProjects();
    }),
    getByArtistId: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getCollabProjectsByArtistId(input);
    }),
    getInvestments: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getProjectInvestments(input);
    }),
  }),
});

export type AppRouter = typeof appRouter;
