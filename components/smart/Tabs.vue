<template>
  <div class="smart-tabs">
    <div class="tab-header">
      <div
        :key="name"
        v-for="(text, name) in computedTabs"
        class="tab"
        :class="{
          'is-selected': name === selected,
        }"
        @click="selected = name"
      >
        {{ text }}
      </div>
    </div>
    <client-only>
      <transition name="fade" mode="out-in">
        <div
          v-for="(name, index) in Object.keys(computedTabs)"
          v-if="name === selected"
          :key="name"
        >
          <slot :name="name"/>
        </div>
      </transition>
    </client-only>
  </div>
</template>

<script>
import SmartComponents from "../../mixins/smartComponents";

export default {
  name: "Tabs",
  props: {
    tabs: {
      required: true,
    },
    defaultValue: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  mixins: [
    // Smart Component Mixin to get and set smart variables
    SmartComponents,
  ],
  computed: {
    computedTabs: {
      get() {
        if (typeof this.tabs === "string") {
          return JSON.parse(this.tabs);
        }
        return this.tabs;
      },
    },
    // Default tab name
    defaultTab: {
      get() {
        if (this.defaultValue) {
          return this.defaultValue;
        }
        return Object.keys(this.computedTabs)[0];
      },
    },

    // Selected tab
    selected: {
      get() {
        return this.getSmartValue(this.variable) || this.defaultTab;
      },
      set(tabName) {
        this.setSmartValue(this.variable, tabName);
      },
    }
  },
}
</script>

<style scoped>

.tab-header {
  @apply w-full flex items-center justify-start border-b border-gray-100 dark:border-neutral-800
}

.tab-header > .tab {
  @apply py-2 cursor-pointer relative transition-colors font-medium
}

.tab-header > .tab:after {
  content: '';
  height: .125rem;
  border-top-left-radius: .125rem;
  border-top-right-radius: .125rem;
  @apply absolute transition-colors left-0 bottom-0 w-full bg-transparent
}

.tab-header > .tab:not(:last-child) {
  @apply mr-4
}

.tab-header > .tab.is-selected {
  @apply text-blue-500 dark:text-rose-500
}

.tab-header > .tab.is-selected:after {
  @apply bg-blue-500 dark:bg-rose-500
}
.tab-header > .tab:hover {
  @apply text-blue-400 dark:text-rose-700
}

.tab-header > .tab:hover:after {
  @apply bg-blue-100 dark:bg-rose-800
}
</style>
