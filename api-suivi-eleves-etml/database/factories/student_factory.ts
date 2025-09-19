import Factory from '@adonisjs/lucid/factories'
import Student from '#models/student'
import ClassGroup from '#models/class_group'

export const StudentFactory = Factory.define(Student, async ({ faker }) => {
  const groups = await ClassGroup.all()
  const randomGroup = groups[Math.floor(Math.random() * groups.length)]
  return {
    name: faker.person.lastName(),
    firstname: faker.person.firstName(),
    class_group_id: randomGroup.id,
  }
}).build()
