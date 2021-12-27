import { ref } from 'vue'

const map = new WeakMap<Function, any>()
export default function useModel(hook: Function) {
  if (!map.get(hook)) {
    let ans = hook()
    map.set(hook, ans)
  }
  return map.get(hook)
}

function useCounter() {
  const count = ref(0)
  const decrement = () => {
    count.value--
  }
  const increment = () => {
    count.value++
  }
  return {
    count,
    decrement,
    increment
  }
}

export function useCounter2() {
  return useModel(useCounter)
}