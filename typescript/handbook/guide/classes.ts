// 公共，私有与受保护的修饰符
// 在TypeScript里，成员默认认为是 public
// class Animal {
//     public name: string;
//     public constructor(theName: string) { this.name = theName; }
//     public move(distanceInMeters: number) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }
// 当成员被标记为private，它就不能在声明它的类的外部访问
class Animal {
  private name: string;
  constructor (theName: string) {this.name = theName;}
}
// new Animal("Cat").name; // error name是私有的

// protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}
class Employee extends Person {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); 外部直接访问private或protected的属性是错误的

// 参数属性，类的成员属性直接作为构造函数的入参
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor (readonly name: string) {

    }
}

// 通过存取器getter/setter来限制对对象属性的存取
let passcode = "secret passcode";
class Employee1 {
  private _fullName: string;
  get fullName(): string {
      return this._fullName;
  }
  set fullName(newName: string) {
      if (passcode && passcode == "secret passcode") {
          this._fullName = newName;
      }
      else {
          console.log("Error: Unauthorized update of employee!");
      }
  }
}
let employee = new Employee1();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}

// 静态属性
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin (point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist)
    }
    constructor (public scale: number) {}
}
let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// 抽象类作为其他派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节
abstract class Animal1 {
  abstract makeSound(): void;
  move(): void {
      console.log('roaming the earch...');
  }
}

abstract class Department {
    constructor(public name: string) {
    }
    printName(): void {
        console.log('Department name: '+ this.name);
    }
    abstract printMeeting(): void; //抽象类中的抽象方法，必须在派生类中实现/重写
}

class AccountingDepartmen extends Department {
    constructor() {
        super('Accounting and Auditing');
    }
    printMeeting(): void {
        console.log('The Accounting  Department meets each Monday at 10am');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

