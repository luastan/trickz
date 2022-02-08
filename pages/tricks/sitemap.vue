<template>
  <div class="prose py-4 lg:pt-8 dark:prose-invert max-w-none lg:px-8">
    <h1>Sitemap</h1>
    <ul>
      <li
        :class="{
            'pl-0': doc.path.split('/').length === 2,
            'pl-4': doc.path.split('/').length === 3,
            'pl-8': doc.path.split('/').length === 4,
            'pl-12': doc.path.split('/').length === 5,
          }"
        v-for="doc in docs"
      >
        <nuxt-link

          :to="doc.path"
        >
          {{ doc.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sitemap",
  async asyncData({$content}) {

    const docs = (await $content('/', {deep: true})
      .only(['title', 'menuTitle', 'category', 'slug', 'version', 'to', 'path'])
      .sortBy('position', 'asc')
      .fetch())
      .map(doc => ({...doc, path: `${doc.path}`}));

    return {
      docs
    }
  }
}
</script>

<style scoped>

</style>
