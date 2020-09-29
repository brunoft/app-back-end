import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  saldo: number;
}


class CreateUserService {

  public async execute({ name, email, saldo, password}: Request): Promise<User> {
    const usersRepository = getRepository(User);
    
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      saldo: 0,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }

}

export default CreateUserService;