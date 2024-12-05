// 抽象类就是专门用来被继承的类，所以抽象类不能被实例化，只能被继承
// 抽象类中既可以定义普通方法，也可以定义抽象方法
// 抽象方法没有方法体，且抽象类派生的子类必须实现抽象类中定义的抽象方法

// 定义一个抽象类
abstract class Person {
    name: string;
    age: number;

    constructor(name: string, age: number){ // 构造器
        this.name = name;
        this.age = age;
    }

    abstract speak(): void; // 抽象方法

    sayHello(): void { // 普通方法
        console.log('hello');
    }
}

// Teacher类继承Person
class Teacher extends Person {
    constructor(name: string, age: number){
        super(name, age);
    }
    speak(): void {
        console.log(`你好！我是老师${this.name}，我今年${this.age}岁`);
    }
}

// Student类继承Person
class Student extends Person {
    constructor(name: string, age: number){
        super(name, age);
    }
    speak(): void {
        console.log(`你好！我是学生${this.name}，我今年${this.age}岁`);
    }
}

const t = new Teacher('张三', 30);
t.speak(); // 你好！我是老师张三，我今年30岁
t.sayHello(); // hello

const s = new Student('李四', 18);
s.speak(); // 你好！我是学生李四，我今年18岁
s.sayHello(); // hello