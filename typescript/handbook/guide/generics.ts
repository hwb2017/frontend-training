// function indentity(arg: number): number {
//     return arg;
// }
// 如果传入和返回设置为 any，则不能保证它们的类型是相同的

// 这里使用T作为类型变量，它是一种特殊的变量，只用于表示类型而不是值
function identity<T>(arg: T): T {
    return arg;
}
// 我们给identity添加了类型变量T, T帮助我们捕获用户传入的类型，之后我们可以使用这个类型。
// 之后我们再次使用了T当作返回值类型，现在我们可以知道参数类型和返回值类型是相同的了

//定义泛型后有两种方法使用，第一种是传入所有的参数，包括类型参数:
let output = identity<string>("myString");
// 第二种更为常见，使用类型推论
let output1 = identity("myString");

// 让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length); //Array对象有length属性，不会报错
    return arg;
}

// 定义泛型函数接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity1<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity;
// 另一种写法，将泛型参数写到interface的名称后面
// interface GenericIdentityFn<T> {
//     (arg: T): T;
// }
// function identity1<T>(arg: T): T {
//     return arg;
// }
// let myIdentity: GenericIdentityFn<number> = identity;

// 定义泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x,y) {return x+y;};
// 泛型类型指的是实例部分的类型，类的静态属性不能使用这个泛型类型

// 用接口来定义泛型约束
interface Lengthwise {
    length: number;
}
function loggingIdentity1<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 这时候泛型确定有length字段了
    return arg;
}
