import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Teacher from '#models/teacher'
import Student from '#models/student'

export default class ClassGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //fk
  @column({ columnName: 'teacher_id' })
  declare teacherId: number

  // Relation : 1 classe → 1 enseignant
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>
  @hasMany(() => Student)
  declare student: HasMany<typeof Student>
}
