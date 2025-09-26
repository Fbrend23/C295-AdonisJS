import User from '#models/user'
import Comment from '#models/comment'
import { BasePolicy } from '@adonisjs/bouncer'
import Teacher from '#models/teacher'
export default class CommentPolicy extends BasePolicy {
  private async isOwner(user: User, comment: Comment): Promise<boolean> {
    const teacher = await Teacher.query()
      .where('id', comment.teacherId)
      .where('userId', user.id)
      .select('id') // on réduit la charge
      .first()
    return !!teacher
  }
  // Peut mettre à jour un commentaire
  async update(user: User, comment: Comment) {
    return user.role === 'admin' || this.isOwner(user, comment)
  }
  // Peut supprimer un commentaire
  async delete(user: User, comment: Comment) {
    return user.role === 'admin' || this.isOwner(user, comment)
  }
  // Peut créer un commentaire (par défaut : tous les enseignants)
  async create(user: User) {
    return user.role === 'teacher' || user.role === 'admin'
  }
  // Peut voir un commentaire (par défaut : tous les enseignants)
  async view(user: User, comment: Comment) {
    return user.role === 'teacher' || user.role === 'admin'
  }
}
