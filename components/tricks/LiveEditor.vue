<!--
  This is sort of a WYSIWYG.
  Help improving this component is appreciated.
-->
<template>
  <div class="tricks-editor w-full flex flex-col justify-start items-center"
  >
    <div class="controls w-full flex items-center justify-between sticky">
      <div class="button-group flex items-center justify-start">
        <button @click="applyBold" class="button">
          <icons-bold />
        </button>
        <button @click="applyItalic" class="button">
          <icons-italic />
        </button>

        <button @click="applyHeading('<h2>')" class="button">
          <icons-h1 />
        </button>
        <button @click="applyHeading('<h3>')" class="button">
          <icons-h2 />
        </button>
        <button @click="applyHeading('<h4>')" class="button">
          <icons-h3 />
        </button>
        <button @click="applyUl" class="button">
          <icons-bullet-list />
        </button>
        <button @click="applyOl" class="button">
          <icons-numbered-list id="numbered-list-icon" />
        </button>
        <!--          <button @click="undo" class="button">-->
        <!--            <- -->
        <!--          </button>-->
        <!--          <button @click="redo" class="button">-->
        <!--            ->-->
        <!--          </button>-->
      </div>
      <div class="button-group flex items-center justify-end">
        <lst-button outline size="sm" @click="$emit('cancel')" class="mr-2">
          Cancel
        </lst-button>
        <lst-button size="sm" @click="$emit('save')" class="">
          Save
        </lst-button>
      </div>
    </div>

    <div class="w-full px-4 wysiwyg-container">
      <div
        @compositionstart.prevent="isInComposition = true"
        @compositionend.prevent="isInComposition = false"
        @keydown.tab.exact.prevent="onTabRight"
        @keydown.tab.shift.prevent="onTabLeft"
        @keydown.ctrl.i.prevent="applyItalic"
        @keydown.ctrl.b.prevent="applyBold"
        @keydown.ctrl.shift.55.prevent="applyUl"
        @keydown.ctrl.shift.56.prevent="applyOl"
        @keydown.ctrl.z.exact.prevent="undo"
        @keydown.ctrl.shift.z.prevent="redo"
        @keydown.ctrl.y.prevent="redo"
        @keydown.ctrl.s.prevent="$emit('save')"
        @keydown.ctrl.c.prevent="$emit('cancel')"
        @keydown.esc.prevent="$emit('cancel')"
        @input="onInput"
        v-html="innerValue"
        contenteditable="true"
        class="wysiwyg-output mt-4 outline-2 tricks-input-outline line prose dark:prose-invert border-2 p-4 rounded-lg dark:rounded-lg shadow-inner-sm border-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-blue-600"
      />
    </div>
  </div>
</template>

<script>
import TurndownService from "turndown";
import {Marked} from '@ts-stack/markdown'

export default {
  name: "LiveEditor",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isInComposition: false,
      innerValue: Marked.parse(this.value) || '<p><br></p>',
    };
  },
  mounted() {
    document.execCommand('defaultParagraphSeparator', false, 'p')
  },
  methods: {
    onInput(event) {
      const turndown = new TurndownService({
        emDelimiter: '_',
        linkStyle: 'inlined',
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
      });
      this.$emit('input', turndown.turndown(event.target.innerHTML))
    },

    onTabRight() {
      document.execCommand('indent');
    },
    onTabLeft() {
      document.execCommand('outdent');
    },
    applyBold() {
      document.execCommand('bold');
    },
    applyItalic() {
      document.execCommand('italic');
    },
    applyHeading(value) {
      document.execCommand('formatBlock', false, value);
    },
    applyUl() {
      document.execCommand('insertUnorderedList');
    },
    applyOl() {
      document.execCommand('insertOrderedList');
    },
    undo() {
      document.execCommand('undo');
    },
    redo() {
      document.execCommand('redo');
    },
  }
}
</script>

<style scoped>

/* Color */
html:not(.dark) .tricks-editor > .controls {
  background-color: rgba(255,255,255, 0.8);
  border-color: rgba(0,0,0,.05);
}

html.dark .tricks-editor > .controls {
  background-color: rgba(55,55,55, 0.28);
  @apply backdrop-blur-xl border-gray-700
}

.tricks-editor > .controls {
  top: 4.75rem;

  @apply backdrop-blur rounded py-4 mb-2 border border-gray-100 px-4 rounded
}

.tricks-editor > .wysiwyg-container > .wysiwyg-output {
  @apply w-full max-w-full
}


.tricks-editor > .controls > .button-group > .button {
  @apply px-4 py-2 flex items-center justify-center
}

.tricks-editor > .controls > .button-group > .button > .tricks-icon {
  @apply h-4 fill-gray-600 dark:fill-gray-200
}

#numbered-list-icon {
  @apply h-5
}

.tricks-editor > .controls > .button-group > .button:hover {
  @apply bg-gray-50
}

.tricks-editor > .controls > .button-group > .button:not(:first-child) {
  @apply border-l border-gray-100
}

</style>
