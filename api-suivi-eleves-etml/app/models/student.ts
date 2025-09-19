import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from '#models/class_group'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from '#models/comment'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare firstname: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //FK
  @column()
  declare class_group_id: number
  //Relations
  @belongsTo(() => ClassGroup)
  declare classGroups: BelongsTo<typeof ClassGroup>
  // Relation : 1 élève -> N commentaires
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
