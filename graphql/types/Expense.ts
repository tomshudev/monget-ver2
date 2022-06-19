import { Category, Expense as ExpenseType } from "@prisma/client";
import {
    extendType,
    floatArg,
    intArg,
    nonNull,
    objectType, stringArg
} from "nexus";
import { DateScalar } from "../schema";

export const Expense = objectType({
  name: "Expense",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.float("expense");
    t.string("category");
    // @ts-ignore
    t.date("date");
    t.string("storeName");
    t.string("description");
  },
});

export const CreateExpenseMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createExpense", {
      type: Expense,
      args: {
        expense: nonNull(floatArg()),
        userId: nonNull(stringArg()),
        category: nonNull(stringArg()),
        storeName: nonNull(stringArg()),
        description: stringArg(),
        date: nonNull(DateScalar),
      },
      async resolve(_parent, args, ctx) {
        const newExpense = { ...args, category: args.category as Category };

        return await ctx.prisma.expense.create({
          data: newExpense,
        });
      },
    });
  },
});

export const Edge = objectType({
  name: "Edge",
  definition(t) {
    t.string("cursor");
    t.field("node", {
      type: Expense,
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.string("endCursor");
    t.boolean("hasNextPage");
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.field("pageInfo", { type: PageInfo });
    t.list.field("edges", { type: Edge });
  },
});

export const ExpensesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("expenses", {
      type: "Response",
      args: {
        first: intArg(),
        after: stringArg(),
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        let queryResults: ExpenseType[] | null = null;

        const baseQuery = {
          take: args.first!,
          where: {
            userId: args.userId,
          },
        };

        if (args.after) {
          queryResults = await ctx.prisma.expense.findMany({
            skip: 1,
            cursor: {
              id: args.after,
            },
            ...baseQuery,
          });
        } else {
          queryResults = await ctx.prisma.expense.findMany({
            ...baseQuery,
          });
        }

        if (queryResults.length > 0) {
          const lastExpenseInResult = queryResults[queryResults.length - 1];
          const cursor = lastExpenseInResult.id;

          const secondQueryResults = await ctx.prisma.expense.findMany({
            cursor: {
              id: cursor,
            },
            skip: 1,
            ...baseQuery,
          });

          return {
            edges: queryResults.map((expense) => ({
              cursor: expense.id,
              node: expense,
            })),
            pageInfo: {
              endCursor: cursor,
              hasNextPage: secondQueryResults.length >= args.first!,
            },
          };
        }

        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});
