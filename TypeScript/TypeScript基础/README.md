# 基础类型

## null和undefined

在TypeScript中，js中的基本数据类型null和undefined各自有自己的类型，分别叫做null和undefined：

```typescript
let n: null = null;
let u: undefined = undefined;
```

默认情况下，null和undefined是其他所有类型的子类型，它们可以被赋值给其他类型：

```typescript
let a: number = n;
let b: string = u;
```

但大多数情况下，我们并不希望出现这种默认行为，此时，可以在tsconfig.json配置文件中加上配置`compilerOptions.strictNullChecks = true`开启严格的空类型检查：

```json
// tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

开启后，null和undefined就无法赋值给其他类型的变量了。

## never

never类型：通常用于约束函数的返回值，表示该函数永远不可能结束。例如：

```typescript
function throwError(msg: string): never {
  throw new Error(msg);
}
function alwaysDoSomething(): never {
  while(true){
    // ...
  }
}
```

# 扩展类型

## 枚举

枚举：通常用于约束某个变量的取值范围。虽然字面量和联合类型配合使用（类型别名），也可以达到同样的效果，但枚举有其独特的优势：

1. 使用枚举可以将逻辑含义和真实的值区分开来。在开发时，使用的是逻辑含义（Male、FeMale），而不是真实的值（帅哥、美女）。这样做的好处在于：若将来要将“帅哥”修改为“男”，将“美女”修改为“女”，只需要在枚举的定义处完成修改即可。

   ```typescript
   enum Gender {
     Male = "帅哥",
     FeMale = "美女"
   };
   
   let gender1: Gender = Gender.Male;
   let gender2: Gender = Gender.FeMale;
   
   console.log(gender1, gender2);
   ```

2. 枚举会出现在编译结果中，表现为一个对象。比如，上述代码的编译结果为：

   ```javascript
   var Gender;
   (function (Gender) {
       Gender["Male"] = "\u5E05\u54E5";
       Gender["FeMale"] = "\u7F8E\u5973";
   })(Gender || (Gender = {}));
   ;
   let gender1 = Gender.Male;
   let gender2 = Gender.FeMale;
   console.log(gender1, gender2);
   ```

   根据此特性，我们在ts源代码中，可以直接将Gender当做一个对象使用：

   ```typescript
   for(const key in Gender){
     console.log(key + ':' + Gender[key]);
   }
   ```

枚举的规则：

- 枚举的字段值可以是字符串或者数字

- 若枚举的字段值是数字（称为数字枚举），则会自动递增。若未指定递增的初始值，则从0开始递增

- 被数字枚举约束的变量，可以直接赋值为数字。例如，以下代码是被允许的：

  ```typescript
  enum Level {
    level1 = 1,
    level2
  };
  
  let level: Level = 2;
  ```

  > 注意：虽然以上代码不报错，但强烈不建议这样做，会将逻辑含义与真实的值混淆。

- 字符串枚举（枚举的字段值是字符串）和数字枚举的编译结果有差异：

  ```typescript
  enum Gender {
    Male = "帅哥",
    FeMale = "美女"
  };
  
  for(const key in Gender){
    console.log(key + ':' + Gender[key]);
  }
  
  enum Level {
    level1 = 1,
    level2
  };
  
  for(const key in Level){
    console.log(key + ':' + Level[key]);
  }
  
  // 输出结果为：
  // Male:帅哥
  // FeMale:美女
  // 1:level1
  // 2:level2
  // level1:1
  // level2:2
  ```

枚举的最佳实践：

1. 尽量不要在一个枚举中既出现字符串字段，又出现数字字段
2. 使用枚举时，尽量使用枚举字段的名称（逻辑含义），而不是真实的值

## 接口

> 和类型别名一样，接口也不会出现在编译结果中

TypeScript中的接口指的是：用于约束类、对象、函数的契约（标准）

1. 接口约束类

   > 具体内容详见TypeScript进阶部分

2. 接口约束对象

   ```typescript
   interface User {
     name: string;
     age: number;
     sayHello: () => void;
     // 下面这种写法也可以
     // sayHello(): void;
   }
   
   // 类型别名也可以达到同样的效果
   /* type User = {
     name: string;
     age: number;
     sayHello: () => void;
     // 下面这种写法也可以
     // sayHello(): void;
   } */
   
   let u: User = {
     name: "zs",
     age: 18,
     sayHello(){
       console.log("hello");
     }
   }
   ```

3. 接口约束函数

   ```typescript
   interface Condition {
     (n: number): boolean
   }
   
   // 类型别名也可以达到同样的效果
   // 写法一
   /* type Condition = {
     (n: number): boolean
   } */
   // 写法二
   // type Condition = (n: number) => boolean
   
   function sum(numbers: number[], callback: Condition): number{
     let res = 0;
     numbers.forEach(n => {
       if(callback(n)){
         res += n;
       }
     })
     return res;
   }
   ```

接口可以继承，从而实现多种规则的组合：

```typescript
interface A {
  T1: number;
}

