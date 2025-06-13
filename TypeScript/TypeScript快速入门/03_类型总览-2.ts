/* 6. 对象 */
// object的含义：任何【非原始值类型】，包括对象、函数、数组等，限制的范围比较宽泛，用的较少
// Object的含义：Object的实例对象，限制的范围太大了，几乎不用

let a: object; // a的值可以是任何【非原始值类型】，包括：对象、函数、数组等
// 以下代码，是将【非原始值类型】赋值给a，所以均无警告
a = {};
a = {name: '张三'};
a = [1, 2, 3];
a = function(){};
// 以下代码，是将【原始值类型】赋值给a，均有警告
// a = null;
// a = undefined;
// a = 1;
// a = true;
// a = '你好';

let b: Object; // b的值必须是Object的实例对象
// 以下代码均无警告
b = {};
b = {name: '张三'};
b = [4, 5, 6];
b = function(){};
b = 1; // 1不是Object的实例对象，但其包装对象是Object的实例
b = false; // false不是Object的实例对象，但其包装对象是Object的实例
b = '你好'; // '你好'不是Object的实例对象，但其包装对象是Object的实例
// 以下代码均有警告
// b = null;
// b = undefined;

// 实际开发中，限制一般对象，通常使用以下形式：
// 限制person对象的具体内容，使用【,】分隔，问号?代表可选属性
let person: {name: string, age?: number};
// 限制car对象的具体内容，使用【;】分隔，必须有price和color属性，其它属性不做限制，有没有都行
let car: {price: number, color: string, [propName: string]: any};
// 限制student对象的具体内容，使用【回车】分隔
let student: {
    id: string
    grade: number
};
// 以下代码均无警告
person = {name: '张三', age: 18};
person = {name: '李四'};
car = {price: 40, color: 'blue'};
car = {price: 50, color: 'red', a: 1, b: true, c: 'hello'};
student = {id: 'asdasdasd01', grade: 80};

// 限制函数的参数、返回值，使用以下形式：
let fun: (x: number, y: number) => number;
fun = function(a, b){
    return a;
}

// 限制数组，使用以下形式：
let arr1: string[]; // 该行代码等价于：let arr1: Array<string>;
let arr2: number[]; // 该行代码等价于：let arr2: Array<number>;
arr1 = ['a', 'b', 'c'];
arr2 = [1, 2, 3];

/* 7. tuple（元组） */
// tuple就是一个长度固定的数组
// 限制c是一个有且仅有2个元素的数组，第一个元素是字符串，第二个元素是数值
let c: [string, number];
c = ['hello', 123];
// c = ['hello', 123, true]; // 警告：不能将类型“[string, number, boolean]”分配给类型“[string, number]”

/* 8. enum（枚举） */
enum Color {Red, Green, Blue}; // 定义一个枚举
enum Color2 {Red = 5, Green, Blue}; // 定义一个枚举，并指定其初始数值
console.log(Color); // {0: 'Red', 1: 'Green', 2: 'Blue', Red: 0, Green: 1, Blue: 2}
console.log(Color2); // {5: 'Red', 6: 'Green', 7: 'Blue', Red: 5, Green: 6, Blue: 7}
let phone: {name: string, price: number, color: Color};
phone = {name: 'HUAWEI Mate60', price: 6500, color: Color.Red};
phone = {name: 'iPhone 15ProMax', price: 9000, color: Color.Blue};
if(phone.color === Color.Blue){
    console.log('手机是蓝色的');
}

/* 9. 扩展 */
// 可以使用&设置同时满足多个类型限制（“&”称为交叉类型）
let d: {name: string} & {age: number};
d = {name: 'zs', age: 18};

// 可以设置类型别名
type myType = 1 | 2 | 3;
let e: myType;
e = 1;
e = 2;
e = 3;
// e = 4; // 警告：不能将类型“4”分配给类型“myType”

// 自定义类型
enum Gender {
    Male,
    Female
};
type Grade = 1 | 2 | 3;
type Student = {
    name: string,
    age: number,
    gender: Gender,
    grade: Grade
};
let s1: Student = {name: '张三', age: 18, gender: Gender.Male, grade: 1};
let s2: Student = {name: '李四', age: 19, gender: Gender.Female, grade: 3};