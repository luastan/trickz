<template>
  <div v-on:click="increment" class="flex items-center justify-center">
    {{ counter }}
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "Counter",
  computed: {
    ...mapGetters({
      'counter': 'content/getCounter'
    }),
  },
  methods: {
    ...mapMutations({
      'increment': 'content/incrementCounter',
    })
  }
}
</script>

<style scoped>

</style>
