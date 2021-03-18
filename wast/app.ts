export function getTheServer1(): i32 {
  // let str = "QWERTYUIOPSDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvvbnm789456123";
  // let strArr = str.split("");
  // let key: string[] = [];
  // for (let index = 0; index < 16; index++) {
  //   key.push(strArr[Math.floor(Math.random() * 6) as i32]);
  // }
  return 1 + 99;
}

export function getTheServer2(): string {
  let str = "QWERTYUIOPSDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvvbnm789456123";
  let strArr = str.split("");
  let key = ""
  for (let index = 0; index < 6; index++) {
    key += strArr[Math.floor(Math.random() * 6) as i32];
  }
  return key;
}