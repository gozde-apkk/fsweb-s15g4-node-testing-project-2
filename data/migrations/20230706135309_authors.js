/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('authors', tbl=>{
    tbl.increments("author_id").primary();
    tbl.string("name").notNullable().unique();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    //tablo varsa sil
  return knex.schema.dropTableIfExists("authors");
};
