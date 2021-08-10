// src/main.js
// import foo from './foo.js';
// export default function () {
//   console.log(foo);
// }
import { version } from '../package.json'
import answer from 'the-answer'

export default () => {
    console.log('version ' + version)
    console.log(`the answer is ${answer}`)
}