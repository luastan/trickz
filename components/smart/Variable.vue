<template><span class="smart-variable">
  <!--  BE CAREFUL with line feeds AND TABS -->
<span>{{ filteredValue }}</span>
</span></template>


<script>
import smartComponents from "../../mixins/smartComponents";
import escapeHtml from "escape-html";

export default {
  name: "Variable",
  data() {
    return {
      filterDefinitions: {
        'b64': {
          name: 'Base 64',
          filter: (val) => new Buffer(val).toString('base64'),
        },
        'url': {
          name: 'URL encode',
          filter: encodeURIComponent,
        },
        'url-all': {
          name: 'URL encode (all)',
          filter: (val) => encodeURIComponent(val)
            .replace(/!/g, "%21")
            .replace(/#/g, "%23")
            .replace(/'/g, "%27")
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")
            .replace(/\*/g, "%2A")
            .replace(/-/g, "%2D")
            .replace(/\./g, "%2E")
            .replace(/_/g, "%5F")
            .replace(/~/g, "%7E"),
        },
        'escape-4-json': {
          name: 'Escape for JSON',
          filter: (val) => val.replace(/"/g, '\\"'),
        },
        'lower': {
          name: 'Lowercase',
          filter: (val) => val.toLowerCase(),
        },
        'upper': {
          name: 'Uppercase',
          filter: (val) => val.toUpperCase(),
        },
        'html': {
          name: 'HTML escape',
          filter: escapeHtml,
        },
      }
    }
  },
  mixins: [smartComponents],
  props: {
    valueFilters: {
      type: String,
      default: "",
      required: false,
    },
    defaultValue: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    filterList: {
      get() {
        return this.valueFilters && this.valueFilters.length > 0 ? this.valueFilters.trim().split(/,\s*/): [];
      },
    },
    filteredValue: {
      get() {
        let finalValue = this.storedSmartValue || this.defaultValue
        for (let valueFilter of this.filterList) {
          const definition = this.filterDefinitions[valueFilter];
          if (!!definition) {
            finalValue = definition.filter(finalValue);
          }
        }
        return finalValue;
      },
    },
  },
}
</script>

<style scoped>

.smart-variable {
  text-underline-mode: "";
  border-bottom: 1px dotted;
  @apply font-bold italic
}

</style>
