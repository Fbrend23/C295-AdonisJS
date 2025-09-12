import factory from '@adonisjs/lucid/factories'
import ClassGroup from '#models/class_group'

export const ClassGroupFactory = factory
  .define(ClassGroup, async ({ faker }) => {
    return {
      name: faker.word.words(1),
      teacher_id: null,
    }
  })
  .build()
