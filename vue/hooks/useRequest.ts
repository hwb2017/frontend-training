import {ref, onMounted} from 'vue'

function fetchBookList(options: unknown) {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3])
    }, 1000)
  })
}

export function useApi(api: (...args: unknown[]) => Promise<unknown>) {
  const loading = ref(false)
  const result = ref<unknown>(null)
  const error = ref<unknown>(null)
  
  const fetchResource = (...params: unknown[]) => {
    loading.value = true
    return api(params).then(data => {
      result.value = data
    }).catch(e => {
      error.value = e
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    loading,
    error,
    result,
    fetchResource
  }
}

export function useBook() {
  const { loading, error, result, fetchResource } = useApi(fetchBookList)

  onMounted(() => {
    fetchResource({page: 1})
  })

  return {
    loading,
    error,
    list: result
  }
}