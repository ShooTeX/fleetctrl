import { router, publicProcedure } from "../trpc";
import { createPassengerSchema } from "../zod/passenger.zod";

export const passengerRouter = router({
  create: publicProcedure
    .input(createPassengerSchema)
    .mutation(async ({ input, ctx }) => {
      const passenger = await ctx.prisma.passenger.create({
        data: {
          name: input.name,
        },
      });

      // INFO: prisma doesn't support postgis yet, so this is a dirty and expensive workaround

      await ctx.prisma.$executeRawUnsafe(
        `
        UPDATE "Passenger"
        SET origin = point(${input.origin.join(",")}) 
        WHERE id = '${passenger.id}';
        `
      );
      return ctx.prisma.$executeRawUnsafe(
        `
        UPDATE "Passenger"
        SET destination = point(${input.destination.join(",")}) 
        WHERE id = '${passenger.id}';
        `
      );
    }),
});
