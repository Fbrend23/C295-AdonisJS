/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ClassGroupsController = () => import('#controllers/class_groups_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const StudentsController = () => import('#controllers/students_controller')
const CommentsController = () => import('#controllers/comments_controller')
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'

router.get('test', async () => {
  return 'API is working !'
})
router
  .group(() => {
    router.resource('students', StudentsController).apiOnly()
    router.resource('classGroups', ClassGroupsController).apiOnly()
    router.resource('teachers', TeachersController).apiOnly()

    // Routes imbriquées sur les commentaires
    // pour le CRUD /students/:student_id/comments
    router
      .group(() => {
        router.resource('comments', CommentsController).apiOnly()
      })
      .prefix('students/:student_id')
  })
  .use(middleware.auth())

// Routes pour l'authentification
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')
