let a: number; // 变量a只能存储数值
let b: string; // 变量b只能存储字符串
let c: boolean; // 变量c只能存储布尔值

a = 10;
// a = 'hello'; // 警告：不能将类型“string”分配给类型“number”

b = 'hello';
// b = true; // 警告：不能将类型“boolean”分配给类型“string”

c = false;
// c = 3; // 警告：不能将类型“number”分配给类型“boolean”

// 变量声明后也可以直接进行赋值
let d: string = "hello world";

// 当变量的声明和赋值同时进行时，TS会自动推断出变量的类型
let e = -99;
// e = false; // 警告：不能将类型“boolean”分配给类型“number”

// 参数x必须是数字，参数y必须是数字，函数返回值也必须是数字
function demo(x: number, y: number): number{
    return x + y;
}

demo(100, 200);
// demo(100, "200"); // 警告：类型“string”的参数不能赋给类型“number”的参数
// demo(100, 200, 300); // 警告：应有 2 个参数，但获得 3 个
// demo(100); // 警告：应有 2 个参数，但获得 1 个