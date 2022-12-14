import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
    throw new AppError("JWT token is missing", 401);
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
      throw new AppError("User not found", 401);
    }
    request.user = {
      id: user.id,
    };
    next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
