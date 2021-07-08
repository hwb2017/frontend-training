import { Module } from 'vuex'
import type { TagsViewState } from './state'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'

export { TagsViewState }

export const store: Module<TagsViewState, ObjectConstructor> = {
  state,
  mutations,
  actions
}
