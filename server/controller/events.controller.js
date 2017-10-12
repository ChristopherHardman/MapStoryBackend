const mongoose = require('mongoose');
const Event = require('../model/event.model');
const Story = require('../model/story.model');
const Attachment = require('../model/event.model');

//Adds event to events array within story object
const addEvent = async (ctx, next) => {
  try {
    const target = await Story.findOne({"_id": ctx.params.id});
    const eventData = {
      title: ctx.request.body.title,
      startTime: ctx.request.body.startTime,
      attachments: ctx.request.body.attachments
    };
    const createdEvent = await Event.create(eventData);
    target.events.push(createdEvent._id);
    target.save();
    ctx.status = 201;
    ctx.body = createdEvent;
  }
  catch (error) {
    console.error(error);
    ctx.throw('Could not create event!');
  }
};


//Updates existing events
const editEvent = async (ctx, next) => {
  try {
    const targetStory = await Story.findOne({"_id": ctx.params.id})
                                   .populate('events');
    const targetEvent = targetStory.events;
    for (var i = 0; i < targetEvent.length; i++) {
      if (targetEvent[i]['_id'] == ctx.params.eventId) { //need to update for params
        targetEvent[i]['title'] = ctx.request.body.title,
        targetEvent[i]['startTime'] = ctx.request.body.startTime,
        targetEvent[i]['attacment'] = ctx.request.body.attachment
      }
    }
    targetStory.save();
    ctx.status = 200;
  } catch (error) {
    ctx.throw(401, 'Could not edit event!');
  }
};


module.exports = {
  addEvent,
  editEvent
};
