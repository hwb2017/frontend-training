// api的resolve解析在webpack配置里
import { bannerApi } from 'api'
// 通过常量来作为mutation的标识符是官方推荐的一种做法，有效避免字符串重名，也利于lint工具优化
import * as TYPE from '../actionType/bannerType'

const state = {
  bannerlist: []
}

// 这里作者对getter的理解可能有问题，getter应该类似计算属性，而不是属性访问器
const getters = {
  bannerlist: state => state.bannerlist
}

const actions = {
  // action的第一个参数类似于 this.$store, 是全局的store对象, 可以取得commit,state, rootState(全局的状态，在index.js中定义)  
  bannerlist({commit, state, rootState}) {
    rootState.requesting = true;
    commit(TYPE.BANNER_LIST_REQUEST);
    // 这里的异步函数错误处理比较简单，在有多个需要错误处理的异步函数时，
    // 可以利用 error first 的理念进行包装，将错误和返回数据作为一个二元组返回，类似 golang 中的处理方式
    // 参考 https://cloud.tencent.com/developer/article/1470715
    bannerApi.list().then((response) => {
      rootState.requesting = false;
      commit(TYPE.BANNER_LIST_SUCCESS, response);
    }, (error) => {
      rootState.requesting = false;
      commit(TYPE.BANNER_LIST_FAILURE);
    })
  }
}

const mutations = {
  [TYPE.BANNER_LIST_REQUEST] (state) {

  },
  // 当banner api 调用成功时，改变bannerlist的状态
  [TYPE.BANNER_LIST_SUCCESS] (state, bannerlist) {
    state.bannerlist = bannerlist.data
  },
  [TYPE.BANNER_LIST_FAILURE] (state) {
    
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}