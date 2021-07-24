<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ t('route.' + tag.meta.title) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </div>
    <ul
      v-show="visible"
      :style="{left: left+'px', top: top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        {{ t('tagsView.refresh') }}
      </li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >
        {{
          t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ t('tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        {{ t('tagsView.closeAll') }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, reactive, ref, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { TagView } from '@/store/modules/tagsview/state'
import { TagsActionTypes } from '@/store/modules/tagsview/action-types'
import path from 'path'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const instance = getCurrentInstance()
    const currentRoute = useRoute()
    const { t } = useI18n()
    const scrollPaneRef = ref(null)
    const { ctx } = instance as any

    const toLastView = (visitedViews: TagView[], view: TagView) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath).catch(err => {
          console.warn(err)
        })
      } else {
        if (view.name === 'Dashboard') {
          router.push({ path: '/redirect' + view.fullPath }).catch(err => {
            console.warn(err)
          })
        } else {
          router.push('/').catch(err => {
            console.warn(err)
          })
        }
      }
    }
    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as TagView,
      affixTags: [] as TagView[]
    })
    const isActive = (route: TagView) => {
      return route.path === currentRoute.path
    }
    const isAffix = (tag: TagView) => {
      return tag.meta && tag.meta.affix
    }
    const refreshSelectedTag = (view: TagView) => {
      store.dispatch(TagsActionTypes.ACTION_DEL_CACHED_VIEW, view)
      const { fullPath } = view
      nextTick(() => {
        router.replace({ path: '/redirect' + fullPath }).catch(err => {
          console.warn(err)
        })
      })
    }
    const closeSelectedTag = (view: TagView) => {
      store.dispatch(TagsActionTypes.ACTION_DEL_VIEW, view)
      if (isActive(view)) {
        toLastView(store.state.tagViews.visitedViews, view)
      }
    }
    const closeOthersTags = () => {
      if (state.selectedTag.fullPath !== currentRoute.path && state.selectedTag.fullPath !== undefined) {
        router.push(state.selectedTag.fullPath).catch(err => {
          console.warn(err)
        })
      }
      store.dispatch(TagsActionTypes.ACTION_DEL_OTHER_VIEW, state.selectedTag as TagView)
    }
    const closeAllTags = (view: TagView) => {
      store.dispatch(TagsActionTypes.ACTION_DEL_ALL_VIEWS, undefined)
      if (state.affixTags.some(tag => tag.path === currentRoute.path)) {
        return
      }
      toLastView(store.state.tagViews.visitedViews, view)
    }
    const openMenu = (tag: TagView, e: MouseEvent) => {
      const menuMinWidth = 105
      const offsetLeft = ctx.$el.getBoundingClientRect().left // conainer magin left
      const offsetWidth = ctx.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15
      if (left > maxLeft) {
        state.left = maxLeft
      } else {
        state.left = left
      }
      state.top = e.clientY
      state.visible = true
      state.selectedTag = tag
    }
    const closeMenu = () => {
      state.visible = false
    }
    const handleScroll = () => {
      closeMenu()
    }

    const visitedViews = computed(() => {
      return store.state.tagViews.visitedViews
    })
    const routes = computed(() => store.state.permission.routes)
    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: TagView[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }

        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }
    const initTags = () => {
      state.affixTags = filterAffixTags(routes.value)
      for (const tag of state.affixTags) {
        if (tag.name) {
          store.dispatch(TagsActionTypes.ACTION_ADD_VISITED_VIEW, tag as TagView)
        }
      }
    }
    const addTags = () => {
      if (currentRoute.name) {
        store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute)
      }
      return false
    }
    const moveToCurrentTag = () => {
      const tags = instance?.refs.tag as any[]
      nextTick(() => {
        if (tags === null || tags === undefined || !Array.isArray(tags)) return
        for (const tag of tags) {
          if ((tag.to as TagView).path === currentRoute.path) {
            (scrollPaneRef.value as any).moveToCurrentTag(tag)
            if ((tag.to as TagView).fullPath !== currentRoute.path) {
              store.dispatch(TagsActionTypes.ACTION_UPDATE_VISITED_VIEW, currentRoute)
            }
          }
        }
      })
    }
    watch(() => currentRoute.name, () => {
      if (currentRoute.name !== 'Login') {
        addTags()
        moveToCurrentTag()
      }
    })
    watch(() => state.visible, (value) => {
      if (value) {
        // 如果 tagsView 可见的话，全局添加click事件的监听，可以关闭右键菜单
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })
    onBeforeMount(() => {
      initTags()
      addTags()
    })
    return {
      visitedViews,
      routes,
      scrollPaneRef,
      t,
      ...toRefs(state),
      isActive,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      openMenu,
      closeMenu,
      handleScroll
    }
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 25px;
      border: 1px solid rgba(124,141,181,.3);
      border-radius: 4px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      box-sizing: border-box;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #5DDAB4;
        color: #fff;
      }

      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
