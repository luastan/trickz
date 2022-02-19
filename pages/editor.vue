<template>
  <div>
    <tricks-editor v-model="markdownCode" />



    <pre>{{ markdownCode }}</pre>
  </div>
</template>

<script>
export default {
  name: "editor",
  data() {
    return {
      markdownCode: "",
    }
  },
}
</script>

<style scoped>

</style>
