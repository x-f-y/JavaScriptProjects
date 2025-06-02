import { Dictionary } from './dictionary';

const dic = new Dictionary<string, number>();
dic.set("a", 1);
dic.set("b", 2);
dic.set("c", 3);
dic.set("b", 4);
dic.forEach((key, value) => console.log(key + " : " + value));
const hasC = dic.has("c");
console.log(hasC);
if(hasC){
  dic.delete("c");
}
dic.forEach((key, value) => console.log(key + " : " + value));
console.log(dic.size);
// dic.size = 10; // 报错：无法为“size”赋值，因为它是只读属性