const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
  type: String,
  url: String,
  urlImg: String,
  title: String,
  text: String,
});

const locationSchema = new Schema({
  lat: String,
  lng: String,
});

const eventSchema = new Schema({
  title: String,
  startTime: String,
  dateAndTime: Date,
  mapLocation: String,
  location: locationSchema,
  attachments: [attachmentSchema],
});

const Event = mongoose.model('Event', eventSchema);
const Location = mongoose.model('Location', locationSchema);
const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = {
  Event,
  Location,
  Attachment,
};
