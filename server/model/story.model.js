const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Editor = require('../model/editor.model'); //required???
const Event = require('../model/event.model');


const editorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  avatar: String,
});

const attachmentsSchema = new Schema({
  text: String,
  link: String,
  imageLink: String,
  video: String,
  audio: String,
});

const eventSchema = new Schema({
  id: String,
  title: String,
  startTime: String,
  attachments: [attachmentsSchema]
});

const storySchema = new Schema({
  editor: { type: Schema.Types.ObjectId, ref: 'Editor' },
  title: String,
  id: String,
  map: String,
  tagLine: String,
  dateCreated: String,
  published: Boolean,
  likes: Number,
  duration: String,
  events:[{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

const Story = mongoose.model('Story', storySchema);


Story.edit = edit = async (edits, params) => {
  const updatedProps = {};
  if (edits.title) updatedProps.title = edits.title;
  if (edits.map) updatedProps.map = edits.map;
  if (edits.tagLine) updatedProps.tagLine = edits.tagLine;
  if (edits.duration) updatedProps.duration = edits.duration;
  if (edits.published) updatedProps.published = edits.published;
  if (edits.likes) updatedProps.likes = edits.likes;
  return await Story.findOneAndUpdate({_id : params.id}, {$set: updatedProps});
};

Story.getAllStories = () => {
  return Story
      .find()
      .select('editor title tagLine'); //id is returned by default
};


Story.viewStory = (params) => {
  return Story.findOne({_id : params.id});
};


Story.createStory = async (story) => {
  const newStory = new Story(story);
  try {
    return await newStory.save();
  } catch (e) {
    console.log('err', e);
  }
};

module.exports = Story;
