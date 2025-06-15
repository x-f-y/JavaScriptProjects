# 类的继承

**总体规则**：

1. 若A继承自B，则A自动拥有B中的所有成员

   ```typescript
   class B {
     name: string = "zs";
     sayHello(): void {
       console.log('hello');
     }
   }
   
   class A extends B {}
   
   const a = new A();
   console.log(a.name); // zs
   a.sayHello(); // hello
   ```

2. 子类可以对父类的成员进行重写（override），但是重写时，需要保证类型的匹配

   ```typescript
   class B {
     name: string = "zs";
     sayHello(): void {
       console.log('hello');
     }
   }
   
   class A extends B {
     name: string = "ls";
     sayHello(): void {
       console.log('hi');
     }
   }
   
   const a = new A();
   console.log(a.name); // ls
   a.sayHello(); // hi
   ```

3. 在继承关系中，this的指向是动态的——调用方法时，根据具体的调用者确定

   ```typescript
   class B {
     name: string = "zs";
     sayHello(): void {
       console.log('hello, I am ' + this.name);
     }
   }
   
   class A extends B {
     name: string = "ls";
   }
   
   const b = new B();
   const a = new A();
   b.sayHello(); // hello, I am zs
   a.sayHello(); // hello, I am ls
   ```

4. 类型匹配：子类实例可直接赋值给父类类型（里氏替换原则）

   > 这符合我们在TS基础阶段所提到的类型兼容性之鸭子辨型法

   ```typescript
   class Animal {
     name: string = "animal";
   }
   
   class Dog extends Animal {
     name: string = "dog animal";
     age: number = 2;
   }
   
   const animal: Animal = new Dog();
   // animal.age; // 报错：类型“Animal”上不存在属性“age”
   // 若就是需要访问animal的age属性，可使用如下方式：
   if(animal instanceof Dog){ // 类型保护
     console.log(animal.age);
   }
   ```

5. super关键字详解：

   - 在子类的构造函数中使用：

     在子类的构造函数中必须调用`super(args)`初始化父类定义的属性，args为向父类构造函数传递的参数。还需注意：

     1. `super()`的调用必须在访问this之前
     2. 若父类没有显式构造函数，仍需调用`super()`（调用空构造函数）
     3. 若子类没有显式定义构造函数，则会默认生成一个并调用`super()`（无参数）。若父类构造函数需要参数，则必须手动定义子类构造函数并正确传参

     ```typescript
     class Animal {
       name: string;
       constructor(name: string){
         this.name = name;
       }
     }
     
     class Dog extends Animal {
       breed: string;
       constructor(name: string, breed: string){
         super(name);
         this.breed = breed;
       }
     }
     ```

   - 在子类的方法中使用：

     在子类的方法中可以使用`super.methodName()`调用父类的同名方法（常用于方法重写）。还需注意：

     1. 在子类方法中，不能使用`super.property`访问父类的实例属性（使用this替代）
     2. 在静态方法中，super指向父类本身，而不是父类的实例

     ```typescript
     class Animal {
       static planet: string = "Earth";
       move() {
         console.log('Moving...');
       }
     }
     
     class Bird extends Animal {
       static getPlanet() {
         console.log(super.planet);
       }
       move() {
         super.move();
         console.log('Flying...');
       }
     }
     
     Bird.getPlanet();
     const bird = new Bird();
     bird.move();
     ```

**继承的特点**：

1. 单根性：每个类最多只能拥有一个直接父类
2. 传递性：若A是B的父类，且B是C的父类，则可以认为A也是C的父类（A <- B <- C）

# 抽象类

**为什么需要抽象类**？

有时，某个类只表示一个抽象概念，主要用于提取子类共有的成员，而不能直接创建它的对象。这个时候，可以将该类设计为抽象类

抽象类就是专门用来被继承的类，不能直接实例化

**抽象成员**：

在抽象类（通常作为父类）中，我们可能知道有些成员（属性或者方法）是必须存在的，但是不知道其具体的值或者实现是什么。此时，可以将这些成员设计为抽象成员，其具体的值或者实现交给继承该抽象类的子类去完成

抽象类可以包含部分实现，也可以定义抽象成员。其定义的抽象成员在抽象类派生的子类中必须实现

