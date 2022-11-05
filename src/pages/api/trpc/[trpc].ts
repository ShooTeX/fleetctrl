import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env as environment } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    environment.NODE_ENV === "development"
      ? ({ path, error }) => {
          // TODO: add logger
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, no-console
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
