import dotenv from 'dotenv'
dotenv.config()

export default {
  jwt: {
    secret: process.env.PRIVATE_KEY,
    expiresIn: process.env.EXPIRE_AUTH,
  },
}
