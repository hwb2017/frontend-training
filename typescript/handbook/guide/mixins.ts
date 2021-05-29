class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }
}

class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

// 使用implements 而非 extends, 把类当成接口，仅使用Disposable和Activatable的类型而非其实现
class SmartObject implements Disposable, Activatable {
    //插入占位属性或方法
    isDisposed: boolean = false;
    dispose: () => void;
    isActive: boolean = false;
    activate: () => void;
    declare: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        })
    })
}