<template>
  <div id="app">
    <TopContainer></TopContainer>
    <BHeader></BHeader>
    <BContent :rows="rows"></BContent>
    <BNavSide :options="options" @change="toggleShowMask"></BNavSide>
    <div class="wnd-mask" ref="mask" v-show="showMask"></div>
    <router-view/>
  </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import BHeader from 'components/common/BHeader.vue'
import BContent from 'components/content/BContent.vue'
import BNavSide from 'components/nav/BNavSide.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    TopContainer,
    BHeader,
    BContent,
    BNavSide
  },
  // mouted钩子常用于获取页面中主要列表的初始化数据
  mounted() {
    this.$store.dispatch('getContentRows')
  },
  data() {
    return {
      showMask: false
    }
  },
  computed: {
    ...mapGetters([
      'requesting',
      'error',
      'rows'
    ]),
    // 计算属性用于那些数据与常量或者数据与数据的组合
    options() {
      let options = {
        offset: 100, //偏移的距离
        items: this.rows,
        offsetTop: 0 //距离顶部距离
      }
      return options
    }
  },
  methods: {
    toggleShowMask() {
      this.showMask = !this.showMask
    }
  }  
}
</script>

<style lang="stylus">
  #app 
    font-family "Microsoft YaHei",Arial,Helvetica,sans-serif
    -webkit-font-smoothing antialiased
    font-size 12px
    margin 0
    padding 0
    background #fff
    color #222
    min-width 990px
    tap-highlight-color transparent
    -webkit-tap-highlight-color transparent
    .wnd-mask
      position fixed
      width 100%
      height 150%
      background-color #000
      opacity .5!important
      z-index 1000
      top 0px
      left 0px
      transition .2s
</style>
