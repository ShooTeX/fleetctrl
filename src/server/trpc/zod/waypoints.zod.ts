import { z } from "zod";

export const waypointsSchema = z
  .array(
    z.object({
      coordinates: z.tuple([z.number(), z.number()]),
    })
  )
  .min(2);
