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
  models.Patient
    .find()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log('error retrieving all patients from database', err);
      res.status(400).send();
    });
});

app.get('/appointment/:patientID', (req, res) => {
  models.Appt
    .find({patientID: req.params.patientID})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log('error retrieving all appointments from database', err);
      res.status(400).send();
    });
});

app.post('/appointment', (req, res) => {
  new models.Appt(req.body)
    .save((err, doc) => {
      console.log('appointment saved');
      models.Appt
        .find({patientID: doc.patientID})
        .then(response => {
          res.status(201).send(response);
        })
        .catch(err => {
          console.log('error retrieving complete list of appointments: ', err);
          res.status(400).send();
        });
    })
    .catch(err => {
      console.log('error adding appt to database: ', err);
      res.status(400).send();
    });
});
