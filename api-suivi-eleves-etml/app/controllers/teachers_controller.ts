import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator } from '#validators/teacher'
export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const teacher = await Teacher.query().orderBy('name').orderBy('firstname')
    response.ok(teacher)
    return teacher
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    // Création d'un nouvel élève avec les données validées
    const teacher = await Teacher.create({ name, firstname, email })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les
    // données de l'élève créé
    return response.created(teacher)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Teacher.findOrFail(params.id)
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
    const data = await request.validateUsing(teacherValidator)

    //Vérification de l'existence de l'élève
    const teacher = await Teacher.findOrFail(params.id)

    teacher.merge(data)

    await teacher.save()

    return teacher
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    return await teacher.delete()
  }
}
