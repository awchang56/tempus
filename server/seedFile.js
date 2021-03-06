const moment = require('moment');
const models = require('../database/mongoose');
const redis = require('../database/redis');
const hasher = require('password-hash-and-salt');

const seed = {
  patients: [
    {
      patientID: 'patient1',
      name: 'John Doe',
      age: 35,
      email: 'johndoe123@gmail.com',
      address: '123 Main St. Anywhere, CA 94129',
      phone: '5555555555',
    },
    {
      patientID: 'patient2',
      name: 'Jane Doe',
      age: 29,
      email: 'janedoe456@gmail.com',
      address: '123 Hurley St. Anywhere, CA 94129',
      phone: '5556666666',
    },
    {
      patientID: 'patient3',
      name: 'Brian Smith',
      age: 45,
      email: 'briantsmith123@gmail.com',
      address: '1392 Arden St. Anywhere, CA 94129',
      phone: '5557777777',
    },
    {
      patientID: 'patient4',
      name: 'Pete Smith',
      age: 39,
      email: 'petesmith@gmail.com',
      address: '1232 Main St. Anywhere, CA 94129',
      phone: '55588888888',
    },
    {
      patientID: 'patient5',
      name: 'Mary Wallace',
      age: 40,
      email: 'marywallace@gmail.com',
      address: '1232 Main St. Somewhere, CA 94129',
      phone: '5559999999',
    },
  ],
  appts: [
    {
      patientID: 'patient1',
      date: moment('2017-10-22 13:00'),
      purpose: 'flu shot',
      doctorID: 'doctor1',
      isConfirmedByDoctor: true,
      isConfirmedByPatient: true,
      isCancelled: false,
      message: '',
    },
    {
      patientID: 'patient1',
      date: moment('2017-09-12 09:00'),
      purpose: 'broken arm',
      doctorID: 'doctor1',
      isConfirmedByDoctor: false,
      isConfirmedByPatient: false,
      isCancelled: false,
      message: '',
    },
    {
      patientID: 'patient1',
      date: moment('2017-10-22 10:00'),
      purpose: 'physical',
      doctorID: 'doctor1',
      isConfirmedByDoctor: false,
      isConfirmedByPatient: true,
      isCancelled: true,
      message: 'May we reschedule to 10/24?',
    },
    {
      patientID: 'patient2',
      date: moment('2017-10-18 16:00'),
      purpose: 'flu shot',
      doctorID: 'doctor1',
      isConfirmedByDoctor: true,
      isConfirmedByPatient: true,
      isCancelled: false,
      message: '',
    },
    {
      patientID: 'patient2',
      date: moment('2017-09-05 12:00'),
      purpose: 'physical',
      doctorID: 'doctor1',
      isConfirmedByDoctor: true,
      isConfirmedByPatient: false,
      isCancelled: false,
      message: '',
    },
  ],
  doctors: [
    {
      doctorID: 'doctor1',
      name: 'Michael Brown',
    },
  ],
  login: [
    {
      username: 'patient1',
      password: 'patient1',
      type: 'patient',
    },
    {
      username: 'patient2',
      password: 'patient2',
      type: 'patient',
    },
    {
      username: 'patient3',
      password: 'patient3',
      type: 'patient',
    },
    {
      username: 'patient4',
      password: 'patient4',
      type: 'patient',
    },
    {
      username: 'patient5',
      password: 'patient5',
      type: 'patient',
    },
    {
      username: 'doctor1',
      password: 'doctor1',
      type: 'doctor',
    },
  ],
};

module.exports = function() {
  seed.patients.forEach(patient => {
    new models.Patient(patient)
      .save((err, doc) => {
        console.log('patient seeded');
      })
      .catch(err => {
        console.log('err seeding patients: ', err);
      });
  });

  seed.appts.forEach(appt => {
    new models.Appt(appt)
      .save((err, doc) => {
        console.log('appt seeded');
      })
      .catch(err => {
        console.log('err seeding appts: ', err);
      });
  });

  seed.doctors.forEach(doctor => {
    new models.Doctor(doctor)
      .save((err, doc) => {
        console.log('doctor seeded');
      })
      .catch(err => {
        console.log('err seeding doctors: ', err);
      });
  });

  seed.login.forEach(login => {
    hasher(login.password).hash((err, hash) => {
      if (err) {
        console.log('error hashing password: ', err);
      }
      redis.hmset(
        login.username,
        {username: login.username, password: hash, userType: login.type},
        (err, reply) => {
          if (err) {
            console.log('error saving login to redis: ', err);
          }
          console.log('reply: ', reply);
        }
      );
    });
  });
};
