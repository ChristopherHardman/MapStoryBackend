const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

require('../db')('mapstory-backend-test');
const proxyquire = require('proxyquire');
const Story = require('../model/story.model');
const Editor = require('../model/editor.model');
const mocks = require('./mocks');

describe('Story Model', () => {
  it ('should create story and save to DB', async () => {
    const storyData = {
      editor: await Editor.findOne({'name':'Emma Stone'}),
      title: 'Midnight in Paris',
      tagLine: 'A Woody Allen Comedy',
      map: 'http://awz.com/du67.jpg',
      duration: '00:10',
      events: [],
    };
    const spy = sinon.spy(Story.prototype, 'save');
    const newStory = new Story(storyData);

    await Story.createStory(newStory);
    spy.should.have.been.called;
  });

  it ('should delete story from DB', async () => {
    const story = await Story.findOne();
    const storyId = story['_id'];
    const spy = sinon.spy(Story, 'findByIdAndRemove');
    await Story.deleteStory(storyId);
    spy.should.have.been.called;
  });

  it ('should edit story in DB', async () => {

  })

});
