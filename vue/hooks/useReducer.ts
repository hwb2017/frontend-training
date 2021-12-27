import { ref } from 'vue'

interface Action {
  type: string
  payload: unknown
}

type Reducer = <T = any>(state: T, action: Action) => T

export default function useReducer(reducer: Reducer, initialState = {}) {
  const state = ref(initialState)
  const dispatch = (action: Action) => {
    state.value = reducer(state.value, action)
  }
  return {
    state,
    dispatch
  }
}

const reducer: Reducer = (state: any, action: Action): any => {
  switch (action.type) {
    case "reset":
      return { count: 0 }
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }  
  }
}

function useStore() {
  return useReducer(reducer)
}