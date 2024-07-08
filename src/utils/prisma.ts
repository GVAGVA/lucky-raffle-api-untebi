import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const pgUrl = process.env.PG_DATABASE_URL;
const sqlUrl = process.env.SQL_DATABASE_URL;

export class PrismaService extends PrismaClient {
  constructor(dbType: "postgres" | "mysql") {
    super({
      datasources: {
        db: {
          url: dbType === "postgres" ? pgUrl : sqlUrl,
        },
      },
    });
  }
}
