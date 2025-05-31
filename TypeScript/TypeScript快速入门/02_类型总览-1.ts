/* 1. 字面量 */
let a: 'hello'; // a的值只能为字符串“hello”
let b: 100; // b的值只能是数字100
let c: true; // c的值只能是布尔值true
let d: 'male' | 'female'; // d的值只能是字符串“male”或“female”

// a = "hi"; // 警告：不能将类型“"hi"”分配给类型“"hello"”
// b = 200; // 警告：不能将类型“200”分配给类型“100”
// c = false; // 警告：不能将类型“false”分配给类型“true”
d = 'female';
d = 'male';
// d = 'unknown'; // 警告：不能将类型“"unknown"”分配给类型“"male" | "female"”

/* 2. any */
// any的含义是：任意类型，一旦将变量类型限制为any，那就意味着放弃了对该变量的类型检查
let e: any; // 明确的表示e的类型是any —— 显式的any
// 以下对e的赋值，均无警告
e = 100;
e = 'abc';
e = true;

let f; // 没有明确的表示f的类型是any，但TS主动推断了出来 —— 隐式的any
// 以下对f的赋值，均无警告
f = 100;
f = 'abc';
f = true;

// 注意：any类型的变量，可以赋值给任意类型的变量
let test1: string;
let test2: number;
let test3: boolean;
// 以下赋值，均无警告
test1 = e;
test2 = e;
test3 = e;
test1 = f;
test2 = f;
test3 = f;

/* 3. unknown */
// unknown可以理解为一个类型安全的any
// unknown适用于：开始不知道数据的具体类型，后期才能确定数据的类型
let g: unknown;
// 以下对g的赋值，均正常
g = 100;
g = false;
g = '你好';

let test4: string;
// test4 = g; // 警告：不能将类型“unknown”分配给类型“string”

// 若就是想把g赋值给test4，可以用以下三种写法：
// 写法一：加类型判断
if(typeof g === 'string'){
    test4 = g;
}
// 写法二：类型断言（告诉解析器变量的实际类型）
test4 = g as string;
// 写法三：类型断言
test4 = <string>g;

// any后点任何的东西都不会报错，而unknown正好与之相反
let str1: string = 'hello';
let str2: any = "hello";
let str3: unknown = 'hello';
str1.toUpperCase(); // 无警告
str2.toUpperCase(); // 无警告
// str3.toUpperCase(); // 警告：“str3”的类型为“未知”
// 可以使用断言强制指定str3的类型为string
(str3 as string).toUpperCase(); // 无警告

/* 4. void */
// void的含义是：空或undefined，严格模式下不能将null赋值给void类型
let h: void = undefined;
// let i: void = null; // 警告：不能将类型“null”分配给类型“void”

// void常用于限制函数返回值
// 无警告
function demo1(): void {}
// 无警告
function demo2(): void {return;}
// 无警告
function demo3(): void {return undefined;}
// 警告：不能将类型“null”分配给类型“void”
// function demo4(): void {return null;}
// 警告：不能将类型“number”分配给类型“void”
// function demo5(): void {return 555;}

/* 5. never */
// never的含义是：任何值都不是，简而言之就是不能有值，undefined、null、''、0都不行！
// 几乎不用never去直接限制变量类型，因为没有意义
let j: never;
// 以下对j的所有赋值都会有警告
// j = 1;
// j = false;
// j = 'hello';
// j = undefined;
// j = null;

// never一般是TypeScript主动推断出来的，例如：
let k: string;
k = 'hello';
if(typeof k === 'string'){
    k.toUpperCase();
}else{
    console.log(k); // TypeScript会推断出此处的k是never，因为没有任何一个值符合此处的逻辑
}

// never也可用于限制函数的返回值
// 限制demo函数不需要有任何返回值，像undefined、null都不行
function demo(): never {
    throw new Error('程序异常退出');
}