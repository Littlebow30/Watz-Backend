require('dotenv').config();
const app = require('express');
const server = express();

const { PORT = 8080 } = process.env;

server.use(express.json());
server.use(express.urlecoded({extended: true}));

server.use('/api', require('./api'));

server.get('*', (req, res) => {
    res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
  });

server.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name: error.name, message: error.message, table: error.table});
  });

app.listen(
    PORT,
    () => console.log(`its on: ${PORT}`)
)
