import { IUser } from "../../shared/interface";

export const Query = {
  mydata: async (parent: any, args: IUser, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
