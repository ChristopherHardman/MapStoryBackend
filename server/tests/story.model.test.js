const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
// const StoryModel = require('../model/model');
// const Mongoose  = mongoose.model('Story', Story.storySchema);

describe('Story Model', () => {
  it ('Should return {id, editor, title, tagline} of all stories');

  it ('Should return a story object in the correct format');
});
