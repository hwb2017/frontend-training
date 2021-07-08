import { Module } from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import type { UserState } from './state'

export { UserState }

export const store: Module<UserState, ObjectConstructor> = {
  state,
  mutations,
  actions
}
