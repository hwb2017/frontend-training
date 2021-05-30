// 未使用组合式API的代码
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  data() {
    return {
      repositories: [],
      filters: { },
      searchQuery: ''
    }
  },
  computed: {
    filteredRepositories() {},
    repositoriesMatchingSearchQuery() {}
  },
  watch: {
    user: 'getUserRepositories'
  },
  methods: {
    getUserRepositories() {
      
    },
    updateFilters() {},
  },
  mounted() {
    this.getUserRepositories()
  }
}
// 以上代码各种逻辑关注点混杂，且不容易跨组件复用

// setup组件选项用于实现组合式API，它在创建组件之前执行，它只能访问props属性，
// 无法访问组件中声明的任何属性 —— 本地状态、计算属性或方法
import { ref, onMounted, watch, toRefs, computed } from 'vue'
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    // 使用 toRefs 创建对 prop 的 user property 的响应式引用
    const { user } = toRefs(props)
    // ref将值类型(Number, String)等变为响应式的
    let repositories = ref([])
    const getUserRepositories = async () => {
      repositories = await fetchUserRepositories(props.user)
    }
    onMounted(getUserRepositories) // on mounted call getUserRepositories
    // 在用户 prop 的响应式引用上设置一个侦听器
    watch(user, getUserRepositories)

    const searchQuery = ref('')
    const repositoriesMatchingSearchQuery = computed(() => {
        return repositories.value.filter(
            repository => repository.name.includes(searchQuery.value)
        )
    })
    return {
      repositories,
      getUserRepositories,
      searchQuery,
      repositoriesMatchingSearchQuery
    }
  },
  data() {
    return {
      filters: {}
    }
  },
  computed: {
    filteredRepositories() {}
  },
  methods: {
    updateFilters() {},
  }
}