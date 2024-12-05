/* 接口与自定义类型 */

type PersonType = {
    name: string,
    age: number,
    speak(): void
};

interface PersonInter {
    name: string;
    age: number;
    speak(): void;
}

let p2: PersonType = {
    name: 'ls',
    age: 19,
    speak(): void{
        console.log('hi');
    }
};

// 接口可以当做自定义类型去使用
let p1: PersonInter = {
    name: 'zs',
    age: 18,
    speak(): void{
        console.log('hello');
    }
};

/**
 * 接口与抽象类
 *  接口：
 *      - 只能有抽象方法
 *      - 使用implements关键字去实现接口
 *  抽象类：
 *      - 可以有普通方法，也可以有抽象方法
 *      - 使用extends关键字去继承抽象类
 */

/**
 * 属性修饰符
 *  readonly -> 只读属性，无法被修改
 *  public -> 默认值，可以在类自身、子类以及实例对象中访问
 *  protected -> 只能在类自身和子类中访问
 *  private -> 只能在类自身中访问
 */