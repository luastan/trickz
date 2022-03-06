<template>
  <div class="w-full mb-8">
    <div ref="codeBlock" class="w-full relative">
      <slot/>
      <tricks-copy-code/>
    </div>
<!--    Smart Inputs -->
    <client-only>
      <smart-input
        v-for="(smartVariable, index) in computedSmartVariables"
        :key="smartVariable.name"
        :default-value="smartVariable.defaultValue"
        :variable="smartVariable.name"
      />
    </client-only>
  </div>

</template>

<script>

export default {
  name: "CodeBlockWrapper",
  props: {
    smartVariables: {
      type: String,
      default: "{}",
    }
  },
  computed: {
    computedSmartVariables: {
      get() {
        const vars = JSON.parse(this.smartVariables);
        const list = [];
        for (const [name, defaultValue] of Object.entries(vars)) {
          list.push({
            name,
            defaultValue,
          })
        }
        return list;
      },
    }
  },
}
</script>

<style scoped>

</style>
