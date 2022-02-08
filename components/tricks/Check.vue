<template>
  <component
    :is="tag"
    @click="clickHandler"
    :class="{
      'checked': this.value,
    }"
    class="tricks-check flex items-center justify-start tricks-check cursor-pointer"
  >
    <div
      class="rounded flex items-center justify-center checkmark mr-2 h-4 w-4 shadow-inner bg-gray-50 border border-gray-100"
    >
      <client-only>
        <icons-check
          class="stroke-white h-3 w-3"
        />
      </client-only>

    </div>
    <div class="content align-text-top">
      <slot />
    </div>

  </component>
</template>

<script>
export default {
  name: "TricksCheck",
  data() {
    return {

    }
  },
  methods: {
    clickHandler(event) {
      this.$emit('input', !this.value);
    },
  },
  props: {
    tag: {
      default: 'div',
      type: String,
    },
    value: {
      type: Boolean,
      required: true
    }
  },


}
</script>

<style scoped>
.tricks-check.checked > .checkmark {
  @apply bg-blue-500
}

.tricks-check > .checkmark {
  @apply transition-colors
}
.tricks-check:hover > .checkmark {
  @apply border-gray-300
}
</style>
