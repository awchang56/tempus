const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/tempus');

db.on('error', () => {
  console.log('error connecting to mongoose');
});

db.once('open', () => {
  console.log('mongoose connection established');
});

const patientSchema = new mongoose.Schema({
  patientID: {type: String, index: {unqiue: true}},
  name: String,
  age: Number,
  email: String,
  address: String,
  phone: String,
});

const Patient = db.model('Patient', patientSchema);

const fileSchema = new mongoose.Schema({
  patientID: Number,
  file: {data: Buffer, contentType: String},
});

const File = db.model('File', fileSchema);

const apptSchema = new mongoose.Schema({
  patientID: String,
  date: Date,
  purpose: String,
  doctorID: String,
  isComplete: Boolean,
});

const Appt = db.model('Appt', apptSchema);

const doctorSchema = new mongoose.Schema({
  doctorID: String,
  name: String,
});

const Doctor = db.model('Doctor', doctorSchema);

module.exports = {
  Patient,
  File,
  Appt,
  Doctor,
};
