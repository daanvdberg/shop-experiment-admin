import { z } from "zod";
import { paginationInputSchema } from "~/helpers/validations/paginationInputSchema";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Sort } from "~/types";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
        sort: z.nativeEnum(Sort),
      })
    )
    .query(async ({ ctx, input }) => {
      const { take, skip, sort } = input;

      const categories = await ctx.prisma.category.findMany({
        where: {
          deleted: false,
        },
        // select: {
        //   id: true,
        //   image: true,
        //   name: true,
        //   description: true,
        //   createdAt: true,
        //   updatedAt: true,
        //   slug: true,
        //   _count: {
        //     select: {
        //       products: true,
        //     },
        //   },
        // },
        take: take,
        skip: skip,
        orderBy: {
          ...(sort === Sort.Asc && { id: "asc" }),
          ...(sort === Sort.Desc && { id: "desc" }),
          ...(sort === Sort.NameAsc && { name: "asc" }),
          ...(sort === Sort.NameDesc && { name: "desc" }),
        },
      });

      console.log(11, categories);
      console.log(22, categories[take - 1]?.id);
      console.log(33, categories[-take - 1]?.id);

      return {
        categories,
        nextCursor:
          categories.length < take ? undefined : categories[take - 1]?.id,
        prevCursor:
          categories.length < take ? undefined : categories[take - 1]?.id,
      };
    }),
});
