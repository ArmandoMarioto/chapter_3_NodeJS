import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
    driver_license: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "85052adbb99a3da77cbe9050eb7167d0", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        driver_license: user.driver_license,
      },
      token,
    };
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
