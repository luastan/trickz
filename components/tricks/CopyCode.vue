<template>
  <div
    class="tricks-copy-code rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 hover:-translate-y-1 dark:bg-gray-800 hover:shadow-lg z-20 cursor-pointer absolute px-3 py-3 shadow mr-3 mb-3 bottom-0 right-0 flex items-center justify-center"
    @click.prevent="handleCopy"
    ref="copyRoot"
  >
    <icons-copy-check v-if="copied"/>
    <icons-copy class="fill-gray-600 dark:fill-gray-400" v-else/>
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
      navigator.clipboard.writeText(this.$refs.copyRoot.parentElement.querySelector("pre > code").innerText.slice(0, -1));
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
*:hover > .tricks-copy-code {
  opacity: 100;
}


@screen sm {
  .tricks-copy-code {
    opacity: 0;
  }
}

.tricks-copy-code {
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tricks-copy-code > .tricks-icon {
  @apply stroke-gray-600 h-5 w-5
}
</style>
