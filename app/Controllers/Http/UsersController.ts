import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const user = await User.findOrFail(id)

      return response.json(user)
    } catch (err) {
      return response.badRequest({ message: 'Erro ao tentar buscar o usuário' })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all()

      return response.json(users)
    } catch (err) {
      return response.badRequest({ message: 'Erro ao tentar buscar os usuários' })
    }
  }
}
