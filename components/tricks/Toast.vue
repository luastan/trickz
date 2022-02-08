<template>
  <div class="tricks-toast" @click="$emit('close')">
<!--    <icons-x class="absolute p-2" @click="$emit('close')"/>-->
    <slot />
  </div>
</template>

<script>
export default {
  name: "Toast"
}
</script>

<style scoped>
.tricks-toast {
  @apply bg-gray-900 py-2 px-4 dark:bg-gray-600 rounded relative text-gray-300
}
</style>
