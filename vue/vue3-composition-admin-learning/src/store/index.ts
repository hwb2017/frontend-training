import { createStore, createLogger } from 'vuex'

import { store as app } from '@/store/modules/app'
import { store as settings } from '@/store/modules/settings'
import { store as permission } from '@/store/modules/permission'
import { store as tagViews } from '@/store/modules/tagsview'
import { store as user } from '@/store/modules/user'

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export default createStore({
  plugins,
  modules: {
    app,
    settings,
    permission,
    tagViews,
    user
  }
})
