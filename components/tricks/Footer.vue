<template>
  <footer
    class="tricks-foooter w-full relative flex items-center justify-center">
    <div class="container h-16 flex items-center justify-between px-4 lg:px-8">
      <div>
        By @luastan
      </div>
      <div>
        <tricks-change-color/>
      </div>
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
    @apply bg-white dark:bg-gray-900 dark:text-gray-300
  }
</style>
