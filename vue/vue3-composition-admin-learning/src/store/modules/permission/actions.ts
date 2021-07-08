import { ActionTree, ActionContext } from 'vuex'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
import { permissionRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, ObjectConstructor>, 'commit'>

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        (route.meta.roles as string[]).includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES] (
    { commit }: AugmentedActionContext,
    roles: string[]
  ): void
}

export const actions: ActionTree<PermissionState, ObjectConstructor> & Actions = {
  [PermissionActionType.ACTION_SET_ROUTES] (
    { commit }: AugmentedActionContext,
    roles: string[]
  ) {
    let accessRoutes
    if (roles.includes('admin')) {
      accessRoutes = permissionRoutes
    } else {
      accessRoutes = filterAsyncRoutes(permissionRoutes, roles)
    }
    commit(PermissionMutationType.SET_ROUTES, accessRoutes)
  }
}
