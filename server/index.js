const express = require('express');
const bodyParser = require('body-parser');
const models = require('../database/mongoose');
const redis = require('../database/redis');
const seedDatabase = require('./seedFile');
const hasher = require('password-hash-and-salt');

const app = express();

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../src/client/'));

app.post('/login', (req, res) => {
  redis.hgetall(req.body.username, (err, obj) => {
    if (obj === null) {
      res.status(200).send('invalid');
    } else {
      hasher(req.body.password).verifyAgainst(obj.password, (err, verified) => {
        if (err) {
          console.log('error verifying hash: ', err);
          res.status(400).send();
        } else if (!verified) {
          res.status(200).send('invalid');
        } else {
          if (obj.userType === 'patient') {
            models.Patient
              .find({patientID: req.body.username})
              .then(response => {
                response = {
                  patient: response[0],
                  userType: obj.userType,
                };
                res.status(200).send(response);
              })
              .catch(err => {
                console.log('error finding patient by patientID in DB: ', err);
              });
          } else {
            res.status(200).send(obj.userType);
          }
        }
      });
    }
  });
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

// app.get('/patient/:patientID', (req, res) => {
//   models.Patient
//     .find({patientID: req.params.patientID})
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(err => {
//       console.log('error finding current patient in DB: ', err);
//     });
// });

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

app.put('/appointment/cancel', (req, res) => {
  models.Appt
    .findById(req.body._id, (err, appt) => {
      appt.set({isCancelled: true, message: req.body.message});
      appt
        .save((err, updatedAppt) => {
          models.Appt
            .find({patientID: updatedAppt.patientID})
            .then(response => {
              res.status(200).send(response);
            })
            .catch(err => {
              console.log('error retrieving complete list of appointments', err);
              res.status(400).send();
            });
        })
        .catch(err => {
          console.log('error updating cancelled appointment: ', err);
          res.status(400).send();
        });
    })
    .catch(err => {
      console.log('error finding appointment to cancel: ', err);
      res.status(400).send();
    });
});

app.put('/appointment/doctor/confirm', (req, res) => {
  models.Appt
    .findById(req.body._id, (err, appt) => {
      appt.set({isConfirmedByDoctor: !appt.isConfirmedByDoctor});
      appt
        .save((err, updatedAppt) => {
          models.Appt
            .find({patientID: updatedAppt.patientID})
            .then(response => {
              res.status(200).send(response);
            })
            .catch(err => {
              console.log('error retrieving complete list of appointments', err);
            });
        })
        .catch(err => {
          console.log('error updating appointment confirmation by doctor: ', err);
        });
    })
    .catch(err => {
      console.log('error finding appointment to update confirmation: ', err);
    });
});