```typescript
abstract class Chess {
  // 抽象属性
  abstract readonly name: string; // 棋子的名称（抽象属性）

  // 抽象方法
  abstract move(): void;
}

class Soldier extends Chess {
  // 实现抽象属性方法一：使用属性默认值
  readonly name: string = "卒";

  // 实现抽象方法
  move(): void {
    console.log(this.name + '只能向前');
  }
}

class Horse extends Chess {
  readonly name: string;
  // 实现抽象属性方法二：使用构造函数
  constructor(name: string){
    super();
    this.name = name;
  }

  // 实现抽象方法
  move(): void {
    console.log(this.name + '走日');
  }
}

class vehicle extends Chess {
  // 实现抽象属性方法三：使用getter
  // 注：这里只有getter，没有setter，本身就是只读的
  get name() {
    return "車";
  }

  // 实现抽象方法
  move(): void {
    console.log(this.name + '走直线');
  }
}

const s = new Soldier();
const h = new Horse("馬");
const v = new vehicle();
console.log(s.name, h.name, v.name); // 卒 馬 車
s.move(); // 卒只能向前
h.move(); // 馬走日
v.move(); // 車走直线
```

tip：其实这里棋子的名称（Chess类的name属性）不设计为抽象属性也能完成效果：

```typescript
abstract class Chess {
  readonly name: string;

  constructor(name: string){
    this.name = name;
  }
}

class Horse extends Chess {
  constructor(name: string){
    super(name);
  }
}

const h = new Horse("馬");
console.log(h.name); // 馬
```

**抽象类非常适合实现模板方法模式（设计模式的一种）**：

考虑这样一样情况：抽象类派生的子类（Soldier、Horse、vehicle）中，move方法的具体实现虽然各不一样，但其流程实际上都是一致的，都大致包含这么几个步骤（仅供参考）：

1. 棋盘边界判断
2. 判断移动的目标位置是否有己方棋子
3. 移动规则验证
4. 将棋子移动到目标位置

其中步骤一、二、四的代码逻辑都是一样的，只有步骤三，对于不同的子类，有着不同的实现逻辑。此时，就可以使用模板方法模式解决这个问题，代码如下：

```typescript
abstract class Chess {
  abstract readonly name: string;

  // 具体步骤
  protected boundaryCheck() {
    console.log('棋盘边界判断');
  }

  protected targetHasAllyChess() {
    console.log('判断移动的目标位置是否有己方棋子');
  }

  protected moveChess() {
    console.log('将棋子移动到目标位置');
  }

  // 抽象步骤
  protected abstract ruleCheck(): void;

  // 模板方法
  move() {
    this.boundaryCheck();
    this.targetHasAllyChess();
    this.ruleCheck();
    this.moveChess();
  }
}

class Soldier extends Chess {
  readonly name: string = "卒";

  protected ruleCheck(): void {
    console.log(this.name + '只能向前');
  }
}

class Horse extends Chess {
  readonly name: string;
  constructor(name: string){
    super();
    this.name = name;
  }

  protected ruleCheck(): void {
    console.log(this.name + '走日');
  }
}

class vehicle extends Chess {
  get name() {
    return "車";
  }

  protected ruleCheck(): void {
    console.log(this.name + '走直线');
  }
}

const s = new Soldier();
const h = new Horse("馬");
const v = new vehicle();
s.move();
h.move();
v.move();
```

# 静态成员

静态成员是类的重要组成部分，它们属于类本身而非类的实例，所有实例都共享同一个静态成员

```typescript
class User {
  // 静态属性
  static users: User[] = [];

  constructor(
    public loginId: string,
    public loginPwd: string,
    public name: string,
    public age: number
  ){
    User.users.push(this);
  }

  // 静态方法
  static login(loginId: string, loginPwd: string): User | undefined{
    // 注意：静态方法中的this指向当前类，而不是当前类的实例
    return this.users.find(user => user.loginId === loginId && user.loginPwd === loginPwd);
  }

  sayHello(): void {
    console.log(`大家好，我叫${this.name}，我今年${this.age}岁了！`);
  }
}

new User("u1", "123", "张三", 18);
new User("u2", "123", "李四", 19);
new User("u3", "123", "王五", 17);

const result = User.login("u2", "123");
if(result){
  result.sayHello();
}else{
  console.log('登录失败，账号或密码错误！');
}
```

**单例模式（设计模式的一种）**：

所谓单例模式，是指某些类的对象，在系统中最多只能有一个。为了避免开发者随意创建多个，可以使用单例模式进行强约束

