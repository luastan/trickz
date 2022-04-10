<template>
  <div
    ref="copyRoot"
    class="wrapper py-4 pointer-events-none w-full h-full absolute right-0 bottom-0 flex items-end justify-end"
  >
    <div
      class="tricks-copy-code pointer-events-auto sticky bottom-4 rounded-lg  border border-gray-200 bg-gray-100 dark:border-neutral-700 hover:-translate-y-1 dark:bg-neutral-800 hover:shadow-lg z-20 cursor-pointer sticky px-3 py-3 shadow mr-3 flex items-center justify-center"
      @click.prevent="handleCopy"

    >
      <icons-copy-check v-if="copied"/>
      <icons-copy class="fill-gray-600 dark:fill-neutral-400" v-else/>
    </div>
  </div>
</template>

<script>

export default {
  name: "TricksCopyCode",
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
*:hover > .wrapper > .tricks-copy-code {
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
