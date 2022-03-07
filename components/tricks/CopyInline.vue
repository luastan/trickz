<!-- Careful with line feeds -->
<template><code class="copy-me" @click="copy" ref="copyRoot">
<slot/>
</code></template>

<script>
export default {
  name: "CopyInline",
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$refs.copyRoot.textContent)
      this.$nuxt.$emit('toast-message', "Text copied to clipboard !");
    },
  },

}
</script>

<style scoped>

</style>
