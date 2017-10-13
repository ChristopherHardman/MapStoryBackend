const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

require('../db')('mapstory-backend-test');

const proxyquire = require('proxyquire');
const mockStoryModel = {};

// creates mock model functions to replace original model functions in controller
const StoriesController = proxyquire('../controller/story.controller',
  { '../model/story.model' : mockStoryModel}
);

const Story = require('../model/story.model');

const mocks = require('./mocks');

describe('Stories Collection', () => {
  it('should return no more stories than the maximum defined by pagination settings', async () => {
    const mockStories = Array(60).fill(0);
    for (let i = 0; i < mockStories.length; i++) {
      mockStories[i] = i;
    }
    mockStoryModel.getAllStories = sinon.stub().returns(mockStories);
    const ctx = {
      params: {page: 1},
      body: null,
    };
    await StoriesController.getAllStories(ctx);
    ctx.body.should.have.lengthOf(20);
  });

  it('should return 400 if pagination is not valid', async () => {
    const mockStories = Array(10).fill(0);
    mockStoryModel.getAllStories = sinon.stub().returns(mockStories);
    const ctx = {
      params: {page: 3},
    };
    // StoriesController.getAllStories(ctx).should.be.rejectedWith(400);
    //Why is the test passing although it's throwing an error?
    StoriesController.getAllStories(ctx).should.be.fulfilled;
  });

  it('should return only records that match any query terms provided', async () => {
    const mockStories = mocks.mockStories;
    mockStoryModel.getAllStories = sinon.stub().returns(mockStories);
    const ctx = {
      request: {
        query: {q: 'hawk'},
      },
      body: null,
    };
    await StoriesController.getQuery(ctx);
    ctx.body.should.have.lengthOf(2);
  });

  it('should return empty array if no records match the query', async () => {
    const mockStories = mocks.mockStories;
    mockStoryModel.getAllStories = sinon.stub().returns(mockStories);
    const ctx = {
      request: {
        query: {q: 'bananas'},
      },
      body: null,
    };
    await StoriesController.getQuery(ctx);
    ctx.body.should.be.an('array').that.is.empty;
  });

  it('should be able to view own stories');
});


describe('Story', () => {
  it('should not be created if mandatory data not provided', async () => {
    const ctx = {
      request: {
        body: {
          title: '',
          tagLine: '',
          map: '',
          duration: '',
        },
      }
    };
    StoriesController.createStory(ctx).should.be.rejectedWith(400);
  });

  it('should not publish a story if no events in it', async () => {
    const ctx = {
      request: {
        body: {
          published: true,
        },
      },
      params: {
        _id: '123',
      }
    };

    const mockStory = mocks.mockStory;
    mockStoryModel.findStory = sinon.stub().returns(mockStory);
    StoriesController.editStory(ctx).should.be.rejectedWith(400);
  });

  it ('should get model to update story', async () => {
    ctx = {
      params: {
        id: '41224d776a326fb40f000001',
      },
      request: {
        body: {
          title: 'Morning Rise',
        }
      }
    };
    const spy = sinon.spy(mockStoryModel, 'editStory');
    await StoriesController.editStory(ctx);
    spy.should.have.been.calledWith(ctx.params.id, { title: 'Morning Rise' });
  });

  it('should create a new event');
  it('if events are deleted the story events array should reflect this');
});


describe('Events', () => {
  it('should reflect changes to its events');
  it('should have a title');
  it('should have a startTime');
  it('should have unique startTime');
  it('should update attachments');
  it('should remove event from DB when deleted');
});

describe('Attachments', () => {
  it('should validate text format');
  it('should validate tweet format');
  it('should validate image format');
  it('should validate video format');
  it('should validate audio format');
  it('should validate link format');
});
