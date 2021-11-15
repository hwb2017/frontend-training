<template>
  <button @click="handleClick">Increment</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count += 1
      this.$emit('increment', this.count)
    }
  },
}
</script>