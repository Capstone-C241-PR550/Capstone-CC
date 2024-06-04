import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'


export default class Record extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public saldo: number

  @column()
  public investasi: number

  @column()
  public hutang: number

  @column()
  public label: string

  @column()
  public user_Id: number // Foreign key column


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
