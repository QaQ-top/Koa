import Koa from 'koa';
import http from 'http';
import Router from 'koa-router';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import translation from './utils/translation'
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

  const file = await readdirSync(resolve(__dirname, '../../react/public/echarts-map-data-master/world/geojson'));

  const world = await readFileSync(resolve(__dirname, '../../react/public/echarts-map-data-master/world.geo.json'));

  const worldCN = await readFileSync(resolve(__dirname, '../../react/public/echarts-map-data-master/world/world-mapping.json'));

  // console.log(path)

  let names = new Function(`return ${world.toString()}`)();
  names = names.features.map(i => i.properties.name)
  
  let worldCNMap = new Function(`return ${worldCN.toString()}`)();
  let data = JSON.parse(JSON.stringify(worldCNMap));
  worldCNMap = Object.keys(worldCNMap);

  // let f = await translation('file');


  let NotCnMap = names.filter(i => !worldCNMap.includes(i));



  let NotJson = worldCNMap.filter(i => !names.includes(i));

  NotJson.push(...NotJson.map(i => data[i]))

  console.log(
    // await translation('Bosnia and Herzegovina')
  )

  ctx.body = res.toString()
    .replace(/'<%world%>'/g, world.toString())
    .replace(/'<%file%>'/g, JSON.stringify(file))
    .replace(/'<%worldCN%>'/g, worldCN.toString())
    .replace(/'<%NotCnMap%>'/g, JSON.stringify(NotCnMap))
    .replace(/'<%NotJson%>'/g, JSON.stringify(NotJson));
});




app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);


console.log('%chttp://localhost:3000', 'color:#0f0;');