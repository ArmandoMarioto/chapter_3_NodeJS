import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error("JWT token is missing");
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub } = verify(
      token,
      "85052adbb99a3da77cbe9050eb7167d0"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);
    if (!user) {
      throw new Error("User not found");
    }
    next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
