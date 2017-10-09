const express = require('express');
const bodyParser = require('body-parser');
const models = require('../database/mongoose');
// const redis = require('../database/redis');
// const pg = require('../database/postgres');
const seedDatabase = require('./seedFile');

const app = express();

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../src/client/'));

app.post('/login', (req, res) => {
  console.log('req.body: ', req.body);
});

app.get('/seed', (req, res) => {
  seedDatabase();
  res.end();
});

app.get('/patient', (req, res) => {
  models.Patient.find().then(response => {
    res.status(200).send(response);
  });
});
