import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { waypointsSchema } from "../zod/waypoints.zod";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getDirections: publicProcedure
    .input(z.object({ waypoints: waypointsSchema }))
    .query(async ({ ctx, input: { waypoints } }) => {
      const result = await ctx.mbx
        .getDirections({
          waypoints,
          profile: "driving-traffic",
          overview: "full",
        })
        .send();
      return result.body;
    }),
});
