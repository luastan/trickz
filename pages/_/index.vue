<template>
  <component
    :content-doc="contentDoc"
    :is="computedRenderer"
  />
</template>

<script>

export default {
  name: "index",
  props: {
    "contentDoc": {
      type: Object
    },
    "renderer": {
      type: String,
      default: 'markdown',
    }
  },
  computed: {
    computedRenderer() {
      const renderers = {
        'markdown': 'render-markdown-content',
        'test': 'render-test-content',
      };
      return renderers[this.renderer] || 'render-markdown-content';
    },
  }
}
</script>

<style scoped>
</style>
