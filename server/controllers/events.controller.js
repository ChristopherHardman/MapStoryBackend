const mongoose = require('mongoose');
const Story = require('../model/story.model');
const Event = require('../model/event.model').Event;
const Attachment = require('../model/event.model').Attachment;
const Location = require('../model/event.model').Location;

require('../db')('mapstory-backend-test');

//Adds event to events array within story object
const addEvent = async (ctx, next) => {
  try {
    if (ctx.request.body.title) {
      const story = await Story.findOne({_id: ctx.params.id, editor: ctx.user._id});
      if (!story) ctx.throw(404);

      let attachments = [];
      if (ctx.request.body.attachments.length !== 0) {
        const attachmentsData = ctx.request.body.attachments;
        attachments = await Promise.all(attachmentsData.map(async attachment => {
          let attachmentData;
          if (attachment.type === 'Link') {
            attachmentData = {
              type: attachment.type,
              url: attachment.url,
              urlImg: attachment.urlImg,
              title: attachment.title,
            };
          } else if (attachment.type === 'Text') {
            attachmentData = {
              type: attachment.type,
              text: attachment.text,
            };
          } else if (attachment.type === 'Image') {
            attachmentData = {
              type: attachment.type,
              urlImg: attachment.urlImg,
            };
          } else {
            attachmentData = {
              type: attachment.type,
              url: attachment.url,
            };
          }
          return await Attachment.create(attachmentData);
        }));
      }

      const locationData = ctx.request.body.location;
      const location = await Location.create(locationData);

      const eventData = {
        title: ctx.request.body.title,
        startTime: ctx.request.body.startTime,
        mapLocation: ctx.request.body.mapLocation,
        dateAndTime: ctx.request.body.dateAndTime,
        location,
        attachments,
      };
      const createdEvent = await Event.create(eventData);
      story.events.push(createdEvent);
      story.save();
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
    const story = await Story.findOne({
      _id: ctx.params.id,
      editor: ctx.user._id,
    }).populate('events');
    if (!story) ctx.throw(404);
    const data = ctx.request.body;

    const updatedProps = {};

    if (data.title) updatedProps.title = data.title;
    if (data.startTime) updatedProps.map = data.startTime;
    if (data.mapLocation) updatedProps.duration = data.mapLocation;
    if (data.dateAndTime) updatedProps.tagLine = data.dateAndTime;
    if (data.attachments) updatedProps.published = data.attachments;

    const eventId = ctx.params.eventId;
    await Event.findOneAndUpdate({'_id': eventId}, {$set: updatedProps});
    ctx.body = await Event.findOne({'_id': eventId});
  } catch (error) {
    throw (401, error);
  }
};

//Deletes existing events
const deleteEvent = async (ctx, next) => {
  try {
    const story = await Story.findOne({
      _id: ctx.params.id,
      editor: ctx.user._id
    }).populate('events');
    if (!story) ctx.throw(404);
    const event = story.events;
    for (var i = 0; i < event.length; i++) {
      if (event[i]['_id'] == ctx.params.eventId) {
        event.splice(i, 1);
      }
    }
    story.save();
    // await Event.findByIdAndRemove(ctx.params.eventId)
    ctx.status = 204;
  } catch (error) {
    throw (401, 'Could not edit event!');
  }
};

module.exports = {
  addEvent,
  editEvent,
  deleteEvent
};
