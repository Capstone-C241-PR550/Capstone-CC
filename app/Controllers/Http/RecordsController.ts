import Record from 'App/Models/Record'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RecordsController { 
    public async store({ request, response }: HttpContextContract) {
    const input = request.only([ 'saldo', 'investasi', 'hutang', 'label', 'user_id'])
    try {
        const records = await Record.create(input)
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async index({ response }: HttpContextContract) {
    try {
        const records = await Record.all()
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async show({ params, response }: HttpContextContract) {
    try {
      const userId = params.user_id

      if (!userId) {
        return response.status(400).json({ code: 400, status: 'error', message: 'User ID is required' })
      }

      const records = await Record.query().where('user_id', userId)

      if (records.length === 0) {
        return response.status(404).json({ code: 404, status: 'error', message: 'No records found for this user' })
      }

      return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['saldo', 'investasi', 'hutang'])
    try {
        const records = await Record.findBy('user_id', params.user_id)
        records?.merge(input)
        await records?.save()
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async destroy({ params, response }: HttpContextContract) {
    try {
        const records = await Record.findBy('user_id', params.user_id)
        await records?.delete()
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}
    
}
