<template>
  <div ref="smartElement" class="smart-input tricks-input-outline flex mt-2 items-center justify-start w-full relative">
    <div class="cell title whitespace-nowrap rounded-l border">
      {{ variable }}
    </div>
    <input
      class="block cell font-mono w-full rounded-r border-y border-r"
      type="text"
      v-model:value="inputValue"
    >
    <transition name="fade">
      <div
        v-if="inputValue !== defaultValue"
        @click="inputValue = undefined"
        class="h-full rounded-r backdrop-blur cursor-pointer absolute flex items-center justify-center right-0 px-2">
        <icons-reset class="h-5 w-5 stroke-gray-600 fill-gray-600 dark:stroke-gray-400 dark:fill-gray-400"/>
      </div>
    </transition>
  </div>
</template>

<script>
import smartComponents from "../../mixins/smartComponents";

export default {
  name: "SmartInput",
  data() {
    return {
      innerValue: this.defaultValue,
    }
  },
  props: {
    defaultValue: {
      type: String,
      default: "",
    },
    store: {
      type: Object
    }
  },
  mounted() {
    const vm = this;
    setTimeout(function () {
      vm.$refs.smartElement?.parentElement?.querySelectorAll(`.smart-${vm.variable}`)
        .forEach(element => {
          element.textContent = vm.inputValue;
          try {
            const possibleValue = vm.$store.getters['smart/getSmartValue'](vm.variable)
            if (possibleValue === null || possibleValue === undefined) {
              vm.$store.commit('smart/setSmartValue', {key: vm.variable, value: vm.inputValue});
            } else {
              vm.innerValue = possibleValue;
            }
          } catch (e){

          }
        });
    });
  },
  mixins: [
    smartComponents,
  ],

  computed: {
    inputValue: {
      get() {
        try {
          // const smartValue = this.$store.getters['smart/getSmartValue'](this.variable);
          const smartValue = this.getSmartValue(this.variable);
          return (smartValue === null || smartValue === undefined) ? this.defaultValue : smartValue;
        } catch (e) {
          return this.innerValue;
        }

      },
      set(newValue) {
        this.innerValue = newValue
        try {
          this.setSmartValue(this.variable, newValue);
          // document.querySelectorAll(`.smart-${this.variable}`)
          //   .forEach(element => {
          //     element.textContent = newValue;
          //   });
          // this.$store.commit('smart/setSmartValue', {key: this.variable, value: newValue});
        } catch (e) {
        }

      },
    },
  }

}
</script>

<style scoped>


.smart-input > .cell {
  @apply px-4 py-1 border-gray-200 outline-0 dark:border-gray-800 dark:bg-gray-600 appearance-none
}

.smart-input > .cell.title {
  @apply bg-gray-100 font-semibold dark:bg-gray-700
}
</style>
