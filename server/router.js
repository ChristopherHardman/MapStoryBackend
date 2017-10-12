const Router = require('koa-router');

const storyController = require('./controller/story.controller');
const editorController = require('./controller/editor.controller');
const eventsController = require('./controller/events.controller');

const router = new Router();

//user actions
router.get('/stories', storyController.getAllStories);
router.get('/stories/:id', storyController.viewStory);

//editor actions
router.post('/sign-up', editorController.createEditor);
router.post('/stories', storyController.createStory);
router.put('/stories/:id', storyController.editStoryMeta);


//event actions
router.post('/stories/:id/event', eventsController.addEvent);
router.put('/stories/:id/:eventId', eventsController.editEvent);


module.exports = router;
