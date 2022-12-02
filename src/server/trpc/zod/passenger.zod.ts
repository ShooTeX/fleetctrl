import { z } from "zod";
import { pointSchema } from "./point.zod";

export const createPassengerSchema = z.object({
  name: z.string(),
  origin: pointSchema,
  destination: pointSchema,
});
