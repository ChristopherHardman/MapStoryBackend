const mongoose = require('mongoose');
const Event = require('../model/event.model');
const Story = require('../model/story.model');
const Attachment = require('../model/event.model');

require('../db')('mapstory-backend-test');

//Adds event to events array within story object
const addEvent = async (ctx, next) => {
  try {
    if (ctx.request.body.title) {
      const target = await Story.findOne({_id: ctx.params.id});
      const eventData = {
        title: ctx.request.body.title,
        startTime: ctx.request.body.startTime,
        MapLocation: ctx.request.body.MapLocation,
        DateAndTime: ctx.request.body.DateAndTime,
        attachments: ctx.request.body.attachments
      };
      const createdEvent = await Event.create(eventData);
      target.events.push(createdEvent._id);
      target.save();
      ctx.status = 201;
      ctx.body = createdEvent;
    } else {
      throw 'No title provided!';
    }
  }
  catch (error) {
    console.error(error);
    throw ('Could not create event!');
  }
};


//Updates existing events
const editEvent = async (ctx, next) => {
  try {
    const targetStory = await Story.findOne({"_id": ctx.params.id})
                                   .populate('events');
    const targetEvent = targetStory.events;
    for (var i = 0; i < targetEvent.length; i++) {
      if (targetEvent[i]['_id'] == ctx.params.eventId) {
        targetEvent[i]['title'] = ctx.request.body.title,
        targetEvent[i]['startTime'] = ctx.request.body.startTime,
        targetEvent[i]['DateAndTime'] = ctx.request.body.DateAndTime,
        targetEvent[i]['MapLocation'] = ctx.request.body.MapLocation,
        targetEvent[i]['attacment'] = ctx.request.body.attachment
      }
    }
    targetStory.save();
    ctx.status = 200;
  } catch (error) {
    throw (401, 'Could not edit event!');
  }
};


//Deletes existing events
const deleteEvent = async (ctx, next) => {
  try {
    const targetStory = await Story.findOne({"_id": ctx.params.id})
                                   .populate('events');
    const targetEvent = targetStory.events;
    for (var i = 0; i < targetEvent.length; i++) {
      if (targetEvent[i]['_id'] == ctx.params.eventId) {
        let a = targetEvent.splice(0,i);
        let b = targetEvent.splice(i+1,targetEvent.length-1);
        let c = a.concat(b);
        targetStory.events = c;
      }
    }
    targetStory.save();

    ctx.status = 200;
  } catch (error) {
    throw (401, 'Could not edit event!');
  }
};

module.exports = {
  addEvent,
  editEvent,
  deleteEvent
};
