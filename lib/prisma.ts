import { PrismaClient } from "@prisma/client";

// Prevent creating multiple instances of PrismaClient in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optional for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
