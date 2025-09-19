import vine from '@vinejs/vine'

const teacherValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    firstname: vine.string().minLength(2).maxLength(255),
    email: vine.string().minLength(2).maxLength(255).email(),
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      // user est soit un objet (si trouvé), soit undefined (si non trouvé).
      // Explication du !!user :
      // Si user est un objet → !!user devient true
      // Si user est undefined → !!user devient false
      return !!user
    }),
  })
)
export { teacherValidator }
