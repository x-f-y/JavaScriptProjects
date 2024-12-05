/**
 * 定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时就需要泛型了
 *  举例：<T>就是泛型（不一定非叫T），设置泛型后就可以用T来表示该类型了
 */

/* 泛型函数 */
function test<T>(arg: T): T{
    return arg;
}
function test2<T, K>(a: T, b: K): K{
    return b;
}
// 不指定类型，TS会自动推断出来
test(10);
// 也可以手动指定具体的类型
test<string>('hello');
test2<number, string>(10, 'hello');

/* 泛型接口 */
interface Pair<T, U>{
    first: T;
    second: U;
}
let pair: Pair<string, number> = {first: 'hello', second: 42};

/* 泛型类 */
class Box<T>{
    private value: T;
    constructor(value: T){
        this.value = value;
    }
    getValue(): T{
        return this.value;
    }
}
let stringBox = new Box<string>('TypeScript');

/* 泛型约束 */
interface Lengthwise {
    length: number;
}
// 泛型T必须实现Lengthwise接口，即：必须拥有length属性
function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}
// 正确的使用
logLength({name: 'zs', length: 2}); // 打印2
logLength('hello'); // 打印5
// 错误的使用，因为数字没有length属性
// logLength(42);

/* 泛型默认值 */
function defaultValue<T = string>(arg: T): T{
    return arg;
}