interface B {
  T2: boolean;
}

interface C1 extends A {
  // 子接口不能覆盖父接口的成员
  // T1: boolean;
  T3: string;
}

// 可以同时继承多个接口
interface C2 extends A, B {
  T4: string;
}

// 通过类型别名和&配合也可以实现类似的效果
/* type A = {
  T1: number;
}

type B = {
  T2: boolean;
}

type C1 = {
  T3: string;
} & A

type C2 = {
  T4: string;
} & A & B */

let c1: C1 = {
  T1: 10,
  T3: "abc",
}

let c2: C2 = {
  T1: 12,
  T2: true,
  T4: "qwe"
}
```

## 类

**属性列表**：

考虑以下代码：

```typescript
class User {
  constructor(name: string, age: number){
    this.name = name; // 报错：类型“User”上不存在属性“name”
    this.age = age; // 报错：类型“User”上不存在属性“age”
  }
}
```

上述代码的书写方式在JS中是正确的（如果不考虑构造函数参数的类型限制的话），为什么到了TS中就报错呢？因为TS认为，一个类（对象）有哪些属性，在创建该类（对象）时就应该是确定的，而不能后期动态的添加，比如对于以下代码，在TS中认为是**不合法**的：

```typescript
const obj = {};
obj.name = "zs";
obj.age = 18;
```

所以在创建类（对象）时，需要使用属性列表来描述类（对象）中具体有哪些属性：

```typescript
class User {
  // 属性列表
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }
}
```

**strictPropertyInitialization配置选项**：

考虑以下代码：

```typescript
class User1 {
  name: string;
  age: number;
}

class User2 {
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name = name;
  }
}

const u1 = new User1();
const u2 = new User2('zs', 18);
```

上述代码看起来很奇怪，创建类User1和类User2时，明确指明了name属性的类型为string、age属性的类型为number，但在实例化时，u1.name、u1.age、u2.age均为undefined，明显类型不匹配。但上述代码并没有报错，这明显不是我们所期望的。此时，可以在tsconfig.json配置文件中加上配置`compilerOptions.strictPropertyInitialization = true`开启严格的类属性初始化检查。开启后，上述代码就无法通过TS的类型检查了。

> 建议开启这个配置

**属性默认值初始化**：

```typescript
class User1 {
  name: string;
  gender: "男" | "女";

  // 写法一：在构造函数中添加参数默认值
  constructor(name: string, gender: "男" | "女" = "男"){
    this.name = name;
    this.gender = gender;
  }
}

class User2 {
  name: string;
  // 写法二：在属性列表中添加属性默认值（推荐）
  gender: "男" | "女" = "女";

  constructor(name: string){
    this.name = name;
  }
}

console.log(new User1("zs")); //  name: 'zs', gender: '男' }
console.log(new User2("xw")); // { gender: '女', name: 'xw' }
```

**可选属性**：

```typescript
class User {
  name: string;
  // 写法一
  // job: string | undefined;
  // 写法二（推荐）
  job?: string;

  constructor(name: string){
    this.name = name;
  }
}

const u = new User("zs");
console.log(u); // { name: 'zs' }
u.job = "teacher";
console.log(u); // { name: 'zs', job: 'teacher' }
```

**只读属性**：

```typescript
class User {
  readonly id: string;
  name: string;

