const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Story = require('../model/story.model');


const attachmentSchema = new Schema(
  [
    {
      type: String,
      title: String,
      description: String,
      text: String,
      link: String,
    },
    {
      type: String,
      title: String,
      description: String,
      text: String,
      link: String,
    },
  ]);


const eventSchema = new Schema({
  title: String,
  startTime: Number,
  dateAndTime: Date,
  mapLocation: String,
  attachments: [attachmentSchema],
});


const Event = mongoose.model('Event', eventSchema);


module.exports = Event;

// module.exports = Event;

// Event.edit = async (edits, params) => {
//   const updatedProps = {};
//   if (edits.title) updatedProps.title = edits.title;
//   if (edits.startTime) updatedProps.startTime = edits.startTime;
//   return await Event.findOneAndUpdate({_id : params.id}, {$set: updatedProps});
// };
