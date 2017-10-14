const mongoose = require('mongoose');
const Editor = require('../model/editor.model');

const createEditor = async (ctx, next) => {
  const editorData = {
    name: ctx.request.body.name,
    avatar: ctx.request.body.avatar
  };
  const editor = await Editor.createEditor(editorData);
  ctx.status = 200;
};

// const findEditor = async (ctx, next) => {
//   const editorData = {
//     name: ctx.request.body.name,
//     avatar: ctx.request.body.avatar
//   };
//   const editor = await Editor.createEditor(editorData);
//   ctx.status = 200;
// };

module.exports = {
  createEditor,
};