  constructor(name: string){
    this.id = getUniqueId();
    this.name = name;
  }
}

const u = new User("zs");
// u.id = "xxx"; // 报错：无法为“id”赋值，因为它是只读属性
```

**访问修饰符public、protected和private**：

详见[下文](#modifier)

**属性简写**：

如果某个属性，通过构造函数的参数传递，并且不做任何处理，直接赋值给该属性，则可以进行简写。例如以下代码：

```typescript
class User {
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }
}
```

可以简写为：

```typescript
class User {
  constructor(public name: string, public age: number){}
}
```

这种简写只是一种语法糖，当你在构造函数参数前添加访问修饰符（public、protected、private或readonly）时，TypeScript会自动：

1. 声明一个同名的类属性
2. 在构造函数中将参数值赋值给该属性

**访问器**：

```typescript
class Person {
  private _age: number = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number){
    if(value >= 0 && value <= 120){
      this._age = value;
    }else{
      throw new Error("Invalid age");
    }
  }
}

const p = new Person();
p.age = 25; // 调用 setter（设置器）
console.log(p.age); // 调用 getter（获取器）
```

注意：

1. 访问器在使用时不加括号，像普通属性一样访问。但实际上是调用了方法

2. 访问器可以只有getter，没有setter

   ```typescript
   class Person {
     private _age: number = 0;
   
     get age(): number {
       return this._age;
     }
   }
   
   const p = new Person();
   // p.age = 25; // 报错：无法为“age”赋值，因为它是只读属性
   console.log(p.age); // 0
   ```

3. 在ES6中，类语法就原生支持了访问器。TS只不过是在此基础上，增加了类型注解和访问修饰符的支持

## 泛型

**在类型别名中使用泛型**：

```typescript
type Condition<T> = (n: T) => boolean;

function filter<T>(arr: T[], condition: Condition<T>): T[] {
  const newArr: T[] = [];
  arr.forEach(n => {
    if(condition(n)){
      newArr.push(n);
    }
  })
  return newArr;
}

console.log(filter<number>([1, 2, 3, 4, 5], n => n % 2 === 1)); // [ 1, 3, 5 ]
```

**多泛型**：

```typescript
function mixinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if(arr1.length !== arr2.length){
    throw new Error("两个数组长度不等");
  }
  // const result: (T | K)[] = [];
  const result: Array<T | K> = [];
  for(let i = 0; i < arr1.length; i++){
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  return result;
}

console.log(mixinArray<number, string>([1, 2, 3], ["a", "b", "c"])); // [ 1, 'a', 2, 'b', 3, 'c' ]
```

# 修饰符

## readonly只读修饰符

> readonly修饰符不会出现在编译结果中

```typescript
interface User {
  readonly id: string;
  name: string;
  age: number;
}

/* type User = {
  readonly id: string;
  name: string;
  age: number;
} */

let u: User = {
  id: "123",
  name: 'zs',
  age: 18
}

// 下面这行代码是错误的，因为id为只读属性
// u.id = "124";

// let arr: ReadonlyArray<number> = [2, 1, 3];
// 等同于下面这种写法
let arr: readonly number[] = [2, 1, 3];

// arr[1] = 4; // ❌
// arr.push(8); // ❌
// arr.unshift(7); // ❌
// arr.pop(); // ❌
// arr.shift(); // ❌
// arr.splice(1, 1); // ❌
// arr.sort(); // ❌
// arr.reverse(); // ❌
arr = [4, 5, 6]; // ✅
arr = arr.concat(2, 3); // ✅
arr = arr.map(n => n * 2); // ✅

interface A {
  R: readonly number[];
  readonly S: number[];
  readonly T: readonly number[];
}

let a: A = {
  R: [2, 1, 3],
  S: [2, 1, 3],
  T: [2, 1, 3]
}

