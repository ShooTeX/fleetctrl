import { router } from "../trpc";
import { exampleRouter } from "./example";
import { passengerRouter } from "./passenger";

export const appRouter = router({
  example: exampleRouter,
  passenger: passengerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
