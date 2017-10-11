const express = require('express');
const bodyParser = require('body-parser');
const models = require('../database/mongoose');
const redis = require('../database/redis');
const seedDatabase = require('./seedFile');
const hasher = require('password-hash-and-salt');
const multer = require('multer');
const app = express();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/client/public/files');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({storage: storage});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(express.static(__dirname + '/../src/client/public'));

app.post('/file', upload.single('file'), (req, res) => {
  new models.File({patientID: req.body.patientID, fileName: req.file.filename})
    .save()
    .then((err, doc) => {
      models.File
        .find({patientID: req.body.patientID})
        .then(response => {
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(400).send(`error retrieving uploads from DB: ${err}`);
        });
    })
    .catch(err => {
      res.status(400).send(`error saving file to DB: ${err}`);
    });
});

app.get('/file/:patientID', (req, res) => {
  models.File
    .find({patientID: req.params.patientID})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(`error retrieving uploads from DB: ${err}`);
    });
});

app.delete('/file/:_id', (req, res) => {
  models.File
    .findById(req.params._id, (err, file) => {
      if (!file) {
        res.status(400).send('no file found');
      } else {
        file.remove();
        models.File
          .find({patientID: file.patientID})
          .then(response => {
            res.status(200).send(response);
          })
          .catch(err => {
            res.status(400).send(`error retrieving uploads from DB: ${err}`);
          });
      }
    })
    .catch(err => {
      res.status(400).send(`error deleting upload from DB: ${err}`);
    });
});

app.post('/login', (req, res) => {
  redis.hgetall(req.body.username, (err, obj) => {
    if (obj === null) {
      res.status(200).send('invalid');
    } else {
      hasher(req.body.password).verifyAgainst(obj.password, (err, verified) => {
        if (err) {
          res.status(400).send(`error verifying hash: ${err}`);
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
                res
                  .status(400)
                  .send(`error finding patient by patientID in DB: ${err}`);
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
  res.send('databases seeded');
});

app.get('/patient', (req, res) => {
  models.Patient
    .find()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(`error retrieving all patients from DB: ${err}`);
    });
});

app.get('/appointment/:patientID', (req, res) => {
  models.Appt
    .find({patientID: req.params.patientID})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(`error retrieving all appointments from DB: ${err}`);
    });
});

app.post('/appointment', (req, res) => {
  new models.Appt(req.body)
    .save((err, doc) => {
      models.Appt
        .find({patientID: doc.patientID})
        .then(response => {
          res.status(201).send(response);
        })
        .catch(err => {
          res
            .status(400)
            .send(`error retrieving all appointments from DB: ${err}`);
        });
    })
    .catch(err => {
      res.status(400).send(`error adding appt to DB: ${err}`);
    });
});

app.put('/appointment/cancel', (req, res) => {
  models.Appt
    .findById(req.body._id, (err, appt) => {
      appt.set({isCancelled: !appt.isCancelled, message: req.body.message});
      appt
        .save((err, updatedAppt) => {
          models.Appt
            .find({patientID: updatedAppt.patientID})
            .then(response => {
              res.status(200).send(response);
            })
            .catch(err => {
              res
                .status(400)
                .send(`error retrieving all appointments from DB: ${err}`);
            });
        })
        .catch(err => {
          res.status(400).send(`error updating cancelled appointment: ${err}`);
        });
    })
    .catch(err => {
      res.status(400).send(`error finding appointment to cancel ${err}`);
    });
});

app.put('/appointment/confirm', (req, res) => {
  models.Appt
    .findById(req.body._id, (err, appt) => {
      if (req.body.userType === 'patient') {
        appt.set({isConfirmedByPatient: !appt.isConfirmedByPatient});
      } else if (req.body.userType === 'doctor') {
        appt.set({isConfirmedByDoctor: !appt.isConfirmedByDoctor});
      }
      appt
        .save((err, updatedAppt) => {
          models.Appt
            .find({patientID: updatedAppt.patientID})
            .then(response => {
              res.status(200).send(response);
            })
            .catch(err => {
              res
                .status(400)
                .send(`error retrieving all appointments from DB: ${err}`);
            });
        })
        .catch(err => {
          res
            .status(400)
            .send(`error updating appointment confirmation by doctor:  ${err}`);
        });
    })
    .catch(err => {
      res
        .status(400)
        .send(`error finding appointment to update confirmation: ${err}`);
    });
});
