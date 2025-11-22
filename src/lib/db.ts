import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// standard behaviour: on hotreloads initialises new prisma instances
// solution: global variable is unaffected by hotreloads, the below type ensures no new instances are created during hotreload

// storing a new prisma client property to the global obj variable
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// const prisma = new PrismaClient(); // production env expected workflow

export default prisma;