// a.R = ... ✅
// a.R[1] = 4; a.R.push(8); a.R.unshift(7); a.R.pop(); a.R.shift(); a.R.splice(1, 1); a.R.sort(); a.R.reverse(); ❌
// a.S = ... ❌
// a.S[1] = 4; a.S.push(8); a.S.unshift(7); a.S.pop(); a.S.shift(); a.S.splice(1, 1); a.S.sort(); a.S.reverse(); ✅
// a.T = ... ❌
// a.T[1] = 4; a.T.push(8); a.T.unshift(7); a.T.pop(); a.T.shift(); a.T.splice(1, 1); a.T.sort(); a.T.reverse(); ❌
```

## <a id="modifier">public、protected、private访问修饰符</a>

1. public：公开的访问修饰符（默认），**成员（属性和方法）在任何地方都可访问（类内部、子类、实例对象）**
2. protected：受保护的访问修饰符，**成员（属性和方法）仅在类内部和子类中可访问，实例对象不可访问**
3. private：私有的访问修饰符，**成员（属性和方法）仅在类内部可访问，子类和实例对象均不可访问**

# 类型兼容性

> 类型兼容性这块的具体规则比较细致，但我们并不用太过于关注其中的细节。因为**一切都显得那么的自然**。事实上，实际编写代码时，我们甚至都感觉不到TS中类型兼容性判定的存在

> 什么是类型兼容？`let A = B;`这段代码将B赋值给A，若能完成赋值，则认为B和A类型兼容

1. 基本类型的类型兼容：要求完全匹配。

2. 对象类型的类型兼容：鸭子辨型法。

   所谓鸭子辨型法（又称子结构辨型法）是指：目标类型（A）需要某一些特征，赋值的类型（B）只要能满足这些特征就认为B和A的类型是匹配的。例如，以下代码是**合法**的：

   ```typescript
   // 只要一个对象满足鸭子的某些特征（会“嘎嘎嘎”叫、会游泳），我们就可以认为这个对象是一只鸭子
   interface Duck {
     sound: "嘎嘎嘎"; // sound为字面量类型“嘎嘎嘎”
     swim(): void;
   }
   
   let person = {
     name: "伪装成鸭子的人",
     age: 10,
     // 类型断言，将sound的类型强行断言为字面量“嘎嘎嘎”类型，否则ts的类型推断会认为sound为字符串类型
     // 写法一
     sound: "嘎嘎嘎" as "嘎嘎嘎",
     // 写法二
     // sound: <"嘎嘎嘎">"嘎嘎嘎",
     swim() {
       console.log(this.name + "正在游泳，并发出了" + this.sound + "的声音");
     }
   }
   
   let duck: Duck = person;
   ```

   但需要额外注意一点：当直接使用对象字面量赋值的时候，会进行更加严格的类型检查。例如，以下代码是**不合法**的：

   ```typescript
   interface Duck {
     sound: "嘎嘎嘎";
     swim(): void;
   }
   
   let duck: Duck = {
     name: "伪装成鸭子的人",
     age: 10,
     sound: "嘎嘎嘎" as "嘎嘎嘎",
     swim() {
       console.log(this.name + "正在游泳，并发出了" + this.sound + "的声音");
     }
   };
   ```

3. 函数类型的类型兼容：对于参数，传递给目标函数的参数数量可以少，但不能多（当然参数的类型要匹配）；对于返回值，要求返回时，必须返回（当然返回值的类型也要匹配），不要求返回时，随意，可返回可不返回。

   例如，以下代码是**合法**的：

   ```typescript
   interface Condition {
     (n: number, i: number): boolean
   }
   
   function sum(numbers: number[], callback: Condition): number{
     let res = 0;
     numbers.forEach((n, i) => {
       if(callback(n, i)){
         res += n;
       }
     })
     return res;
   }
   
   // 目标函数需要两个参数，但这里只传递一个参数也是正确的，不会报错
   const res = sum([1, 2, 3, 4, 5], n => n % 2 === 0);
   console.log(res);
   
   // 传递给forEach方法的第一个参数是一个回调函数，格式：(value: number, index: number, array: number[]) => void
   // 该回调函数不要求返回，但这里返回了也是正确的，不会报错
   [1, 2, 3].forEach(n => {
     return "haha";
   })
   ```

# TS中的模块化

> **在TS中，导入和导出模块，统一使用ES6的模块化标准（import、export）**

注意：在TS中，导入模块时，不要加后缀：

- `import sayHello, { name } from "./myModule.ts";`（❌）
- `import sayHello, { name } from "./myModule.js";`（❌）
- `import sayHello, { name } from "./myModule";`（✅）

TS的模块化在编译结果中表现为：

1. 若编译结果的模块化标准为ES6（`compilerOptions.module = "ES2015"`），则没有区别
2. 若编译结果的模块化标准为CommonJS（`compilerOptions.module = "CommonJS"`），则具名导出会变成exports的属性，默认导出会变成exports的default属性

> 思考：若编译结果的模块化标准为CommonJS，在TS中如何引入使用CommonJS模块化标准导出的模块（如node内置模块fs）呢？
>
> 1. `import fs from "fs"; fs.readFileSync();`（❌）
> 2. `import * as fs from "fs"; fs.readFileSync();`（✅）
> 3. `import { readFileSync, ... } from "fs"; fs.readFileSync();`（✅）
>
> 为什么第一种引入方式是错误的？
>
> 答：因为第一种引入方式在编译结果中表现为：
>
> ```javascript
> const fs = require("fs");
> fs.default.readFileSync();
> ```

> tip：如果非要使用`import xxx from "yyy"`这种方式来引入使用CommonJS模块化标准导出的模块，可以实现吗？
>
> 答：可以的，只需要在tsconfig.json配置文件中设置`compilerOptions.esModuleInterop = true`即可。开启此配置后，`import fs from "fs"; fs.readFileSync();`这样的代码就不会报错了

TS中有两种模块解析策略：

> 所谓模块解析策略，就是告诉TS，应该从什么位置寻找模块

1. classic（`compilerOptions.moduleResolution = "classic"`）：经典模块解析策略。一般不使用这种方式，这里不展开
2. node（`compilerOptions.moduleResolution = "node"`）：node模块解析策略。与node的模块解析机制完全相同，唯一的区别是，将js替换成ts

# 其他

## ts常用第三方库

- `@types/node`：Node.js的类型定义包，它为Node.js的核心模块（如fs、path、http等）提供TypeScript类型支持
- `ts-node`：一个TypeScript执行引擎，它允许你直接运行TypeScript文件而无需先编译成JavaScript文件（在内存中完成编译的）

## ts常用命令

- `tsc 输入文件`：将输入文件（ts文件）编译成js文件（特别注意：当命令行上指定了输入文件时，则编译时会忽略tsconfig.json配置）
- `tsc`：将整个工程下的ts文件编译成js文件（可以在tsconfig.json配置中指定具体需要编译哪些ts文件）
- `tsc --watch`：运行tsc命令的同时，开启监视模式，在ts文件变化后会自动重新编译
- `tsc --init`：生成tsconfig.json配置文件
- `ts-node src/index.ts`：编译并运行src/index.ts文件（第三方库ts-node提供的命令）（tip：使用该命令运行ts文件时，tsconfig.json中的配置仍然有效）
- `nodemon --watch src -e ts --exec ts-node src/index.ts`：监测src目录下文件扩展名为ts的文件的变化，并在文件变化后运行`ts-node src/index.ts`命令（第三方库nodemon提供的命令）
- `rd /s /q dist`（windows命令）：删除dist目录，`/s`选项表示删除目录树，包括目录中的所有子目录和文件；`/q`选项表示安静模式，删除时不要求确认

## 函数重载

函数重载：在函数实现之前，对函数调用的多种情况进行声明。例如：

```typescript
// 函数声明
/**
 * 得到a和b的乘积
 * @param a 
 * @param b 
 */
function combine(a: number, b: number): number;
/**
 * 得到a和b拼接的结果
 * @param a 
 * @param b 
 */
function combine(a: string, b: string): string;
// 函数实现
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a * b;
  }
  else if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  throw new Error("a和b必须是相同的类型");
}

const a = combine('qwe', 'asd');
const b = combine(13, 24);
// const c = combine("zxc", 67); // 报错
```

