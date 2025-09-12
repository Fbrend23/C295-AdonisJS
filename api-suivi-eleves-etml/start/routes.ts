/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ClassGroupsController = () => import('#controllers/class_groups_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const StudentsController = () => import('#controllers/students_controller')
import router from '@adonisjs/core/services/router'

router.get('test', async () => {
  return 'API is working !'
})

router.resource('students', StudentsController).apiOnly()
router.resource('classGroups', ClassGroupsController).apiOnly()
router.resource('teachers', TeachersController).apiOnly()

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
