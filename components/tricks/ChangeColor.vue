<template>
  <button
    class="tricks-change-color outline-0 appearance-none"
    type="button"
    @click="mode = mode !== 'dark' ? 'dark' : 'light'"
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
    @apply dark:stroke-neutral-600 stroke-gray-600
  }
  .tricks-change-color:hover > .tricks-icon {
    @apply dark:stroke-rose-500 stroke-primary-500
  }
</style>
