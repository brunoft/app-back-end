import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}


class AuthenticateUserService {
  public async execute ({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('incorrect email/password combination');
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({ }, 'd69b45d14c2619949fc6e225e51c8a4e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };

  }
}

export default AuthenticateUserService;