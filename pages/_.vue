<template class="fancy-scrollbar">
  <component
    class="w-full"
    :content-doc="contentDoc"
    :is="computedRenderer"
  />
</template>
<script>


export default {
  computed: {
    contentDoc() {
      return this.doc;
    },
    computedRenderer() {
      const renderers = {
        'markdown': 'render-markdown-content',
        'test': 'render-test-content',
      };
      return renderers[this.contentDoc.type || 'markdown'] || 'render-markdown-content';
    },
  },

  async asyncData({$content, store, app, params, error, redirect}) {
    let path = `/${params.pathMatch || 'tricks'}`;
    const [document] = await $content({deep: true}).where({path}).fetch()
    if (!document) {
      return error({statusCode: 404, message: 'Page not found'})
    }
    const [prev, next] = await $content('/', {deep: true})
      .only(['title', 'path', 'to'])
      .sortBy('position', 'asc')
      .surround(document.path, {before: 1, after: 1})
      .fetch();

    return {
      doc: document,
      prev,
      next
    }
  },

  head() {
    const desc = this.doc.description || 'Some Tips and tricks!'
    return {
      title: this.doc.title,
      meta: [
        {hid: 'og:title', property: 'og:title', content: this.doc.title},
        {hid: 'twitter:title', name: 'twitter:title', content: this.doc.title},
        {hid: 'description', name: 'description', content: desc},
        {hid: 'og:description', property: 'og:description', content: desc},
        {hid: 'twitter:description', name: 'twitter:description', content: desc},
      ],
    };
  },
}
</script>

<style>

</style>
