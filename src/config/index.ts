import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  secret: process.env.SECRET,
  loginsecret: process.env.LOGINSECRET,
  expiresIn: process.env.EXPIREDTIME,
  logExpire: process.env.LOGINEXPIRE,
};
