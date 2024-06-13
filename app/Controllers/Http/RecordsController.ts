import Record from 'App/Models/Record'
import Env from '@ioc:Adonis/Core/Env'

const axios = require('axios')

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RecordsController {
    public async store({ auth, request, response }: HttpContextContract) {
    const {penghasilan_bulanan, pengeluaran_bulanan, tabungan_bulanan} = request.body()


    try {
        const predict = await this.predict({
          penghasilan_bulanan: penghasilan_bulanan,
          pengeluaran_bulanan: pengeluaran_bulanan,
          tabungan_bulanan: tabungan_bulanan,
        })

        const records = await Record.create({
          penghasilan_bulanan: penghasilan_bulanan,
          pengeluaran_bulanan: pengeluaran_bulanan,
          tabungan_bulanan: tabungan_bulanan,
          label: predict.predicted_label,
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
    // const input = request.only(['penghasilan_bulanan', 'pengeluaran_bulanan', 'tabungan_bulanan'])
    const {penghasilan_bulanan, pengeluaran_bulanan, tabungan_bulanan} = request.body()
    const id = params.id
    try {
        // const records = await Record.query().where('user_id',auth.user.id).where('id',id)
        const records = await Record.findOrFail(id)

        const predict = await this.predict({
          penghasilan_bulanan: penghasilan_bulanan,
          pengeluaran_bulanan: pengeluaran_bulanan,
          tabungan_bulanan: tabungan_bulanan,
        })

        await records.merge({
          penghasilan_bulanan:penghasilan_bulanan,
          pengeluaran_bulanan:pengeluaran_bulanan,
          tabungan_bulanan:tabungan_bulanan,
          label: predict.predicted_label
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


private async predict(data) {
  const url = Env.get('ML_URL')


  const predict = await axios.post(url,data)

  return predict.data

  }
}
