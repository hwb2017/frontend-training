import { onUnmounted } from 'vue'

class EventBus {
  eventMap = new Map<string, Function[]>()
  on(key: string, cb: Function) {
    let handlers = this.eventMap.get(key)
    if (!handlers) {
      handlers = []
    }
    handlers.push(cb)
    this.eventMap.set(key, handlers)
  }
  off(key: string, cb: Function) {
    const handlers = this.eventMap.get(key)
    if (!handlers) return
    if (cb) {
      const idx = handlers.indexOf(cb)
      idx > -1 && handlers.splice(idx, 1)
      this.eventMap.set(key, handlers)
    } else {
      this.eventMap.delete(key)
    }
  }
  once(key: string, cb: Function) {
    const handler = (...args: unknown[]) => {
      cb(...args)
      this.off(key, handler)
    }
    this.on(key, handler)
  }
  emit(key: string, ...args: unknown[]) {
    const handlers = this.eventMap.get(key)
    if (!Array.isArray(handlers)) return
    handlers.forEach(handler => {
      handler && handler(...args)
    })
  }
}

const bus = new EventBus()

export default function useEventBus() {
  let instance = {
    eventMap: new Map<string, Function[]>(),
    on: bus.on,
    once: bus.once,
    clear() {
      this.eventMap.forEach((list, key) => {
        list.forEach(cb => {
          bus.off(key, cb)
        })
      })
      this.eventMap.clear()
    }
  }
  let eventMap = new Map<string, Function[]>()
  const on = (key: string, cb: Function) => {
    instance.on(key, cb)
  }
  const once = (key: string, cb: Function) => {
    instance.once(key, cb)
  }

  onUnmounted(() => {
    instance.clear
  })
  
  return {
    on,
    once,
    off: bus.off.bind(bus),
    emit: bus.emit.bind(bus)
  }
}