```typescript
class ChessBoard {
  private static _board: ChessBoard;

  // 私有构造函数防止外部实例化
  private constructor(){}

  // 创建单例
  static createBoard(): ChessBoard {
    if(!this._board){
      this._board = new ChessBoard();
    }
    return this._board;
  }
}

// new ChessBoard(); // 报错
const c1 = ChessBoard.createBoard();
const c2 = ChessBoard.createBoard();
console.log(c1 === c2); // true
```

# 再谈接口

> 接口可以用来约束对象、函数和类，前两个在TS基础阶段已有详细阐述，这里仅讨论用接口来约束类的情况

在面向对象领域，类的继承表达的语义是：**某个类是不是某种事物**，若是这种事物，其实就是继承该类；而接口的实现表达的语义是：**某个类是否拥有某种能力**，若拥有这种能力，其实就是实现该接口

```typescript
interface IFireShow {
  // 表演钻火圈
  fire: () => void;
}

interface IWireShow {
  // 表演走钢丝
  wire: () => void;
}

abstract class Animal {
  abstract type: string;

  constructor(public name: string){}

  sayHello(){
    console.log(`大家好，我叫${this.name}，我是一只${this.type}`);
  }
}

class Tiger extends Animal implements IFireShow, IWireShow {
  type: string = "老虎";

  fire(): void {
    console.log(this.name + "穿越了火圈");
  }

  wire(): void {
    console.log(this.name + "表演走钢丝");
  }
}

class Monkey extends Animal implements IWireShow {
  type: string = "猴子";

  wire(): void {
    console.log(this.name + "表演走钢丝");
  }
}

// 是否会钻火圈
// 注意：这是一个类型保护函数，调用该函数，会触发TS的类型保护，并且这种函数必须返回布尔值
function canFireShow(animal: object): animal is IFireShow {
  if((animal as IFireShow).fire){
    return true;
  }
  return false;
}

// 是否会走钢丝
function canWireShow(animal: object): animal is IWireShow {
  if((animal as IWireShow).wire){
    return true;
  }
  return false;
}

const animals: Animal[] = [
  new Tiger("阿虎"),
  new Monkey("悟空")
];
for(const animal of animals){
  // 此处的animal，TS推断其类型为 Animal
  animal.sayHello();
  if(canFireShow(animal)){
    // 此处的animal，TS推断其类型为 Animal & IFireShow
    animal.fire();
  }
  if(canWireShow(animal)){
    // 此处的animal，TS推断其类型为 Animal & IWireShow
    animal.wire();
  }
}
```

**接口继承类**：

当接口继承一个类时，它会继承类的成员但不包括其实现。 就好像接口声明了类中所有存在的成员，但并没有提供具体实现一样

```typescript
class Control {
  state: string = "";
}

class Operate {
  type: string = "";
}

interface SelectableControl extends Control, Operate {
  select(): void;
}

const test: SelectableControl = {
  state: "valid",
  type: "keydown",
  select(): void {}
}
```

> tip：接口会继承类的private和protected成员。这意味着：当创建了一个接口，该接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现

# 索引签名

索引签名是 TypeScript 类型系统中用于定义对象类型动态属性的特殊语法，它允许我们声明的对象中可以包含额外属性的键类型和值类型。格式为：

```typescript
{
  [key: keyType]: valueType;
}
```

其中：

1. key是索引签名的名称（常用index、key等），除了可读性外，并没有任何意义
2. keyType必须是number、string或symbol类型
3. valueType可以是任意 TypeScript 类型

**number类型索引签名**：常用于约束数组

```typescript
interface Iarr {
  [index: number]: string;
}
const arr: Iarr = ["1", "2", "3"];
arr[3] = "4";
arr[4] = 5; // 报错：不能将类型“number”分配给类型“string”
```

**string类型索引签名**：常用于约束对象

```typescript
interface Iobj {
  [key: string]: any;
}

class User {
  [key: string]: any;
  constructor(
    public name: string,
    public age: number
  ){}
}

const obj: Iobj = {};
const user: User = new User("ls", 16);

// 有了索引签名后，可以为obj和user动态添加属性
obj["name"] = "zs";
obj.age = 14;
user["birthday"] = "2001-04-22";
user.gender = "男";
```

> tip：关于`compilerOptions.noImplicitAny`配置，考虑下面的代码：
>
> ```typescript
> interface Test {}
> const test: Test = {}
> const a = test.a; // 报错：类型“Test”上不存在属性“a”
> const b = test["b"]; // 不报错
> ```
>
> 对于上述代码，Test接口中并没有声明属性b，而test["b"]竟然不报错，这明显不是我们所期望的。这是因为默认情况下，TS不会对索引签名做严格的类型检查，TS主动推断出了此处b的类型为any（隐式的any）。解决方法是：
>
> 在tsconfig.json配置文件中添加配置`compilerOptions.noImplicitAny = true`，开启对隐式any的类型检查。开启后，test["b"]就无法通过TS的类型检查了，需要使用索引签名进行约束

