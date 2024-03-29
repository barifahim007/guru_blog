import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../shared/interface";
import config from "../config";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    mydata: async (parent: any, args: IUser, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    singup: async (parent: any, args: IUser, context: any) => {
      // bcrypt user
      const hashpasword = await bcrypt.hash(args.password, 12);
      // create and save user
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashpasword,
        },
      });
      // jwt
      const token = jwt.sign({ userId: newUser.id }, config.secret as string, {
        expiresIn: config.expiresIn,
      });
      return {
        token,
      };
    },

    // user SingIn
    singin: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        return {
          userError: " please provide valid email...!",
          token: null,
        };
      }
      const validUser = await bcrypt.compare(args.password, user?.password);

      if (!validUser) {
        return {
          userError: "password incorrect!",
          token: null,
        };
      }

      const token = await jwt.sign(
        { user: user.id },
        config.loginsecret as string,
        {
          expiresIn: config.logExpire,
        }
      );
      return {
        userError: null,
        token,
      };
    },
  },
};
