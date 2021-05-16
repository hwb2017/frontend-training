import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import bannerStore from './modules/bannerStore'
import rankStore from './modules/rankStore'
import promoteStore from './modules/promoteStore'
import liveStore from './modules/liveStore'
import contentStore from './modules/contentStore'

const state = {
  // requesting用于记录当前是否处于ajax请求中的状态
  requesting: false,
  error: {}
}

const getters = {
  requesting: state => state.requesting,
  error: state => state.error
}

export default new Vuex.Store({
  // state和getter用于存储全局的、通用的状态
  state,
  getters,
  modules: {
    bannerStore,
    rankStore,
    promoteStore,
    liveStore,
    contentStore
  }
})