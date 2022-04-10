<template>
  <footer
    class="tricks-foooter h-16 w-full relative flex items-center justify-center">
    <div class="container flex items-center justify-between px-4 lg:px-8">
      <div class="dark:text-neutral-400">
        By @luastan
      </div>
      <tricks-change-color class="h-5 w-5"/>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .tricks-foooter {
    @apply bg-white dark:bg-neutral-900 dark:text-neutral-300
  }
</style>
