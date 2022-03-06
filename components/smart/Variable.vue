<template><span class="smart-variable">
  <!--  BE CAREFUL with line feeds AND TABS -->
<span v-if="!storedSmartValue"><slot/></span>
<span v-else>{{ storedSmartValue }}</span>
</span></template>


<script>
import smartComponents from "../../mixins/smartComponents";

export default {
  name: "Variable",
  mixins: [smartComponents],
}
</script>

<style scoped>

.smart-variable {
  text-underline-mode: "";
  border-bottom: 1px dotted;
  @apply font-bold italic
}

</style>
