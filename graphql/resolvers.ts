import { Context } from "./context";

export const resolvers = {
  Query: {
    expenses: async (_parent: any, _args: any, ctx: Context) =>
      await (await ctx.prisma.expense.findMany()),
  },
};
