const express = require('express');
const cors = require('cors');

const router = require('./routes');
const { appPort } = require('./config/config');
const { statics } = require('./utils/static');

const app = express();

// cors
// app.use(cors({
//   origin: [`localhost:${appPort}`],
//   credentials: true
// }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// req encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// statics
statics(app);

// router
app.use('/', router());

app.listen(
  appPort,
  () => console.log('\x1b[32m', `-----------  Server running : ${appPort}  -----------`, '\x1b[0m')
);