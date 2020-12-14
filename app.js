import Koa from 'koa';
import Router from 'koa-router';
import { readFileSync } from 'fs';
// 使用 import 需要 npm install babel-cli  -D npm install babel-preset-env -D
// 启动命令添加环境 babel-node --presets env app.js
// npm install -g nodemon 
// nodemon --exec babel-node --presets env app.js 热更新

const app = new Koa();
const router = new Router;

router.get('/', async (ctx, next) => {
  await next();
  ctx.set({
    'Content-Type': 'text/html;charset=utf-8'
  });
  const res = await readFileSync(`${__dirname}/pages/index.html`);
  ctx.body = res;
});




app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);


console.log('%chttp://localhost:3000', 'color:#0f0;');