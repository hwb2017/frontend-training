// import sayHello from './hello'
// console.log(sayHello('lucas'))
import('./hello').then(sayHello => {
    console.log(sayHello('lucas'))
})