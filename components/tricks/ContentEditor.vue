<template>
  <div id="content-editor" class="tricks-editor w-full">
    <tricks-live-editor
      @save="submitResult(true)"
      @cancel="submitResult(false)"
      v-if="value !== null && value !== undefined"
      v-model="markdownSrc"
    />
  </div>
</template>

<script>
const propertyRegexp = new RegExp(/(^[a-zA-Z]+):\s?(.*)/);

export default {
  name: 'tricks-content-editor',

  props: {
    value: {
      required: true,
    },
    isEditing: Boolean
  },
  data() {
    return {
      futureSRC: "",

    }
  },
  computed: {
    markdownSrc: {
      get() {
        const parsedContent = this.parseContent(this.value);
        this.futureSRC = parsedContent.src
        return parsedContent.src;
      },
      set(mdSRC) {
        this.futureSRC = mdSRC;
      },
    },
    futureContent() {
      let lines = ["---"];
      lines.push(...Object.entries(this.parseContent(this.value).props).map(([k, v]) => `${k}: ${v}`));
      lines.push("---");
      lines.push(this.futureSRC);
      return lines.join('\n');
    },
  },
  methods: {
    submitResult(doSubmit) {
      if (doSubmit) {
        this.$emit('input', this.futureContent);
      }
      this.$emit('endEdit');
    },
    parseContent(content) {
      const val = content || "";  // Can be null =(
      const lines = val.split(/\r?\n/);
      if (lines.length < 3 || lines[0] !== '---') {
        return {
          src: val,
          props: {
            title: "",
            description: "",
            position: -1,
            badge: "",
          },
        }
      }

      let documentProperties = {}
      lines.shift();  // Removes the first ---
      for (let line = lines.shift(); line !== undefined && line !== "---"; line = lines.shift()) {
        const regexExec = propertyRegexp.exec(line);
        if (regexExec !== null) {
          documentProperties[regexExec[1]] = regexExec[2];  // Regex should be enough to avoid prototype pollution
        }
      }
      return {
        props: documentProperties,
        src: lines.join("\n"),
      };
    },
  }
}
</script>

<style scoped>
#content-editor {
  @apply overflow-visible px-0
}
</style>
