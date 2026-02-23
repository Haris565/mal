import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access_token_secret";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });
};
