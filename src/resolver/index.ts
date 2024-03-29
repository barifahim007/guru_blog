import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    mydata: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    singup: async (parent: any, args: any, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
