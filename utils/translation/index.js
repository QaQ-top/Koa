import http from 'http';
import qs from 'qs';
import zlib from 'zlib';
export default async function (str, cn) {
  return new Promise((resolve, reject) => {
    console.log(str)
    var post_data={
      q: str,
      // from: cn ? 'en' : 'zh-CHS',
      // to: cn ? 'zh-CHS' : 'en',
      from: 'Auto',
      to: 'Auto'
    };//这是需要提交的数据
    var content=qs.stringify(post_data);
    let proxyReq = http.request({ //设置代理 返回实例，实例使用end()方法触发回调
          hostname: 'fanyi.qq.com', //代理主机名
          path: '/api/translate', //路径
          method: 'POST', //请求方式
          encoding : null,
          headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": " gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,ru;q=0.8",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Length": "283",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": "RK=cY5putQH77; ptcz=312c120d2f10c78b299ed4aeef1eda3e6ec3cb355602f6994ef4daf523b7a867; pgv_pvid=6677836544; pac_uid=0_a55996818542c; pgv_pvi=743892992; iip=0; fy_guid=5fa0ac17-6d7b-403b-a8f7-ca36982aa486; ADHOC_MEMBERSHIP_CLIENT_ID1.0=4ab7b204-72ce-f26d-9cf3-44a3893f5565; gr_user_id=1ba283bd-068e-417e-99d3-3c0675bcb71e; grwng_uid=a7c35bfe-f445-43e4-824b-fb0f7de14123; 8507d3409e6fad23_gr_session_id=a0a80c9b-44c0-421c-9467-1ee9ed4ba086; 8c66aca9f0d1ff2e_gr_session_id=64f5b7a1-04f5-4b22-90c9-e85a42d97936; openCount=2; qtv=da7dd0405736eb73; qtk=kzbmIlsgKVFIlykViUU8CYHRNLUtzRQY6cYnl2CoCuYLAf8nnt7xPaOaQkFHoSnwXc+tDCZZZ0RL2grB/h5oW5S4vv2/nM5I5AHX9PiCiywtQtgDtri0Hf9DKqpj/UifWAOOzmX6DTOpySh5hV4iZw==; 8c66aca9f0d1ff2e_gr_session_id_64f5b7a1-04f5-4b22-90c9-e85a42d97936=true",
            "Host": "fanyi.qq.com",
            "Origin": "https://fanyi.qq.com",
            "Pragma": "no-cache",
            "Referer": "https://fanyi.qq.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          } // 请求头
      },(proxyRes)=>{ // 回调函数，参数为代理服务器的响应头
          let data = []
          proxyRes.on('data',(chunk)=>{ // 获取代理服务器响应数据
              data.push(chunk)
          });
          proxyRes.on('end',()=>{
              try {
                data = Buffer.concat(data); // 解析代理服务器响应数据
                data = zlib.gunzipSync(data); // 解压缩
                data = JSON.parse(data.toString());
                resolve(data);
              } catch (e) {
                reject(e)
              }
          })
      })
      proxyReq.write(content);
      proxyReq.end(); // 触发回调;
  });
}