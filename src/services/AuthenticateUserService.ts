import User from '../models/User'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'

import { sign } from 'jsonwebtoken'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = await getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, process.env.PRIVATE_KEY, {
      subject: user.id,
      expiresIn: '5d',
    })

    return {
      user,
      token,
    }
  }
}
