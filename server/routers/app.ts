import { createRouter } from "../context";
import { z } from "zod";
import { prisma } from "../prisma";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .query("stars", {
    async resolve() {
      const stars = await prisma.star.findMany();
      return stars;
    },
  })
  .query("star", {
    input: z.number(),
    async resolve({ input }) {
      const star = await prisma.star.findUnique({ where: { id: input } });
      return star;
    },
  });
