function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null
  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      setTimeout(() => {
        if (this.status === 'pending') {
            this.value = value
            this.status = 'fulfilled'
            this.onFulfilledArray.forEach(func => {
                func(this.value)
            })
        }
      })
  }
  const reject = (reason) => {
      setTimeout(() => {
        if (this.status === 'pending') {
            this.reason = reason
            this.status = 'rejected'
            this.onRejectedArray.forEach(func => {
                func(this.reason)
            })
        }
      })
  }
  try {
    executor(resolve, reject)
  } catch(e) {
      reject(e)
  }
}

const resolvePromise = (promise2, result, resolve, reject) => {
    // 当result和promise2相等时，也就是在onfulfilled返回promise2时，执行reject
    if (result === promise2) {
      reject(new TypeError('error due to circular reference'))
    }
    // 是否已经执行过 onfulfilled 或者 onrejected 
    let consumed = false
    let thenable

    if (result instanceof Promise) {
        if (result.status === 'pending') {
            result.then(function(data) {
                resolvePromise(promise2, data, resolve, reject)
            }, reject)
        } else {
            result.then(resolve, reject)
        }
        return
    }

    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null)
    if (isComplexResult(result)) {
        try {
            thenable = result.then
            // 判断返回值是否是 Promise 类型
            if (typeof thenable === 'function') {
                thenable.call(result, function(data) {
                    if (consumed) {
                        return
                    }
                    consumed = true 
                    return resolvePromise(promise2, data, resolve, reject)
                }, function(error) {
                    if (consumed) {
                        return
                    }
                    consumed = true
                    return reject(error)
                })
            }
            else {
                resolve(result)
            }
        }
        catch(e) {
            if (consumed) {
                return
            }
            consumed = true
            return reject(e)
        }
    }
    else {
        resolve(result)
    }
}

Promise.prototype.then = function(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : error => {throw error}
    // promise2将作为then的返回值
    let promise2
    if (this.status === 'fulfilled') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result = onfulfilled(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            })
        })
    }
    if (this.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result = onrejected(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            })
        })
    }
    // 在Promise状态为pending时先把开发者传进来的回调函数存起来，在执行内部resolve或reject方法时再调用
    if (this.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            this.onFulfilledArray.push(() => {
                try {
                    let result = onfulfilled(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            })
            this.onRejectedArray.push(() => {
                try {
                    let result = onrejected(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                }
                catch(e) {
                    reject(e)
                }
            })
        })
    }
}

Promise.prototype.catch = function(catchFunc) {
    return this.then(null, catchFunc)
}

Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
} 

Promise.reject = function(value) {
    return new Promise((resolve, reject) => {
        reject(value)
    })
}

Promise.all = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
        try {
            let resultArray = []
            const length = promiseArray.length
            for (let i = 0; i < length; i++) {
                promiseArray[i].then(data => {
                    resultArray.push(data)
                    if (resultArray.length === length) {
                        resolve(resultArray)
                    }
                }, reject)
            }
        }
        catch(e) {
            reject(e)
        }
    })
}

Promise.race = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(resolve, reject)
            }
        }
        catch(e) {
            reject(e)
        }
    })
}
