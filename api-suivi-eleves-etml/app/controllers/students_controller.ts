import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(students)
    return await Student.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const student = request.only(['name', 'firstname'])
    response.created()
    return await Student.create(student)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Student.findOrFail(params.id)
  }

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    //Récupération des données
    const data = request.only(['name', 'firstname'])

    //Vérification de l'existence de l'élève
    const student = await Student.findOrFail(params.id)

    student.merge(data)

    await student.save()

    return student
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const student = await Student.findOrFail(params.id)

    return await student.delete()
  }
}
