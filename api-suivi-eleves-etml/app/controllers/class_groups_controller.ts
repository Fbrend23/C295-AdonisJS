import Class_group from '#models/class_group'
import type { HttpContext } from '@adonisjs/core/http'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const classGroup = await Class_group.query().orderBy('name')
    response.ok(classGroup)
    return classGroup
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name } = await request.validateUsing(classGroupValidator)
    // Création d'un nouvel élève avec les données validées
    const classgroup = await Class_group.create({ name })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les
    // données de l'élève créé
    return response.created(classgroup)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Class_group.findOrFail(params.id)
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
    const data = await request.validateUsing(classGroupValidator)

    //Vérification de l'existence de l'élève
    const classGroup = await Class_group.findOrFail(params.id)

    classGroup.merge(data)

    await classGroup.save()

    return classGroup
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const classgroup = await Class_group.findOrFail(params.id)

    return await classgroup.delete()
  }
}
