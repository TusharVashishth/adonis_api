import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Posts extends BaseSchema {
  protected tableName = "posts";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string("image", 255).notNullable().after("description");
      table.string("image_url", 255).notNullable().after("image");
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns("image", "image_url");
    });
  }
}
