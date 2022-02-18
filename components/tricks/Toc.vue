<template>
  <div v-if="toc.length || editLink !== null" class="w-full lg:w-1/4 block relative">
    <div class="lg:sticky lg:top-16 overflow-y-auto h-full fancy-scrollbar lg:h-auto lg:max-h-(screen-16)">
      <nav
        class="py-4 lg:py-8 lg:pl-8 lg:pr-4"
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
            :key="link.id"
            class="transition-all text-gray-700 dark:text-gray-300"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0': link.depth === 2
            }"
          >
            <a
              :href="`#${link.id}`"
              class="block text-sm transition-padding ease-in-out duration-300 hover:pl-1"
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
        <a
          :href="editLink"
          target="_blank"
          class="mt-3 block flex items-center justify-start f relative lg:mb-2 text-gray-500 dark:text-gray-600 uppercase tracking-wider font-bold text-sm lg:text-xs"
          v-if="editLink !== null">
          Edit on Github
          <icons-pencil class="ml-2 h-4 w-4 stroke-gray-600 fill-gray-600 text-gray-400"/>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toc",
  props: {
    toc: {
      type: Array,
      default: []
    },
    editLink: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>

</style>
