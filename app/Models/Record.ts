import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'


export default class Record extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public penghasilan_bulanan: number

  @column()
  public pengeluaran_bulanan: number

  @column()
  public tabungan_bulanan: number

  @column()
  public label: string

  @column()
  public userId: string // Foreign key column


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
