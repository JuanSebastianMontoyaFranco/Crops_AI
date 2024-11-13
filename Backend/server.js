const express = require('express');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Vars
let PORT;
process.env.NODE_ENV === 'production'
  ? (PORT = process.env.PROD_PORT) :
  process.env.NODE_ENV === 'test'
    ? (PORT = process.env.QA_PORT) :
    (PORT = process.env.DEV_PORT);

//instancia de express en app
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
  next();
});

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Private-Network: true');
    next();
  });
};

// settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
if (process.env.NODE_ENV === 'production') {
  // En producción, usas la ruta '/'
  app.use('/', apiRouter);
} else {
  // En desarrollo (o cualquier otro entorno), usas la ruta '/api'
  app.use('/api', apiRouter);
}


app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Running in ${process.env.NODE_ENV}`);
    console.log(`Server on port http://localhost:${PORT}`);
  } else {
    console.log(error);
  }
});


module.exports = app;
