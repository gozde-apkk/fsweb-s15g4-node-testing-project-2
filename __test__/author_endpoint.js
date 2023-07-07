

const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config');


beforeAll (async() =>{
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
})

test('sanity chech', () =>{
    expect(process.env.NODE_ENV).toBe('testing');
})

describe('AUTHORS', () => {
    test('[1] get authors', async()=> {
        const res = await request(server).get('/api/authors');
        expect(res.body).toHaveLength(2);
    })
    test('[2] get authors by id', async()=> {
        const res = await request(server).get('/api/authors/1');
        expect(res.body).toHaveProperty('name','Arthur Conan Doyle');
    })
    test('[2] get authors by id', async()=> {
        const res = await request(server).get('/api/authors/2');
        expect(res.body).toHaveProperty('name','Ernest Hemingway');
    })
    test('[3] get authors by id', async()=> {
        const res = await request(server).get('/api/authors/5');
        expect(res.body).toEqual("")
        expect(res.body).toHaveLength(5);

    })
    test('[4] insert author', async()=> {
        const author = {name:'deneme'}
       const res = await request(server).post('/api/authors').send(author);
        expect(res.body).toHaveProperty('author_id');
    })
    test('[5] insert authors', async()=> {
        const author = {name:'deneme'}
        const author2 = {name:'deneme2'}
       await request(server).post('/api/authors').send(author);
       await request(server).post('/api/authors').send(author2);
       const res = await request(server).get('/api/authors');
        expect(res.body).toHaveLength(4);
    })
    test('[6] update author', async()=> {
        const author = {name:'deneme'}
       const res = await request(server).post('/api/authors').send(author);
       expect(res.body).toHaveProperty('message', 'Yazar zaten var')
      // const newAuthor = { name:'deneme3'}
       //7const updateRes = await request(server).put('/api/authors/${res.body.author_id}').send(newAuthor)
        //expect(updateRes).toHaveProperty('name' , 'deneme');
    })
    test('[7] update author', async()=> {
        const author = {name:'deneme'}
       const res = await request(server).post('/api/authors').send(author);
       const newAuthor = { name:'deneme4'}
       const updateRes = await request(server).put('/api/authors/${res.body.author_id}').send(newAuthor)
        expect(updateRes.body).toHaveProperty('name' , 'deneme4');
    })
    test('[8] delete author', async()=> {
       
       const res = await request(server).delete('/api/authors/5');
       expect(res.body).toHaveProperty('author_id', 5)
       const usersRes = await request(server).get('/api/authors');
        expect(updateRes.body).toHaveLength(4)
    })
    
    
});
