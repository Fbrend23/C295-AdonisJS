import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator } from '#validators/student'
export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.ok(Student)
    return await Student.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname } = await request.validateUsing(studentValidator)
    // Création d'un nouvel élève avec les données validées
    const student = await Student.create({ name, firstname })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les
    // données de l'élève créé
    return response.created(student)
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
    const data = await request.validateUsing(studentValidator)

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
