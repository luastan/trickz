<template>
  <div class="flex flex-wrap-reverse">
    <!--    Root content -->
    <div class="w-full py-4 lg:w-3/4 lg:pt-8 lg:border-r dark:border-neutral-800">
      <article class="prose dark:prose-invert max-w-none lg:px-8">
        <header class="w-full border-b border-gray-200 dark:border-neutral-800 mb-4">
          <h1 class="flex items-center justify-between" v-if="title">
            {{ title }}
            <tricks-badge v-if="badge">{{ badge }}</tricks-badge>
          </h1>
          <div v-if="description" class="mt-4">
            <p class="text-gray-600 dark:text-neutral-400">{{ description }}</p>
          </div>
        </header>
        <slot/>
      </article>
    </div>

    <!--    Right sticky aside -->
    <div class="w-full lg:w-1/4 block relative">
      <div class="py-4 lg:pl-8 lg:py-8 lg:sticky lg:top-16 overflow-y-auto h-full fancy-scrollbar lg:h-auto lg:max-h-(screen-16)">
        <slot name="sidebar"/>
        <a
          :href="editLink"
          target="_blank"
          class="mt-3 block flex items-center justify-start f relative lg:mb-2 text-gray-500 dark:text-neutral-600 uppercase tracking-wider font-bold text-sm lg:text-xs"
          v-if="editLink !== null">
          Edit on {{ $tricks.config.repoType }}
          <icons-pencil class="ml-2 h-4 w-4 fill-gray-600 dark:fill-neutral-600"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicArticle",
  props: {
    title: {
      type: String,
      required: true,
    },
    editLink: {
      type: String,
      default: null,
    },
    description: String,
    badge: String,
  },
}
</script>

<style scoped>

</style>
