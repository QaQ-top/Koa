import Koa = require('koa');
import Router = require('koa-router')
import fs = require('fs');
const { readFileSync, readdirSync, writeFileSync } = fs;
import  path = require('path');
const { resolve, parse} = path;
import qs = require('qs');
// 使用 import 需要 npm install babel-cli  -D npm install babel-preset-env -D
// 启动命令添加环境 babel-node --presets env app.js
// npm install -g nodemon 
// nodemon --exec babel-node --presets env app.js 热更新

const app = new Koa();
const router = new Router;
// const translation = new Google();
// const trans = translation.create('Google')


router.get('/', async (ctx, next) => {
  await next();
  ctx.set({
    'Content-Type': 'text/html;charset=utf-8'
  });
  const res = await readFileSync(`${__dirname}/pages/index.html`);

  // 读取目录
  const file = await readdirSync(resolve(__dirname, '../../react/public/echarts-map-data-master/world/geojson'));

  const world = await readFileSync(resolve(__dirname, '../../react/public/echarts-map-data-master/world.geo.json'));

  // console.log('ffffffff',div)
  const fileCN = await readdirSync(resolve(__dirname, './world'));
  let div = ''
  await fileCN.map(async i => {
    const world = await readFileSync(resolve(__dirname, './world/' + i));
    const city = new Function(`return ${world}`)();
    let not = ''
    const cityArray = city.map((i: any) => {
      if(!Object.values(i)[0]) not='not'
      return Object.keys(i)[0];
    });
    if(not) {
      div += `<div><div><span class=${not}>${i}</span> :<br /> <span>${cityArray.join(', ')}</span></div><div><button value=${i}>设置</button><input type='text' /></div><br /></div><br />`
    }
  })

  
  
  // console.log('ffffffff',div)

  ctx.body = res.toString()
    .replace(/'<%world%>'/g, world.toString())
    .replace(/'<%file%>'/g, JSON.stringify(file))
    .replace(/<%div%>/g, div)
    // .replace(/'<%cn%>'/g, JSON.stringify(cn))
    // .replace(/'<%T%>'/g, JSON.stringify(t));
});

router.get('/set', async (ctx, next) => {
  await next();
  ctx.set({
    'Content-Type': 'text/html;charset=utf-8'
  });
  const valueStr = ctx.request.url.split('?')[1];
  const values =  qs.parse(valueStr)

  let res: any= await readFileSync(resolve(__dirname, './world/' + values.label));
  res = new Function(`return ${res.toString()}`)();
  let cns = (values.value as string).split('，');
  console.log(values, cns.length, res.length )
  if(cns.length !== res.length) {
    ctx.body = '<div>失败</div>'
  }else {
    cns.forEach((i, n) => {
      let item: {[k:string]: any} = res[n];
      item[Object.keys(item)[0]] = i;
    })
    console.log(res)
    await writeFileSync(resolve(__dirname, './world/' + values.label), JSON.stringify(res));

    ctx.body = '<div>完成</div>'
  }
});


router.get('/codeModule', async (ctx, next) => {
  await next();

  const codeBuffer = await readFileSync(resolve(__dirname, '../../react/src/pages/list/components/tabels/model.ts'));
  
  const codeStr = codeBuffer.toString().replace(/tables/g, '${1:name}').replace(/Tables/g, '${2:name}').split(/\n/);
  const code = {
    "TEST": {
      "prefix": "TEST",
      "body": codeStr,
      "description": "介绍"
    }
  }
  await writeFileSync(resolve(__dirname, './code/tabels.json'), JSON.stringify(code));



  ctx.body = "<h2>完成</h2>"
})

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3080);


console.log('%chttp://localhost:3080', 'color:#0f0;');