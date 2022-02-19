<template>
  <component
    @click="$emit('click', $event)"
    is="button"
    class="lst-button"
    :class="{
      'outlined': outline,
      'pill': pill,
      ...colorsSizesAndShadows,
    }"

  >
    <div v-if="$slots['icon-left']" class="icon-left">
      <slot name="icon-left"/>
    </div>
    <slot/>
    <div v-if="$slots['icon-right']" class="icon-right">
      <slot name="icon-right"/>
    </div>
  </component>
</template>

<script>
const availableColors = [
  'blue', 'primary',
  'red',
  'green',
  'yellow',
  'black',
  'white',
];

const availableSizes = [
  'sm',
  'md',
  'lg',
  'xl',
];

export default {
  name: "Button",
  props: {
    to: {
      type: String,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'blue',
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    colorsSizesAndShadows() {
      const classesToUse = {};
      if (availableSizes.includes(this.size)) {
        classesToUse[this.size] = true;
      }
      if (availableColors.includes(this.color)) {
        classesToUse[this.color] = true;
      }
      return classesToUse;
    }
  }

}
</script>

<style scoped>
.lst-button {
  transition-property: color, opacity, background-color, border-color;
  transition-duration: .25s;
  transition-timing-function: ease;
  @apply flex items-center justify-between border-2 border-transparent rounded cursor-pointer
}

/* Conditional modifiers */

.lst-button.pill {
  @apply rounded-r-full rounded-l-full
}

/* Sizes */
.lst-button.sm {
  @apply px-3 py-1
}

.lst-button.md {
  @apply px-4 py-2
}

/* Colors */

.lst-button:hover,
.lst-button.outlined {
  @apply bg-transparent backdrop-blur dark:text-white
}


.lst-button.outlined:hover,
.lst-button {
  @apply text-white
}

.lst-button.blue {
  @apply border-blue-500 dark:border-blue-600
}



.lst-button.blue.outlined:hover,
.lst-button.blue:not(.outlined):not(:hover) {
  @apply bg-blue-500 dark:bg-blue-600 text-white
}

.lst-button.blue:hover,
.lst-button.blue.outlined {
  @apply text-blue-500 dark:text-white
}



/* Shadows */
</style>
