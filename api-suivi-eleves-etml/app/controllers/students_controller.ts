import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator } from '#validators/student'
import { getStudentsQueryValidator } from '#validators/get_students_query'
export default class StudentsController {
  /**
   * Afficher la liste des élèves
   */
  async index({ response, request }: HttpContext) {
    // Récupère les paramètres de pagination de la requête
    const {
      page = 1,
      limit = 10,
      sort = 'name',
      order = 'asc',
      classGroupId, // ID de la classe pour filtrer les étudiants
      search,
    } = await request.validateUsing(getStudentsQueryValidator)

    // Récupère tous les étudiants avec leurs classes et commentaires
    // Les étudiants sont triés par nom et prénom, puis paginés
    // A noter que await n'est pas présent
    const query = Student.query().preload('classGroups').preload('comments')
    if (classGroupId) {
      query.where('classGroupId', classGroupId) // Filtre les étudiants par ID
      // de classe
    }
    // Recherche sur le nom et le prénom des étudiants
    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('name', `%${search}%`).orWhereILike('firstname', `%${search}%`)
      })
    }
    // Tri des étudiants par le champ spécifié (sort) et l'ordre (asc ou desc)
    query.orderBy(sort, order as 'asc' | 'desc')
    // A noter que le await est nécessaire pour exécuter la requête
    // et volontairement omis précédemment pour éviter l'exécution prématurée
    const students = await query.paginate(page, limit) // Pagination des résultats
    // affiche correctement le chemin (/students),
    students.baseUrl('/students')
    // conserve les paramètres (recherche, tri, etc.).
    students.queryString({ page, limit, sort, order, classGroupId, search })
    // On utilise `response.ok` pour retourner un code HTTP 200 avec les données
    // des élèves
    return response.ok(students)
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