**同时使用number和string类型的索引签名**：不常用

```typescript
interface Iobj {
  [index: number]: string; // 这一行代码报错
  [key: string]: number;
}
```

在JS中，对象的属性名只能是string类型或者symbol类型，属性名为数字时，最终也会转换为字符串。所以，在TS中虽然可以同时使用number和string类型的索引签名，但需要注意，数字索引签名的值类型必须是字符串索引签名值类型的子类型。可将上述代码修改为：

```typescript
interface Iobj {
  [index: number]: string;
  [key: string]: number | string;
}
```

**其它注意点**：

1. 声明一个索引签名时，所有明确的成员都必须符合索引签名

   ```typescript
   // ok
   interface Foo {
     [key: string]: number;
     x: number;
     y: number;
   }
   
   // error
   interface Bar {
     [key: string]: number;
     x: number;
     y: string; // error：属性y必须为number类型
   }
   ```

2. 一个索引签名可以通过映射类型来使索引字符串为联合类型中的一员

   ```typescript
   type index = "a" | "b" | "c";
   type fromIndex = {
     // in是TS中的一个关键字，通常用于在映射类型中迭代键
     [key in index]?: number;
   };
   
   const test: fromIndex = {
     a: 1,
     b: 2,
     c: 3,
     d: 4 // error：对象字面量只能指定已知属性，并且“d”不在类型“fromIndex”中
   }
   ```

# this指向约束

TS在JS的this机制基础上增加了类型检查功能，使得this的使用更加安全和可预测。考虑下面两段代码：

```typescript
interface IUser {
  name: string;
  age: number;
  sayHello(): void;
}

const user: IUser = {
  name: "zs",
  age: 18,
  sayHello() {
    // TS推断此处的this类型为any
    console.log(this);
  }
};

user.sayHello(); // this指向user对象
const sayHello = user.sayHello;
sayHello(); // this指向全局对象global
```

```typescript
class User {
  constructor(
    public name: string,
    public age: number
  ){}

  sayHello(): void {
    // TS推断此处的this类型为User
    console.log(this);
  }
}

const user = new User("zs", 18);
user.sayHello(); // this指向user对象
const sayHello = user.sayHello;
sayHello(); // this指向undefined
```

可以发现：在不同的情况下，this的指向是非常灵活的。这使得开发者在编写函数时，并不明确函数内部this的指向，为了解决这个问题，TS允许在书写函数时，手动指定函数中this的指向。写法是：将this作为函数的第一个参数，声明其类型。例如：

> 这种情况下，函数的第一个参数只用于约束this指向，并不是真正的参数，也不会出现在编译结果中

```typescript
interface IUser {
  name: string;
  age: number;
  // 手动指定this的指向
  sayHello(this: IUser): void;
}

const user: IUser = {
  name: "zs",
  age: 18,
  sayHello() {
    console.log(this);
  }
};
// 正确调用
user.sayHello();
// 错误调用
const sayHello = user.sayHello;
sayHello(); // 报错
```

```typescript
class User {
  constructor(
    public name: string,
    public age: number
  ){}

  // 手动指定this的指向
  sayHello(this: User): void {
    console.log(this);
  }
}

const user = new User("zs", 18);
// 正确调用
user.sayHello();
// 错误调用
const sayHello = user.sayHello;
sayHello(); // 报错
```

**`compilerOptions.noImplicitThis`配置**：

将该配置项设置为true可以限制this的指向，所有类型被推断为隐式any的this都会报错。比如如下代码：

```typescript
function fun(){
  console.log(this); // 报错，此处的this类型被TS推断为隐式的any
}
```

# 装饰器

装饰器（Decorator）是TypeScript中的一种特殊语法，它能够被附加到**类声明**、**方法**、**访问器**、**属性**或**参数**上，用于**附加元数据、修改类/方法/属性行为**。装饰器通过`@expression`的形式附加到声明上，**expression求值后必须为一个函数**，它会在运行时被调用，被装饰的声明信息作为参数传入

> 注意：装饰器会生成到编译结果中，参与最终的运行

