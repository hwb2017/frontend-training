import type { Module } from 'vuex'
import type { PermissionState } from './state'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'

export { PermissionState }

export const store: Module<PermissionState, ObjectConstructor> = {
  state,
  mutations,
  actions
}
