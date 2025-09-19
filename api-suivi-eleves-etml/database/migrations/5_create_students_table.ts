import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Ajout des colonnes name et firstname
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      //fk
      table
        .integer('class_group_id')
        .unsigned()
        .references('id')
        .inTable('class_groups')
        .onDelete('CASCADE')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