JavaScript中的装饰器目前处在*建议征集的第二阶段*，但在TypeScript中已作为一项实验性特性予以支持。要启用实验性的装饰器特性，需要在命令行或者tsconfig.json配置文件中启用experimentalDecorators编译器选项：

命令行：

```shell
tsc --experimentalDecorators
```

tsconfig.json：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

> 注意：装饰器是一项实验性特性，在未来的版本中可能会发生改变

## 类装饰器

类装饰器应用于类本身（即类构造函数），类的构造函数作为其唯一的参数

> 注意：装饰器在类定义时执行，而不是实例化时

```typescript
/* // 约束一个变量为类（构造函数）写法一
type Constructor = new (...args: any[]) => object;

function logClass(constructor: Constructor) {
  console.log(`Class ${constructor.name} created!`);
} */

/* // 约束一个变量为类（构造函数）写法二
// typeof是TS中的一个关键字，表示获取某个变量的类型，这里的意思是限制constructor的类型为MyClass类的构造函数
function logClass(constructor: typeof MyClass) {
  console.log(`Class ${constructor.name} created!`);
} */

// 约束一个变量为类（构造函数）写法三
interface Constructor {
  new (...args: any[]): {}
}

function logClass<T extends Constructor>(constructor: T) {
  console.log(`Class ${constructor.name} created!`);
}

@logClass
class MyClass {
  constructor(){}
}

// 输出：Class MyClass created!
```

如果类装饰器返回一个新的类，则会用这个新的类替换到装饰目标（注意：如果要这样做，需要处理好原型链）

**进阶用法（重载类）**：

```typescript
interface Constructor {
  new (...args: any[]): {}
}

function addGreeting<T extends Constructor>(constructor: T){
  return class extends constructor {
    greeting: string = "hello";
  }
}

@addGreeting
class Person {
  name: string;
  constructor(name: string){
    this.name = name;
  }
}

const p = new Person("Alice");
console.log((p as any).greeting); // 输出：hello
```

**类装饰器的执行顺序**：

```typescript
function decoratorFactory(name: string){ // 装饰器工厂
  console.log(`${name}工厂执行`);
  return function(target: any){ // 装饰器函数
    console.log(`${name}装饰器执行`);
  }
}

@decoratorFactory("A")
@decoratorFactory("B")
class Test {}

// 输出结果：
// A工厂执行
// B工厂执行
// B装饰器执行
// A装饰器执行
```

## 方法装饰器

方法装饰器会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态方法来说是类的构造函数，对于实例方法来说是类的原型对象
2. 固定为一个字符串，表示方法名
3. 方法的属性描述符

注意：如果方法装饰器返回一个值，则该值会被用作方法的属性描述符

```typescript
function logMethod(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor // tip：限制一个变量类型为属性描述符，使用这种写法
){
  const originMethod = descriptor.value;
  descriptor.value = function(...args: any[]){
    // 这里的this指向Calculator类的实例对象
    console.log(`Calling ${methodName} with args:`, args);
    return originMethod.apply(this, args);
  }
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // 输出：Calling add with args: [ 2, 3 ]
```

## 属性装饰器

属性装饰器会在运行时当作函数被调用，传入下列2个参数：

1. 对于静态属性来说是类的构造函数，对于实例属性来说是类的原型对象
2. 固定为一个字符串，表示属性名

```typescript
function format(formatString: string){
  return function(target: any, propName: string){
    let value: any;
    Object.defineProperty(target, propName, {
      get: () => value,
      set: (newValue) => {
        value = `${formatString} ${newValue}`;
      }
    });
  }
}

class Book {
  @format("Title:")
  title: string;
  constructor(title: string){
    this.title = title;
  }
}

const book = new Book("TypeScript Deep Dive");
console.log(book.title); // 输出：Title: TypeScript Deep Dive
console.log(book.hasOwnProperty("title")); // false

/**
 * 一个小细节：
 * 在构造函数中为title赋值前，装饰器已执行完成，book的原型上多了title属性的getter和setter，
 * 而此时book实例对象为空。根据JS的规则，为其title属性赋值会调用原型上的setter而不是在实例
 * 上创建新属性。因此，book对象本身并没有title属性
 */
```

## 访问器装饰器

由于访问器本质上就是一个方法，因此访问器装饰器的参数、返回值与方法装饰器完全一致，这里不再赘述。但需要注意一点：TypeScript不允许同时装饰一个成员的getter和setter

```typescript
function configurable(value: boolean){
  return function(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ){
    descriptor.configurable = value;
  }
}

class User {
  private _email: string = "";

  @configurable(false)
  get email(): string{
    return this._email;
  }

  set email(value: string){
    this._email = value;
  }
}
```

