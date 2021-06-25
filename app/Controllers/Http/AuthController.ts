import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
  public async signin({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = await User.findBy('email', email)
      return response.json({ user, token })
    } catch (error) {
      console.log(error)
      return response.badRequest({ message: 'Invalid credentials' })
    }
  }

  public async signup({ request, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])

    try {
      const userExist = await User.findBy('email', email)

      if (userExist) {
        return response.badRequest({ message: 'Usuário já existe' })
      }

      const user = await User.create({ name, email, password })
      return response.send(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ message: 'Erro ao tentar criar usuário' })
    }
  }
}
