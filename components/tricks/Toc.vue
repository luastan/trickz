<template>
  <nav
    v-if="toc.length"
    class="lg:pr-4"
  >
    <p
      v-if="toc.length"
      class="mb-3 lg:mb-2 text-gray-500 dark:text-gray-600 uppercase tracking-wider font-bold text-sm lg:text-xs"
    >
      Contents
    </p>
    <scrollactive
      v-if="toc.length"
      highlight-first-item
      active-class="text-primary-500"
      :offset="0"
      tag="ul"
    >
      <li
        v-for="link of toc"
        class="transition-all text-gray-700 dark:text-gray-300"
        :key="link.id"
        :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0': link.depth === 2
            }"
      >
        <a
          :href="`#${link.id}`"
          class="block scrollactive-item text-sm transition-padding ease-in-out duration-300 hover:pl-1"
          :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
                'ml-3 pb-2': link.depth === 4,
                'ml-4 pb-2': link.depth === 5,
                'ml-5 pb-2': link.depth === 6
              }"
        >{{ link.text }}</a>
      </li>
    </scrollactive>

  </nav>
</template>

<script>
export default {
  name: "tricks-toc",
  props: {
    toc: {
      type: Array,
      default: []
    },
  },
}
</script>

<style scoped>

</style>
