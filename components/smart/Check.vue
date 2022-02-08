<template>
  <tricks-check v-model:value="smartValue">
    <slot />
  </tricks-check>
</template>

<script>
import smartComponents from "@/mixins/smartComponents";

export default {
  name: "Check",
  data() {
    return {
      cachedTextHash: ''
    }
  },
  props: {
    value: {
      type: Boolean,
    },
    autoVariable: {
      type: Boolean,
      default: false,
    }
  },
  mixins: [
    smartComponents,
  ],

  computed: {
    texthash() {
      if (this.cachedTextHash !== '') {
        return this.cachedTextHash;
      }
      const text = this.$slots.default[0].text;
      return `/${this.$route.path}/${text.substring(0, Math.min(50, text.length))}`;
    },
    smartValue: {
      get() {
        const storedValue = this.getSmartValue(this.texthash)
        return storedValue === undefined ? false: storedValue;
      },
      set(v) {
        this.setSmartValue(this.texthash, v);
      },
    }
  }
}
</script>

<style scoped>

</style>