## 参数装饰器

参数装饰器会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态方法来说是类的构造函数，对于实例方法来说是类的原型对象
2. 固定为一个字符串，表示方法名
3. 参数在函数参数列表中的索引

注意：参数装饰器的返回值会被忽略

```typescript
function validateParam(
  target: any,
  methodName: string,
  paramIndex: number
){
  console.log(target, methodName, paramIndex);
}

class ApiService {
  fetchData(@validateParam id: number){
    // ...
  }
}

// 输出：{} fetchData 0
```

## `reflect-metadata`库

这个库允许我们将元数据（metadata）附加到类、方法、属性、方法参数上，并在运行时读取和操作这些元数据。使用示例如下：

> 所谓元数据，简单来说，就是描述数据的数据

```typescript
// src/Descriptor.ts
import "reflect-metadata";

const key = Symbol.for("descriptor");

export function descriptor(description: string){
  return Reflect.metadata(key, description); // 通过装饰器应用元数据
}

export function printObj(obj: any){
  const cons = Object.getPrototypeOf(obj).constructor;
  // 输出类的名字
  if(Reflect.hasMetadata(key, cons)){ // 判断元数据是否存在
    console.log(Reflect.getMetadata(key, cons)); // 获取元数据
  }else{
    console.log(cons.name);
  }
  // 输出所有的属性描述和属性值
  for(const k in obj){
    if(Reflect.hasMetadata(key, obj, k)){
      console.log(`\t${Reflect.getMetadata(key, obj, k)}:${obj[k]}`);
    }else{
      console.log(`\t${k}:${obj[k]}`);
    }
  }
}
```

```typescript
// src/index.ts
import { descriptor, printObj } from "./Descriptor";

@descriptor("用户")
class User {
  @descriptor("账号")
  loginId: string;

  @descriptor("密码")
  loginPwd: string;
}

const u = new User();
u.loginId = "admin";
u.loginPwd = "123";
printObj(u);
```

输出结果：

```
用户
        账号:admin
        密码:123
```

> 该库的其它具体使用详见其npm文档

## `class-validator`库与`class-transformer`库

> tip：这两个库的详细用法参考其官网，这里只提供基本的用法示例

**`class-validator`库**：通过装饰器在类属性上定义验证规则

```typescript
import { IsNotEmpty, Max, MaxLength, Min, MinLength, validate } from "class-validator";

class RegUser {
  @IsNotEmpty({message: "账号不能为空"})
  @MinLength(6, {message: "账号长度应大于等于6"})
  @MaxLength(15, {message: "账号长度应小于等于15"})
  loginId: string;

  loginPwd: string;

  @Min(18, {message: "年龄应大于等于18"})
  @Max(60, {message: "年龄应小于等于60"})
  age: number;

  gender: "男" | "女";
}

const user = new RegUser();
user.loginId = "admin";
user.age = 25;

validate(user).then(errors => {
  if(errors.length){
    console.log("验证不通过");
  }else{
    console.log("验证通过");
  }
})

// 输出：验证不通过
```

**`class-transformer`库**：将普通对象与类实例进行相互转换

```typescript
import "reflect-metadata";
import { plainToInstance, Type } from "class-transformer";

class User {
  id: number;
  firstName: string;
  lastName: string;

  @Type(() => Number) // 指定转换类型
  age: number;

  getName(){
    return this.firstName + ' ' + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

const users = [
  { id: 1, firstName: "Johny", lastName: "Cage", age: "27" },
  { id: 2, firstName: "Ismoil", lastName: "Somoni", age: "50" },
  { id: 3, firstName: "Luke", lastName: "Dacascos", age: "12" }
];

const res = [];
for(const user of users){
  const userInstance = plainToInstance(User, user); // 将普通对象转换为类的实例
  res.push({
    name: userInstance.getName(),
    isAdult: userInstance.isAdult(),
    "typeof age": typeof userInstance.age
  });
}
console.table(res);
```

输出结果：

```
┌─────────┬─────────────────┬─────────┬────────────┐
│ (index) │ name            │ isAdult │ typeof age │
├─────────┼─────────────────┼─────────┼────────────┤
│ 0       │ 'Johny Cage'    │ false   │ 'number'   │
│ 1       │ 'Ismoil Somoni' │ true    │ 'number'   │
│ 2       │ 'Luke Dacascos' │ false   │ 'number'   │
└─────────┴─────────────────┴─────────┴────────────┘
```

