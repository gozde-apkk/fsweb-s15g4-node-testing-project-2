const server = require("./api/server");

const PORT = 9001;


server.listen(PORT , () =>{
    console.log(`Server listenin on port ${PORT}`)
})