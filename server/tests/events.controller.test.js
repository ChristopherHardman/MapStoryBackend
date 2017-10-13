const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();
require('chai').should();
const Event =  require('../controller/events.controller');
const proxyquire = require('proxyquire');

describe('addEvents', () => {

  it('should not create events if no title is provided',
  async () => {
    const ctx = {
      request: {
        body: {
          title: '',
          startTime: 38,
          dateAndTime: 'Thurs 21 December',
          mapLocation: 'Barcelona',
          attachments: [],
        }
      }
    };
    Event.addEvent(ctx).should.be.rejected;
  }
);

  it('should search for a story on the DB & save to it',
  async () => {

    const spy = sinon.spy();

    const EventController = proxyquire('../controller/events.controller', {
      '../model/story.model': {
        '@noCallThru': true,
        findOne: () => ({
          save: spy,
          events: [],
        })
      }
    });

    const ctx = {
      params: {
        id: 42
      },
      request: {
        body: {
          title: 'This is a story',
          startTime: 38,
          dateAndTime: 'Thurs 21 December',
          mapLocation: 'Barcelona',
          attachments: [],
        }
      }
    };
    await EventController.addEvent(ctx);
    spy.calledOnce.should.equal(true);

  }
  );


  it('should create an event', async () => {
    const ctx1 = {
      request: {
        body: {
          title: 'My first event',
          startTime: 38,
          dateAndTime: 'Thurs 21 December',
          mapLocation: 'Barcelona',
          attachments: [{
            type: 'Movie',
            title: 'First movie',
            description: 'The first movie added',
            text: 'Some text about the movie',
            link: 'www.movie.com',
          }],
        }
      }
    };
    sinon.stub(Event.addEvent.target).returns({events: []});
    sinon.stub(Event.addEvent.createdEvent).returns({_id: 123});
    sinon.stub(Event.addEvent.target.save).returns();
    await Event.addEvent(ctx1);

    Event.addEvent.eventData.title.should.equal('My first event');
    Event.addEvent.eventData.startTime.should.equal(38);
    Event.addEvent.eventData.MapLocation.should.equal('Barcelona');
    Event.addEvent.eventData.DateAndTime.should.equal('Thurs 21 December');
    sinon.assert.calledOnce(Event.addEvent.Event.create);
    sinon.assert.calledOnce(Event.addEvent.target.save());


  });

  it('should handle promise rejections',
  function () {
    var addEventSpy = sinon.spy(Event.addEvent);
    Event.addEvent();
    addEventSpy.callCount.should.eql(0);
    // addEventSpy.restore();
  }
);

  it('should not be called without arguments',
  function () {
    var addEventSpy = sinon.spy(Event.addEvent.try);
    Event.addEvent(true, true);
    addEventSpy.called.should.equal(false);
    // addEventSpy.restore();
  }
);

  it('should be called with the provided arguments',
  function () {
    var addEventSpy = sinon.spy(Event.addEvent);
    Event.addEvent(true, true);
    addEventSpy.calledWith(true, true);
    // addEventSpy.restore();
  }
);


    it('should have unique startTime');

    it('should update attachments');

  });



describe('Edit Event', function () {

    it('should update events when edited', async () => {

  });

});

  describe('Delete Event', function () {

    it('should remove event from DB when deleted', async () => {




    });

  });


describe('Attachments', () => {
  it('should validate text format');
  it('should validate tweet format');
  it('should validate image format');
  it('should validate video format');
  it('should validate audio format');
  it('should validate link format');
});
