const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
require('dotenv').config();

const Console = console;

const app = new Koa();
const router = require('./router');
require('./db')('mapstory-backend');

const port = process.env.PORT

const corsOptions = {origin: `http://localhost:${port}`};

app
  .use(cors(corsOptions))
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.error (e);
      ctx.status = 500;
      if (e.message) {
        ctx.body = {
          errors: [e.message]
        };
      }
    }
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, ()=> {
  Console.log('koa app listening on port 4000');
});
