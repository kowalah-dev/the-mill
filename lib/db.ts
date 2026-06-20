/**
 * Prisma client singleton.
 *
 * Next.js hot-reloads modules in development, which would otherwise create a
 * new PrismaClient (and a new connection pool) on every reload. Caching the
 * client on `globalThis` keeps a single instance across reloads.
 *
 * Import this everywhere you touch the database — all data access goes through
 * Prisma, never raw SQL.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
