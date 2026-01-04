const http = require('http');
const app = require('./app');


const server = http.createServer(app);

const PORT = process.env.PORT;


server.listen(3001, () => {
    console.log(` 🤞User service is running at ${PORT}`);
});