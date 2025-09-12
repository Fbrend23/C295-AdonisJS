import factory from '@adonisjs/lucid/factories'
import ClassGroup from '#models/class_group'

export const ClassGroupFactory = factory
  .define(ClassGroup, async ({ faker }) => {
    return { name: faker.airline.seat() }
  })
  .build()
