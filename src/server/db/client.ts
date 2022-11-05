import { PrismaClient } from "@prisma/client";

import { env as environment } from "../../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      environment.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (environment.NODE_ENV !== "production") {
  global.prisma = prisma;
}
