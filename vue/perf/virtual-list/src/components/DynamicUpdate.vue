<template>
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent">
    <div class="infinite-list-phantom" :style="{ height: listHeight }"></div>
    <div ref="itemsRef" class="infinite-list">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item._index"
        :id="item._index"
      ><span style="color: red">{{ `${item._index.slice(1)}` }}</span> {{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed, ref, onMounted, onUpdated, nextTick } from 'vue'
import type { ListItem } from './type'
interface ListItemMeta {
  index: number
  top: number
  bottom: number
  height: number
}
interface VirtualListProps {
  listData: ListItem[],
  estimatedItemSize: number,
}
const props = withDefaults(defineProps<VirtualListProps>(), {
  listData: () => [],
  estimatedItemSize: 200
})

const listRef = ref<HTMLDivElement | null>(null)
const itemsRef = ref<HTMLDivElement | null>(null)

// 可视区域高度
const screenHeight = ref(0)
// 偏移量
const startOffset = ref(0)
// 起始索引
const startIdx = ref(0)
// 结束索引
const endIdx = ref(0)
// 内容区域高度
const listHeight = ref('100%')
// 存储列表项渲染后每一项的高度以及位置
let positions: ListItemMeta[] = []

const _listData = computed(() => {
  return props.listData.map((item, index) => {
    return {
      _index: `_${index}`,
      ...item,
    }
  })
})
// 可显示的列表项数
const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.estimatedItemSize)
})
// 获取真实显示列表数据
const visibleData = computed(() => {
  return _listData.value.slice(startIdx.value, endIdx.value + 1)
})

const getStartIndex = (scrollTop:number = 0) => {
  return binarySearch(positions, scrollTop)
}
const binarySearch = (list: ListItemMeta[], value: number) => {
  let start = 0
  let end = list.length - 1
  let tempIndex: number | null = null
  while (start <= end) {
    let midIndex = Math.floor((start + end) / 2)
    let midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex + 1
    } else if (midValue < value) {
      start = midIndex + 1
    } else {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex
      }
      end = end - 1
    }
  }
  return tempIndex!!
}
const scrollEvent = () => {
  let scrollTop = listRef.value!.scrollTop
  startIdx.value = getStartIndex(scrollTop)
  endIdx.value = startIdx.value + visibleCount.value
}
const updateItemSize = () => {
  if (!itemsRef.value) {
    return
  }
  const nodes = itemsRef.value.children
  Array.from(nodes).forEach((node) => {
    const rect = node.getBoundingClientRect()
    const height = rect.height
    const index = +node.id.slice(1)
    const oldHeight = positions[index].height
    const dValue = oldHeight - height
    if (dValue) {
      positions[index].bottom = positions[index].bottom - dValue
      positions[index].height = height
      for (let k = index + 1; k < positions.length; k++) {
        positions[k].top = positions[k-1].bottom
        positions[k].bottom = positions[k].bottom - dValue
      }
    }
  })
}
const setStartOffset = () => {
  startOffset.value = startIdx.value >= 1 ? positions[startIdx.value - 1].bottom : 0
  itemsRef.value!.style.transform = `translate3d(0,${startOffset.value}px,0)`
}

// 初始化positions
positions = Array.from({ length: props.listData.length }, (item, index) => {
  return {
    index,
    height: props.estimatedItemSize,
    top: index * props.estimatedItemSize,
    bottom: (index+1) * props.estimatedItemSize
  }
})

onMounted(() => {
  screenHeight.value = listRef.value!.clientHeight
  startIdx.value = 0
  endIdx.value = startIdx.value + visibleCount.value
})

onUpdated(() => {
  updateItemSize()
  let height = positions[positions.length - 1].bottom
  listHeight.value = height + 'px'
  setStartOffset()
  if ((positions[endIdx.value].bottom - positions[startIdx.value].top) < screenHeight.value) {
    endIdx.value = Math.min(endIdx.value + visibleCount.value, _listData.value.length - 1)
  }
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