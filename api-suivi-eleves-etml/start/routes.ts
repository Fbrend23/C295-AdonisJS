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
router.get('test', async () => {
  return 'API is working !'
})

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
/* est équivalent à :
router.group(() => {
 router.get('', [StudentsController, 'index'])
 router.get(':id', [StudentsController, 'show'])
 router.post('', [StudentsController, 'store'])
 router.put(':id', [StudentsController, 'update'])
 router.patch(':id', [StudentsController, 'update'])
 router.delete(':id', [StudentsController, 'destroy'])
}).prefix('students')
*/
