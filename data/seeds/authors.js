

const authors = [
    {name:"Artur Conan Doyle"},
    {name:"Ernest Hemingway"}
]





exports.seed = function (knex) {
    return knex('authors').insert(authors)
}