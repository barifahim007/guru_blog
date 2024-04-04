import { IUser } from "../../shared/interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../utils/jwtHelper";

export const Mutation = {
  singup: async (parent: any, args: IUser, { prisma }: any) => {
    const isExsit = await prisma.user.findFirst({
      where: { email: args.email },
    });

    if (isExsit) {
      return {
        userError: "user already registerd...",
        token: null,
      };
    }

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

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    // jwt
    const token = await jwtHelpers({ userId: newUser.id });

    return {
      token,
    };
  },

  // user SingIn
  singin: async (parent: any, args: IUser, { prisma }: any) => {
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

    const token = await jwtHelpers({ userId: user.id });
    return {
      userError: null,
      token,
    };
  },
};
