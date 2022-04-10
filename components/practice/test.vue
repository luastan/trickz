<template>
  <div>
    <lst-button
      outline
      size="sm"
      class="mb-4"
      @click="$emit('open-page', 'landing')"
    >Back</lst-button>
    <div
      :key="index"
      v-for="(question, index) in innerState.questions"
      class="mb-4"
    >
      <header class="w-full">
        <span class="mr-2">{{ index + 1 }}.</span><span>{{ question.title }}</span>
      </header>
      <div class="w-full">
        <div
          :key="id"
          v-for="(answer, id) in question.answers"
          :class="{
            'selected': answer.selected
          }"
          @click="handleClickAnswer(question, answer)"
          class="answer w-full cursor-pointer px-4 py-1 rounded hover:bg-neutral-50 hover:dark:bg-neutral-800"
        >
          <span class="mr-2">{{ id }})</span><span>{{ answer.content }}</span>
        </div>
      </div>
    </div>
    <div class="w-full pt-4 flex items-center justify-end border-t border-gray-200 dark:border-neutral-700">
      <lst-button size="sm">Submit</lst-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    testState: {
      type: Object,
      required: true,
    }
  },
  data() {
    let innerState = {questions:[], ...this.testState}
    innerState.questions.forEach(question => {
      Object.keys(question.answers).forEach(k => {
        if (question.answers[k].selected === undefined) {
          question.answers[k] = {
            selected: false,
            content: question.answers[k]
          };
        }
      })

    })
    return {
      innerState: {...innerState}
    }
  },
  methods: {
    handleClickAnswer(question, answer) {
      const willBeSelected = !answer.selected;
      if (!question.multipleAnswers && willBeSelected) {
        Object.keys(question.answers).forEach(k => {
          question.answers[k].selected = false;
        })
      }
      answer.selected = willBeSelected;
    },
  },
}
</script>

<style scoped>
.answer {
  transition-property: outline-color;
  transition-duration: .2s;
  transition-timing-function: ease;
  @apply outline-2 outline  outline-transparent mt-2
}
.answer.selected {
  @apply outline-blue-600 dark:bg-neutral-700
}
</style>
