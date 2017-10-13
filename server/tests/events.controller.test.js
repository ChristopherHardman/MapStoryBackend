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
    await Event.addEvent(ctx).should.be.rejected;
  }
);


  it('should search for a story on the DB & save to it',
  async () => {
    const spy = sinon.spy();
    const EventController = proxyquire('../controller/events.controller', {
      '../model/story.model': {
        '@noCallThru': true,
        findOne: () => ({
          id: 123,
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


  it('should create an event',
  async () => {
    const spy = sinon.spy();
    const ctx = {
      params: {
        id: 42
      },
      request: {
        body: {
          title: 'This is a story',
          startTime: 38,
          mapLocation: 'Barcelona',
          dateAndTime: 'Thurs 21 December',
          attachments: [],
        }
      }
    };
    const mockEvent = {
      title: ctx.request.body.title,
      startTime: ctx.request.body.startTime,
      mapLocation: ctx.request.body.mapLocation,
      dateAndTime: ctx.request.body.dateAndTime,
      attachments: ctx.request.body.attachments
    };
    const EventController = proxyquire('../controller/events.controller',

      {
        '../model/story.model': {
          '@noCallThru': true,
          findOne: () => ({
            id: 123,
            save: spy,
            events: [],
          })
        }
      },

      {
        '../model/event.model': {
          '@noCallThru': true,
          create: () => mockEvent
        }
      });

    await EventController.addEvent(ctx);
    ctx.request.body.should.eql(mockEvent);
  }
  );





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
