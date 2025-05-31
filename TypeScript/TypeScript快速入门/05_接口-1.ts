// 接口用于限制一个类中应该包含哪些属性和方法

/* 1. 接口的基本使用 */
// 定义一个Person接口（定义一套规范）
interface Person {
    // 属性声明
    name: string;
    age: number;
    // 方法声明
    speak(): void;
}
// Teacher类实现Person接口（满足该套规范）
class Teacher implements Person {
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    speak(): void {
        console.log('你好，我是老师：', this.name);
    }
}

/* 2. 接口是可以重复声明的 */
interface PersonInter {
    name: string;
    age: number;
}
interface PersonInter {
    speak(): void;
}
class Per implements PersonInter {
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    speak(): void {
        console.log('你好，我是老师：', this.name);
    }
}