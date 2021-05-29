// 基于值的元素
// 1. 无状态函数组件(SFC)
// 2. 类组件

// 无状态函数组件，它的第一个参数是props对象
interface FooProp {
    name: string;
    x: number;
    y: number;
}
declare function AnotherComponent(prop: {name: string});
function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name} />;
}
const Button = (prop: {value: string}, context: { color: string}) => <button></button>