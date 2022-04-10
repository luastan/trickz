<template>
      <textarea
        ref="pastebin"
        :rows="rows"
        class="
      fancy-scrollbar
      w-full
      px-2
      border border-gray-300 rounded
      focus:text-neutral-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
      ></textarea>

</template>

<script>


export default {
  name: "PasteMarkdown",
  data() {
    return {

    }
  },
  mounted() {

  },

  props: {
    rows: {}
  },
  methods: {


  },
}
</script>

<style scoped>

</style>
