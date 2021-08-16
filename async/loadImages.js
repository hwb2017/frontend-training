// 请求图片进行预加载

// 进行Promise化，在图片加载成功时执行 resolve, 加载失败时执行 reject
const loadImg = urlId => {
    const url = `https://www.image.com/${urlId}`
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onerror = function() {
            reject(urlId)
        }
        img.onload = function() {
            resolve(urlId)
        }
        img.src = url
    })
}

// 通过 Array.prototype.reduce 方法，依次执行图片下载
// 串行执行 Promise 的方法，参考 https://zhuanlan.zhihu.com/p/47896370
const urlIds = [1,2,3,4,5]

urlIds.reduce((prevPromise, urlId) => {
    return prevPromise.then(() => loadImg(urlId))
}, Promise.resolve())

// 使用 for 循环和 asycn/await 来实现串行执行
const loadImgOneByOne = async() => {
    for (let i of urlIds) {
        await loadImg(urlIds[i])
    }
}
loadImgOneByOne()

// 提高效率，将所有图片的请求一次性发出
const promiseArray = urlIds.map(urlId => loadImg(urlId))
Promise.all(promiseArray)
    .then(() => {
        console.log('finish load all')
    })
    .catch(() => {
        console.log('promise all catch')
    })

// 控制并发请求数为3个
const loadByLimit = (urlIds, loadImg, limit) => {
    const urlIdsCopy = [...urlIds]
    if (urlIdsCopy.length <= limit) {
        const promiseArray = urlIds.map(urlId => loadImg(urlId))
        return Promise.all(promiseArray)
    }
    const promiseArray = urlIdsCopy.splice(0,limit).map(urlId => loadImg(urlId))
    urlIdsCopy.reduce(
        (prevPromise, urlId) => 
        prevPromise
        .then(() => Promise.race(promiseArray))
        .catch(error => console.log(error))
        .then(resolvedId => {
            // 将resolvedId 从promiseArray中删除
            // 这里用于删除操作的只是伪代码，具体删除要看后端API返回的结果
            let resolvedIdPosition = promiseArray.findIndex(id => resolvedId === id)
            promiseArray.splice(resolvedIdPosition, 1)
            promiseArray.push(loadImg(urlId))
        }),
        Promise.resolve()
    )
}    