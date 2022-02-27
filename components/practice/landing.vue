<template>
  <div class="flex root items-center justify-between flex-wrap">
    <div
      @click="$emit('open-page', 'test')"
      class="card link"
    >
      <b>Take the test !</b>
    </div>
    <div
      @click="$emit('open-page', 'results')"
      class="card link"
    >
      <b>Past results</b>
    </div>
    <div class="card w-full flex items-center justify-center flex-col py-8">
      <h2 class="w-full flex items-center justify-center pt-0 mt-0 pb-0 mb-0">Accuracy</h2>
      <div class="flex items-end justify-center w-full py-12 font-bold">

        <span class="text-6xl">{{ shownAccuracy }}</span><span class="text-4xl opacity-70">%</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing",
  data() {
    return {
      accuracy: 83,
      shownAccuracy: 100,
    }
  },
  mounted() {
    this.animateAccuracy();

  },
  methods: {
    animateAccuracy() {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 1500, 1);
        this.shownAccuracy = Math.floor(progress * (this.accuracy - 100) + 100);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    },
  }
}
</script>

<style scoped>
.root {
  gap: 1rem;

}

.card {
  width: 100%;
  @apply dark:bg-gray-700 cursor-pointer shadow-sm hover:shadow transition-shadow rounded px-4 border border-gray-200 dark:border-gray-800
}

.card.link {
  @apply py-2
}

@screen md {
  .card.link {
    width: calc(50% - .5rem);
  }
}


</style>
