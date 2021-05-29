// 合并接口
// 合并的机制是把双方的成员放到一个同名的接口里

import { SecureHeapUsage } from "crypto";

// 接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错。
interface Box {
    height: number;
    width: number;
}
interface Box {
    scale: number;
}
let box: Box = {height: 5, width: 6, scale: 10};

// 对于接口中的函数成员，每个同名函数声明都会被当成这个函数的一个重载。
// 同时需要注意，当接口A与后来的接口A合并时，后面的接口具有更高的优先级