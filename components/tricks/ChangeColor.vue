<template>
  <button
    class="tricks-change-color"
    type="button"
    @click="mode = mode === 'light' ? 'dark' : 'light'"
  >
    <icons-moon v-if="mode === 'dark'"/>
    <icons-sun v-else/>
  </button>
</template>

<script>
export default {
  name: "ChangeColor",
  computed: {
    mode: {
      get() {
        return this.$colorMode.preference
      },
      set(newMode) {
        this.$colorMode.preference = newMode
      },
    }
  }
}
</script>

<style scoped>
  .tricks-change-color > .tricks-icon {
    @apply dark:stroke-gray-600 stroke-gray-600 h-5 w-5
  }
  .tricks-change-color:hover > .tricks-icon {
    @apply dark:stroke-gray-400 stroke-gray-900
  }
</style>
