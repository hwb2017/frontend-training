const { declare } = require('@babel/helper-plugin-utils');

const base54 = (function(){
  // 因为后续生成的uid中不能包含数字，所以只用大小写英文字母和 _, $ 字符
  // 通过函数立即执行式来私有化 DIGITS 变量，避免污染全局
  const DIGITS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_";
  return function(num) {
    let ret = "";
    do {
      ret = DIGITS.charAt(num % 54) + ret;
      num = Math.floor(num / 54);
    } while (num > 0);
    return ret;
  }
})();

const mangle = declare((api, options, dirname) => {
  api.assertVersion(7);
  return {
    pre(file) {
      file.set('uid', 0);
    },
    visitor: {
      Scopable: {
        exit(path, state) {
          let uid = state.file.get('uid');
          Object.entries(path.scope.bindings).forEach(([key, binding]) => {
            if (binding.mangled) return;
            binding.mangled = true;
            const newName = path.scope.generateUid(base54(uid++));
            binding.path.scope.rename(key, newName);
          });
          state.file.set('uid', uid);
        }
      }
    }
  }
})

module.exports = mangle;