## `emitDecoratorMetadata`配置

在tsconfig.json中启用这个配置：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

启用后，TypeScript会为装饰目标生成三种类型的元数据：

1. 设计时类型（design:type）
2. 参数类型（design:paramtypes）
3. 返回类型（design:returntype）

这样一来，只要`reflect-metadata`库被引入了，设计阶段添加的类型信息就可以在运行时使用。也就是说，通过这个功能，**TypeScript的类型检查（约束）将有希望在运行时进行**。

# 类型演算

## 三个关键字

**`typeof`关键字**：获取某个变量或者表达式的类型

```typescript
const a = "hello";
let b: typeof a;
// 等价于：
// let b: "hello"

let c: string = "hello";
let d: typeof c;
// 等价于：
// let d: string

let person = {
  name: "zs",
  age: 18
}
type PersonType = typeof person;
// 等价于：
// type PersonType = {
//   name: string;
//   age: number;
// }

function sum(a: number, b: number): number {
  return a + b;
}
type sumType = typeof sum;
// 等价于：
// type sumType = (a: number, b: number) => number

// 注意：当typeof作用于类时，得到的类型是该类的构造函数
class User {
  loginId: string;
  loginPwd: string;
}
// U的类型是User类的构造函数
function createUser(U: typeof User): User {
  return new U();
}
```

**`keyof`关键字**：获取某个对象类型的所有键组成的联合类型，可用于类型别名、接口和类

```typescript
type PersonType = {
  name: string;
  age: number;
  address: string;
}
interface PersonInter {
  name: string;
  age: number;
  address: string;
}
class PersonClass {
  name: string;
  age: number;
  address: string;
}

type PersonKeys1 = keyof PersonType; // "name" | "age" | "address"
type PersonKeys2 = keyof PersonInter; // "name" | "age" | "address"
type PersonKeys3 = keyof PersonClass; // "name" | "age" | "address"
```

**`in`关键字**：往往和keyof关键字联用，用于在映射类型中迭代键

```typescript
interface Person {
  name: string;
  age: number;
  isActive: boolean;
}

// 将所有属性变为可选
type PartialPerson = {
  [key in keyof Person]?: Person[key]
}
// 等价于：
// type PartialPerson = {
//   name?: string;
//   age?: number;
//   isActive?: boolean;
// }

// 将所有属性变为只读
type ReadonlyPerson = {
  readonly [key in keyof Person]: Person[key]
}
// 等价于：
// type ReadonlyPerson = {
//   readonly name: string;
//   readonly age: number;
//   readonly isActive: boolean;
// }
```

> tip：这里的Person[key]是索引访问类型，用于获取对象类型Person中某个特定属性的类型

## 索引访问类型

索引访问类型是TS中一种强大的类型操作方式，它允许我们通过索引来获取另一个类型中的属性类型

语法：`Type["key"]`，其中；

- Type是一个对象类型，可以是类型别名、接口或类
- "key"是该类型的一个属性名

```typescript
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    zipCode: string;
  };
}

// 获取单个属性类型
type NameType = Person["name"]; // string
type AgeType = Person["age"]; // number

// 获取嵌套属性类型
type CityType = Person["address"]["city"]; // string

// 联合索引访问
type NameOrAgeType = Person["name" | "age"]; // string | number

// 与keyof联合使用
type AllPropertyType = Person[keyof Person]; // string | number | { city: string; zipCode: string; }
```

将索引访问类型与keyof关键字、in关键字以及泛型联合使用，可以产生一些高级用法：

**示例一**：

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
  return obj[key];
}
interface Person {
  name: string;
  age: number;
}
const person: Person = {
  name: "zs",
  age: 30
}
const name = getProperty<Person, "name">(person, "name"); // string
const age = getProperty<Person, "age">(person, "age"); // number
```

**示例二**：

```typescript
class User {
  loginId: string;
  loginPwd: string;
  age: number;
}

type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K]
}

const u: ReadonlyType<User> = {
  loginId: "admin",
  loginPwd: "123",
  age: 18
}
u.age = 19; // 报错：无法为“age”赋值，因为它是只读属性
```

**示例三**：

```typescript
type User = {
  loginId: string;
  loginPwd: string;
  age: number;
}

type OptionalType<T> = {
  [K in keyof T]?: T[K]
}

