import { z } from "zod";

export const pointSchema = z.tuple([z.number(), z.number()]);
