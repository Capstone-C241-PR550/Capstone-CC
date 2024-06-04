import Record from 'App/Models/Record'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RecordsController {
    public async store({ auth, request, response }: HttpContextContract) {
    const {saldo, investasi, hutang} = request.body()
    try {
        const records = await Record.create({
          saldo: saldo,
          investasi: investasi,
          hutang: hutang,
          userId: auth.user.id
        })
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async index({ auth, response }: HttpContextContract) {

    try {

        const records = await Record.query().select('*').where('user_id',auth.user.id)
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async show({ auth ,params, response }: HttpContextContract) {
    try {
      const id = params.id

      if (!id) {
        return response.status(400).json({ code: 400, status: 'error', message: 'No Data Existed' })
      }

      const records = await Record.query().where('user_id', auth.user.id).where('id', id)

      if (records.length === 0) {
        return response.status(404).json({ code: 404, status: 'error', message: 'No records found for this user' })
      }

      return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

public async update({ params, request, response }: HttpContextContract) {
    // const input = request.only(['saldo', 'investasi', 'hutang'])
    const {saldo, investasi, hutang} = request.body()
    const id = params.id
    try {
        // const records = await Record.query().where('user_id',auth.user.id).where('id',id)
        const records = await Record.findOrFail(id)
        await records.merge({
          saldo:saldo,
          investasi:investasi,
          hutang:hutang
        }).save()
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

public async destroy({ params, response }: HttpContextContract) {
    try {
        const records = await Record.findOrFail(params.id)
        await records?.delete()
        return response.status(200).json({ code: 200, status: 'success', data: records })
    } catch (err) {
        return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
}

}
