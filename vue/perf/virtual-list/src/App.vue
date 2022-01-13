<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import Basic from './components/Basic.vue'
import DynamicUpdate from './components/DynamicUpdate.vue'
import type { ListItem } from './components/type'
import faker from 'faker'

const data: ListItem[] = []
for (let i = 0; i < 1000; i++) {
  data.push({
    id: i,
    value: faker.lorem.sentences()
  })
}
</script>

<template>
  <div style="height: 600px;">
    <!-- <Basic :list-data="data" :item-size="100"/> -->
    <DynamicUpdate :list-data="data" :estimated-item-size="100" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
