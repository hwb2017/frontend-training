// TypeScript里的类型兼容性是基于结构子类型的
interface Named {
    name: string;
}

class Person1 {
    name: string;
}

let p: Named;
// Ok, because of structural typing
p = new Person1();

// 在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口。
// TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

// 对象之间的兼容性比较好判断，只要两个对象之间的目标子类型是相同的即可

let x1 = (a: number) => 0;
let y1 = (b: number, s: string) => 0;

y1 = x1; // x1的每个参数，都能在y1中找到对应类型的参数，这里的x的每个参数都能在y中找到对于的参数，允许赋值
// x1 = y1; error y有必须的第二个参数，而x没有，不允许赋值

// 类之间的兼容性比较只看类的实例部分
class Animal2 {
  feet: number;
  constructor(name: string, numFeet: number) {}
}
class Size {
  feet: number;
  constructor(numFeet: number) {}
}
let a1: Animal2;
let s1: Size;

a1 = s1;
s1 = a1;