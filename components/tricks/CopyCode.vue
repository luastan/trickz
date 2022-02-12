<template>
  <div
    class="tricks-copy-code cursor-pointer absolute pt-3 pr-3 top-0 right-0 flex items-center justify-center"
    @click.prevent="handleCopy"
    ref="copyRoot"
  >
    <icons-copy-check v-if="copied" />
    <icons-copy class="fill-gray-600" v-else />
  </div>
</template>

<script>

export default {
  name: "CopyCode",
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    handleCopy() {
      navigator.clipboard.writeText(this.$refs.copyRoot.parentElement.innerText.slice(0, -1));
      this.copied = true;
      const vm = this;
      setTimeout(function () {
        vm.copied = false;
      }, 5200);
      this.$nuxt.$emit('toast-message', "Snippet copied to clipboard !");
    },
  }
}
</script>

<style scoped>
  .tricks-copy-code > .tricks-icon {
    @apply stroke-gray-600 h-5 w-5
  }
</style>
