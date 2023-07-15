//supertest ile yapılır
const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");
//testlerden önce databasein temiz olmasını isteriz
beforeAll(async () => {
  await db.migrate.rollback(); //temizlesin
  await db.migrate.latest(); //son halini getir
  await db.seed.run();
});
test("sanity check", () => {
  expect(process.env.NODE_ENV).toBe("testing"); //db.config'de const environment = process.env.NODE_ENV || "development"; yazdık, bunu test ediyoruz.varsa testing ypksa development alacak
});

describe("AUTHORS", () => {
  test("[1] get authors", async () => {
    const res = await request(server).get("/api/authors");
    expect(res.body).toHaveLength(2);
  });
  test("[2] get authors by id", async () => {
    const res = await request(server).get("/api/authors/1");
    expect(res.body).toHaveProperty("name", "Arthur Doyle");
  });
  test("[3] get authors by id", async () => {
    const res = await request(server).get("/api/authors/2");
    expect(res.body).toHaveProperty("name", "Ernest Hemingway");
  });
  test("[4] get authors by id", async () => {
    const res = await request(server).get("/api/authors/5");
    expect(res.body).toHaveLength(0);
  });
  test("[5] insert author", async () => {
    const author = { name: "deneme" };
    const res = await request(server).post("/api/authors").send(author);
    expect(res.body).toHaveProperty("author_id");
  });
  test("[6] insert author", async () => {
    const author = { name: "deneme" };
    const author2 = { name: "deneme2" };
    await request(server).post("/api/authors").send(author);
    await request(server).post("/api/authors").send(author2);
    const res = await request(server).get("/api/authors");
    expect(res.body).toHaveLength(4);
  });
  test("[7] update author", async () => {
    //aslında middleware testi yaptık
    const author = { name: "deneme" };
    const res = await request(server).post("/api/authors").send(author);

    expect(res.body).toHaveProperty("message", "Yazar zaten var");
  });
  test("[8] update author", async () => {
    const author = { name: "deneme3" };
    const res = await request(server).post("/api/authors").send(author);
    const newAuthor = { name: "deneme4" };
    const updateRes = await request(server)
      .put(`/api/authors/${res.body.author_id}`)
      .send(newAuthor);
    expect(updateRes.body).toHaveProperty("name", "deneme4");
  });
  test("[9] delete author", async () => {
    const res = await request(server).delete("/api/authors/5");
    expect(res.body).toHaveProperty("author_id", 5);
    const usersRes = await request(server).get("/api/authors");
    expect(usersRes.body).toHaveLength(4);
  });
});
