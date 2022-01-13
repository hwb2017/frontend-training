<template>
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed, ref, onMounted } from 'vue'
import type { ListItem } from './type'

interface VirtualListProps {
  listData: ListItem[],
  itemSize: number,
}
const props = withDefaults(defineProps<VirtualListProps>(), {
  listData: () => [],
  itemSize: 200
})

const listRef = ref<HTMLDivElement | null>(null)

// 可视区域高度
const screenHeight = ref(0)
// 偏移量
const startOffset = ref(0)
// 起始索引
const startIdx = ref(0)
// 结束索引
const endIdx = ref(0)

// 列表总高度
const listHeight = computed(() => {
  return props.listData.length * props.itemSize
})
// 可显示的列表项数
const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.itemSize)
})
// 偏移量对应的style
const getTransform = computed(() => {
  return `translate3d(0,${startOffset.value}px,0)`
})
// 获取真实显示列表数据
const visibleData = computed(() => {
  return props.listData.slice(startIdx.value, Math.min(endIdx.value, props.listData.length))
})

const scrollEvent = () => {
  let scrollTop = listRef.value!.scrollTop
  startIdx.value = Math.floor(scrollTop / props.itemSize)
  endIdx.value = startIdx.value + visibleCount.value
  startOffset.value = scrollTop
}

onMounted(() => {
  screenHeight.value = listRef.value!.clientHeight
  startIdx.value = 0
  endIdx.value = startIdx.value + visibleCount.value
})
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>