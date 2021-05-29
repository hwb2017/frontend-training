// 交叉类型 Intersection Types
function extend<T, U>(first: T, second: U): T & U {
   let result = <T & U>{}; // 类型断言
   for (let id in first) {
       (<any>result)[id] = (<any>second)[id];
   }
   for (let id in second) {
       if (!result.hasOwnProperty(id)) {
           (<any>result)[id] = (<any>second)[id];
       }
   }
   return result;
}

class Person2 {
  constructor(public name: string) {}
}

interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {

    }
}
var jim = extend(new Person2("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

// 联合类型 Union Types
// 联合类型表示一个值可以是几种类型之一
interface Bird {
    fly();
    layEggs();
}
interface Fish {
    swim();
    layEggs();
}
function getSmallPet(): Fish | Bird {
    // ...
    return <Fish | Bird>{}
}
let pet = getSmallPet();
pet.layEggs();
// pet.swim(); // error,联合类型只包含共有成员

// 类型保护，当访问联合类型中哪些各自的非共有成员时，可以增加类型断言来避免访问错误
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}

// 自定义类型保护
// 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值时一个类型谓词
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

// typeof 类型保护
function isNumber(x: any): x is number {
    return typeof x === "number";
}
function isString(x: any): x is string {
    return typeof x === "string";
}
function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
// typeof 可以直接作为类型保护，不用封装成函数
function padLeft1(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined

// 从联合类型中去除 null 或 undefined,除了if/else判断和 || 短路运算，还可以通过!后缀
function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name.charAt(0) + '.   the' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}
function fixed(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + '.   the' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}

// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

// 类型别名与泛型配合
type Container<T> = { value: T};

// 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名

// Discriminated Unions 可辨识联合，其实就是联合类型和switch的配合使用
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
// 类型别名常跟联合类型和交叉类型配合
type Shape1 = Square | Rectangle | Circle;
function area(s: Shape1) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

// 类方法返回this, 实现函数柯里化, 还可以做到父类和子类接口的连贯性
class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}
let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}            
let v1 = new ScientificCalculator(2)
         .multiply(5)
         .sin()
         .add(1)
         .currentValue();

// 索引类型
// javascript中访问对象的多个属性名
// function pluck(o, names) {
//     return names.map(n => o[n]);
// }        
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}
interface Person3 {
    name: string;
    age: number;
}
let person: Person3 = {
    name: 'Jarid',
    age: 35
}
let strings: string[] = pluck(person, ['name']);
// keyof 索引类型查询符，T[K] 索引访问符