import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Teacher from '#models/teacher'
import ClassGroup from '#models/class_group'

export default class ClassGroupSeeder extends BaseSeeder {
  public async run() {
    const teachers = await Teacher.all()
    await ClassGroup.createMany([
      { name: 'CIN1A', teacherId: teachers[0].id },
      { name: 'CIN1B', teacherId: teachers[1].id },
      { name: 'CIN1C', teacherId: teachers[2].id },
      { name: 'FID1', teacherId: teachers[3].id },
      { name: 'FID2', teacherId: teachers[4].id },
      { name: 'CID2A', teacherId: teachers[5].id },
      { name: 'CID2B', teacherId: teachers[6].id },
    ])
  }
}
