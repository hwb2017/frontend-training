// 数组
// 方式一：
let list1: number[] = [1,2,3];
// 方式二：数组泛型
let list2: Array<number> = [1,2,3];

// 元组
// 元组类型允许表示一个已知元素数量和类型的数组
let x: [string, number];
x = ['hello', 10];

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Red;
// 也可以为枚举类型中的元素赋值
enum Color1 {Red = 1, Green = 2, Blue=4}
let c1: Color1 = Color1.Blue

// Any
// 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量
// 对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// Never
// never类型表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 类型断言
// 运用场景有，当引入第三方库的某个类型限制比较宽泛(any)时，你可以重新给它设置类型断言，使它接受的类型更为精准
// 方式一:尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 方式二:as语法
let someValue1: any = "this is a string";
let strLength2: number = (someValue1 as string).length;
// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。