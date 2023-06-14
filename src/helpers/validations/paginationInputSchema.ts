import { z } from "zod";

export const paginationInputSchema = z.object({
  take: z.number(),
  cursor: z.number().min(0).default(0),
});
