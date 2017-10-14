const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const Console = console;

const app = new Koa();
const router = require('./router');
require('./db')('mapstory-backend');

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.error(e);
      ctx.status = 500;
      if (e.message) {
        ctx.body = {
          errors: [e.message]
        };
      }
    }
  })
  .use(async (ctx, next) => {
    let token = ctx.headers.token;
    if (!token) return await next();
    let exp = ctx.headers.exp;
  })
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, ()=> {
  Console.log('koa app listening on port 3000');
});
