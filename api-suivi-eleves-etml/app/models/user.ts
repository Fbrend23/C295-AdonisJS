import { BaseSchema } from '@adonisjs/lucid/schema'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'], // ATTENTION à bien modifier ICI aussi.
  passwordColumnName: 'password',
})
export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare username: string
  @column({ serializeAs: null })
  declare password: string
  @column()
  declare role: string // Ce champ sera utilisé dans la prochaine étape pour la gestion des rôles.
  // Relation : 1 Utilisateur → 1 Enseignant
  @hasOne(() => Teacher)
  declare teacher: HasOne<typeof Teacher>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