let u: OptionalType<User> = {
  loginId: "admin",
  loginPwd: "123"
}
```

## TS中预设的类型演算

1. `Partial<T>`：将类型T中的成员变为可选
2. `Required<T>`：将类型T中的成员变为必填
3. `Readonly<T>`：将类型T中的成员变为只读
4. `Exclude<T, U>`：从T中剔除可以赋值给U的类型
5. `Extract<T, U>`：提取T中可以赋值给U的类型
6. `NonNullable<T>`：从T中剔除null和undefined
7. `ReturnType<T>`：获取函数返回值类型
8. `InstanceType<T>`：获取构造函数类型的实例类型
9. ...etc

```typescript
let u1: Exclude<"a" | "b" | "c" | "d", "b" | "c">; // "a" | "d"

let u2: Extract<"a" | "b" | "c" | "d", "b" | "c" | "e" | "f">; // "b" | "c"

type gender = "male" | "female" | null | undefined;
type NoEmptyGender = NonNullable<gender>; // "male" | "female"

type func = () => number;
type funcReturnType = ReturnType<func>; // number
function sum(a: number, b: number){
  return a.toString() + b.toString();
}
type sumReturnType = ReturnType<typeof sum>; // string

class User {}
type instanceType1 = InstanceType<typeof User>; // User
type twoParamsCons = new (arg1: any, arg2: any) => User;
type instanceType2 = InstanceType<twoParamsCons>; // User
```

# 声明文件

**概述**：

TS 中的声明文件（通常以 `.d.ts` 为后缀）是 TS 生态系统的核心组成部分，用于为现有的 JS 代码（尤其是第三方库）提供类型信息。其核心是使用 TS 的声明语法来描述值（变量、函数、类、对象等）的形状和类型。只包含类型信息，**不包含具体的实现代码**（没有函数体、变量初始化等）

**为第三方 JS 库获取声明文件**：

首选 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库，它托管了数千个流行 JS 库的高质量声明文件

例如：使用 `npm i -D @types/lodash` 命令安装 lodash 库的声明文件，之后编写代码时，若用到 lodash 的相关函数，则 TS 会自动查找 `node_modules/@types/lodash` 目录下的声明文件以提供类型检查、智能提示和自动补全等

**为自定义 JS 代码手动编写声明文件**：

如果在 TS 项目中混合使用 JS 文件，可以为这些 JS 文件编写对应的 `.d.ts` 声明文件（同名文件，例如 `util.js` -> `util.d.ts`），对其导出的函数、变量、类等进行描述，从而让 TS 理解它们的类型

> TS 会自动查找同名的 `.d.ts` 文件

**声明文件的常用关键字**：

- `declare var` / `declare let` / `declare const`: 声明全局变量
- `declare function`: 声明全局函数
- `declare class`: 声明全局类
- `declare namespace`: 声明一个对象（包含嵌套属性/方法），早期常用，现代模块化代码中 `module` 或 ES6 模块语法更推荐
- `declare module`: 声明一个模块，为模块内部导出的内容提供类型
- 三斜线指令：
  1. `/// <reference types="..." />`: 用于声明对某个包的依赖
  2. `/// <reference path="..." />`: 用于引用其他类型声明文件
- ...etc

**声明文件基础代码示例**：

1. 全局变量声明（`global.d.ts`）：

   ```typescript
   // 声明一个全局变量
   declare const MY_APP_VERSION: string;
   
   // 声明一个全局函数
   declare function greet(name: string): void;
   
   // 声明一个全局的接口 (不需要 declare)
   interface CustomConfig {
     apiUrl: string;
     debug: boolean;
   }
   
   // 声明通过<script>标签引入的库的全局命名空间
   declare namespace ThirdPartyLib {
     function doSomething(): void;
     const someValue: number;
   }
   ```

2. 模块声明（`module.d.ts`或`@types/foo/index.d.ts`）：

   ```typescript
   // 为模块 'lodash' 提供类型
   declare module 'lodash' {
     export function chunk<T>(array: T[], size: number): T[][]
   }
   ```

3. 为自定义 JS 文件（`utils.js`）编写声明 （`utils.d.ts`）：

   ```javascript
   // utils.js
   export function calculateSum(a, b) {
     return a + b;
   }
   ```

   ```typescript
   // utils.d.ts
   export function calculateSum(a: number, b: number): number;
   ```

**涉及的 tsconfig.json 配置**：

1. `compilerOptions.typeRoots`: 指定 TS 查找类型声明文件（`.d.ts`）的目录
2. `compilerOptions.declaration`: 控制编译时是否为每个 `.ts` 文件对应的 `.d.ts` 类型声明文件

