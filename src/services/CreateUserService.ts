import User from '../models/User'
import { getRepository } from 'typeorm'

interface Request {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const checkUserExists = await userRepository.findOne({
      where: { email },
    })

    if (checkUserExists) {
      throw new Error('Email address already used')
    }

    const user = userRepository.create({
      name,
      email,
      password,
    })

    await userRepository.save(user)

    return user
  }
}
