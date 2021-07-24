import type { Module } from 'vuex'
import type { SettingsState } from './state'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'

export { SettingsState }
export const store: Module<SettingsState, ObjectConstructor> = {
  state,
  mutations,
  actions
}
