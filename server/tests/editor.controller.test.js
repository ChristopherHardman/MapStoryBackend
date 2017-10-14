const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

require('../db')('mapstory-backend-test');

// const proxyquire = require('proxyquire');
// const mockEditorModel = {};

// creates mock model functions to replace original model functions in controller
// const EditorController = proxyquire('../controller/editor.controller',
//   { '../model/editor.model' : mockEditorModel}
// );

const EditorController = require('../controller/editor.controller')
const Editor = require('../model/editor.model');

const mocks = require('./mocks');


describe('Editor', () => {
  it('should be able to create a profile', async () => {
    const ctx = {
      request: {
        body: {
          name: 'Emma Stone',
          avatar: 'http://fb.com/avatar01.jpg',
        },
      },
    };
    await EditorController.createEditor(ctx);
    const createdEditor = await Editor
                          .findOne({name : 'Emma Stone'})

    createdEditor.should.have.property('name');
    createdEditor.should.have.property('avatar');
  });

  it('should be able to log in with Facebook');
  it('should pull image, name and email from Facebook');
  // it('should be able to delete profile');
});
