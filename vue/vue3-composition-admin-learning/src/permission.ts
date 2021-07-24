import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import store from './store'
import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
import { ElMessage } from 'element-plus'
import whiteList from './config/default/whitelist'

NProgress.configure({ showSpinner: false })
router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  const state = <any>store.state
  if (state.user.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (state.user.roles.length === 0) {
        try {
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)

          // TODO: uncomment and fix this
          // const roles = state.user.roles
          const roles = ['admin']

          store.dispatch(PermissionActionType.ACTION_SET_ROUTES, roles)
          state.permission.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          // store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
          ElMessage.error(`${err}`)
          next(`/login?redirect=${to.path}`)
          // next('/vue')
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
