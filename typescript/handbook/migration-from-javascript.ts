// function myCoolFunction(f: (x: number) => void, nums: number[]): void;
// function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;

// var options = {
//     color: "red",
//     volume: 11
// }

//添加类型断言到对象字面量上
interface Options {color: string; volume: number}
let options = {} as Options;
options.color = "red";
options.volume = 11;

declare var foo: string[] | null;
foo.length;
foo!.length;

//给this添加类型
class Point {
    constructor(public x: number, public y: number) {}
    getDistance(p: Point) {
        let dx = p.x - this.x;
        let dy = p.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}
// ...

// Reopen the interface.
interface Point {
    distanceFromOrigin(point: Point): number;
}
Point.prototype.distanceFromOrigin = function(this: Point, point: Point) {
    return this.getDistance({ x: 0, y: 0});
}