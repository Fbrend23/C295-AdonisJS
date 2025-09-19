import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import ClassGroup from '#models/class_group'
import Comment from '#models/comment'
import User from '#models/user'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare firstname: string
  @column()
  declare email: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fk
  @column()
  declare userId: number

  //Relations
  // Relation : enseignant → classes
  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>
  // Relation : 1 enseignant → N commentaires
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
  // Relation : 1 enseignant → 1 utilisateur
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
