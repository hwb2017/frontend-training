// TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 
// 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
// 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

// 可以传入更多参数，但是typescript只关注也只能引用
let myObj = {size: 10, label: "Size 10 Obeject"};
printLabel(myObj);

// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10, y: 20};
// 只读的数组
let a: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
// ro[0] =12; //error
// 类型断言可以给一个类型重新定义
a = ro as number[];


// 避免字面量的额外属性的检查
// let mySquare1 = createSquare({ colour: "red", width: 100}); // error
// 传入的对象字面量包含colour这样interface中未定义的属性，这会无法通过ts的金叉
// 最佳绕开方法，添加一个字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

let mySquare1 = createSquare({ colour: "red", width: 100});

// 函数类型
interface SearchFunc {
    (source: string, substring: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, substring: string) {
    let result = source.search(substring);
    return result > -1;
}

// 可索引的类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface NumberDictionary {
    [index: string]: number;
    length: number;
    // name: string // error 索引类型接口中的所有值需要是同一类型
}
//防止给索引赋值
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
// myArray1[2] = "Mallory" // error

// 类类型
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }

// class Clock implements ClockInterface {
//     currentTime: Date;
//     setTime(d: Date) {
//         this.currentTime = d;
//     }
//     constructor(h: number, m: number) {}
// }
// 当class实现一个interface时，interface只能约束类的动态部分(实例部分),不能约束类的静态部分(构造函数或static方法)
// interface ClockConstructor {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }
//  看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
// 定义Clock类的构造函数需要传入什么参数，返回什么对象
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 接口之间的继承
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
//这里使用了类型断言,等价的写法还可以是 let square = {} as Square, 或 let square: Square
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 混合类型
// 例如，一个类型通过可以作为对象和函数使用
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {};
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
}
let counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;

