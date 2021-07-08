import { Module } from 'vuex'
import { state } from './state'
import { mutations} from './mutations'
import { actions } from './actions'
import type { AppState } from './state'

export const store: Module<AppState, ObjectConstructor> = {
  state,
  mutations,
  actions
}
